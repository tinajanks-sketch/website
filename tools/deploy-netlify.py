#!/usr/bin/env python3
"""Upload the prepared static site to Netlify using a securely injected token.

No Git repository upload or DNS-provider access is involved.
API contract: @netlify/open-api 2.63.0 (official Netlify OpenAPI definition).
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

DOMAIN = 'consultix.solutions'
API_BASE = 'https://api.netlify.com/api/v1'


class NetlifyClient:
    def __init__(self, token):
        if not token:
            raise RuntimeError('NETLIFY_AUTH_TOKEN is missing. Add it through secure environment settings.')
        self.token = token

    def request(self, method, endpoint, payload=None, binary=None):
        headers = {'Authorization': 'Bearer ' + self.token, 'User-Agent': 'ConsultixPublisher/1.0'}
        data = binary
        if payload is not None:
            headers['Content-Type'] = 'application/json'
            data = json.dumps(payload).encode()
        elif binary is not None:
            headers['Content-Type'] = 'application/octet-stream'
        request = urllib.request.Request(API_BASE + endpoint, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                raw = response.read()
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as error:
            raise RuntimeError('Netlify returned HTTP ' + str(error.code) + ' for ' + method + ' ' + endpoint + '. No credentials were printed.') from None


def save_state(filename, state):
    filename.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile('w', dir=filename.parent, delete=False) as temporary:
        json.dump(state, temporary, indent=2)
        temporary.write('\n')
        name = temporary.name
    os.replace(name, filename)


def verify_preview(url):
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != 'https' or not parsed.hostname or not parsed.hostname.endswith('.netlify.app'):
        raise RuntimeError('Netlify did not return a supported HTTPS preview address.')
    request = urllib.request.Request(url, headers={'User-Agent': 'ConsultixReadinessCheck/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        if response.status != 200 or 'text/html' not in response.headers.get('Content-Type', ''):
            raise RuntimeError('The deployed homepage did not return HTML successfully.')
        body = response.read(2_000_000).decode('utf-8')
    if '<title>Consultix Solutions' not in body or 'mailto:general@consultix.solutions' not in body:
        raise RuntimeError('The deployed homepage did not contain the expected business and contact details.')


def deploy(api, root, publish=False, verify=verify_preview):
    root = Path(root)
    files = {}
    for name in ['index.html', '_headers', '_redirects', 'FONT-LICENSES.txt']:
        source = root / 'dist' / name
        if not source.is_file():
            raise RuntimeError('Run npm run build before deploying; missing ' + name)
        files[name] = source.read_bytes()
    api.request('GET', '/user')
    filename = root / '.netlify' / 'state.json'
    state = json.loads(filename.read_text()) if filename.exists() else {}
    site_id = os.environ.get('NETLIFY_SITE_ID') or state.get('siteId')
    if site_id:
        site = api.request('GET', '/sites/' + urllib.parse.quote(site_id, safe=''))
        if site.get('custom_domain') not in [None, '', DOMAIN]:
            raise RuntimeError('The selected site belongs to a different custom domain; it was not changed.')
    else:
        site = api.request('POST', '/sites', {})
        site_id = site['id']
    state['siteId'] = site_id
    save_state(filename, state)
    site_path = '/sites/' + urllib.parse.quote(site_id, safe='')
    digests = {name: hashlib.sha1(content).hexdigest() for name, content in files.items()}
    result = api.request('POST', site_path + '/deploys', {'files': {'/' + name: digest for name, digest in digests.items()}, 'draft': True, 'async': False})
    deploy_id = result['id']
    state['lastDeployId'] = deploy_id
    save_state(filename, state)
    for digest in result.get('required', []):
        matches = [name for name, value in digests.items() if value == digest]
        if not matches:
            raise RuntimeError('Netlify requested a file outside the prepared build.')
        name = matches[0]
        api.request('PUT', '/deploys/' + urllib.parse.quote(deploy_id, safe='') + '/files/' + urllib.parse.quote(name, safe='/'), binary=files[name])
    deadline = time.monotonic() + 120
    while True:
        result = api.request('GET', '/deploys/' + urllib.parse.quote(deploy_id, safe=''))
        if result.get('state') == 'ready':
            break
        if result.get('state') in ['error', 'failed']:
            raise RuntimeError('Netlify reported a deployment failure. The previous published version was not replaced.')
        if time.monotonic() > deadline:
            raise RuntimeError('Deployment readiness timed out. The saved site and deployment IDs can be used to diagnose it.')
        time.sleep(2)
    preview_url = result.get('deploy_ssl_url')
    if not preview_url:
        raise RuntimeError('The deployment has no verified HTTPS preview address.')
    verify(preview_url)
    if publish:
        api.request('POST', site_path + '/deploys/' + urllib.parse.quote(deploy_id, safe='') + '/restore')
        site = api.request('GET', site_path)
        if site.get('published_deploy', {}).get('id') != deploy_id:
            raise RuntimeError('Publication could not be confirmed. Do not assume the new version is live.')
    return {'site_id': site_id, 'deploy_id': deploy_id, 'preview_url': preview_url, 'site_url': site.get('ssl_url') or site.get('url'), 'published': publish}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--publish', action='store_true', help='Publish the deployment after its HTTPS preview passes a functional request.')
    args = parser.parse_args()
    client = NetlifyClient(os.environ.get('NETLIFY_AUTH_TOKEN'))
    result = deploy(client, Path(__file__).resolve().parents[1], publish=args.publish)
    print(json.dumps(result, indent=2))
    print('GoDaddy DNS and custom-domain HTTPS have not been changed or verified by this command.')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, OSError, ValueError, KeyError) as error:
        raise SystemExit(str(error))

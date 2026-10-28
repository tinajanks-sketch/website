import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

module_path = Path(__file__).resolve().parents[1] / 'tools' / 'deploy-netlify.py'
spec = importlib.util.spec_from_file_location('publisher', module_path)
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


class FakeNetlify:
    def __init__(self):
        self.creates = 0
        self.publishes = 0
        self.fail_upload = False
        self.site = {'id': 'test-site', 'ssl_url': 'https://example-test.netlify.app'}

    def request(self, method, endpoint, payload=None, binary=None):
        if endpoint == '/user':
            return {'id': 'test-user'}
        if method == 'POST' and endpoint == '/sites':
            self.creates += 1
            return self.site
        if method == 'GET' and endpoint == '/sites/test-site':
            return self.site
        if method == 'POST' and endpoint == '/sites/test-site/deploys':
            self.digests = payload['files']
            return {'id': 'test-deploy', 'required': list(self.digests.values())}
        if method == 'PUT':
            if self.fail_upload:
                raise RuntimeError('Simulated interrupted upload')
            if not isinstance(binary, bytes):
                raise AssertionError('Missing file bytes')
            return {}
        if method == 'GET' and endpoint == '/deploys/test-deploy':
            return {'id': 'test-deploy', 'state': 'ready', 'deploy_ssl_url': 'https://test-deploy--example-test.netlify.app'}
        if method == 'POST' and endpoint.endswith('/restore'):
            self.publishes += 1
            self.site['published_deploy'] = {'id': 'test-deploy'}
            return {}
        raise AssertionError((method, endpoint))


class PublisherTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        (self.root / 'dist').mkdir()
        for name in ['index.html', '_headers', '_redirects', 'FONT-LICENSES.txt']:
            (self.root / 'dist' / name).write_text('Example build ' + name)
        self.api = FakeNetlify()
        self.environment = patch.dict(os.environ, {'NETLIFY_SITE_ID': ''})
        self.environment.start()

    def tearDown(self):
        self.environment.stop()
        self.temporary.cleanup()

    def test_failed_preview_is_not_published(self):
        def broken_preview(url):
            raise RuntimeError('Unexpected homepage')
        with self.assertRaisesRegex(RuntimeError, 'Unexpected homepage'):
            publisher.deploy(self.api, self.root, publish=True, verify=broken_preview)
        self.assertEqual(self.api.publishes, 0)

    def test_interrupted_upload_reuses_site_on_retry(self):
        self.api.fail_upload = True
        with self.assertRaisesRegex(RuntimeError, 'interrupted upload'):
            publisher.deploy(self.api, self.root, verify=lambda url: None)
        self.api.fail_upload = False
        result = publisher.deploy(self.api, self.root, publish=True, verify=lambda url: None)
        self.assertEqual(self.api.creates, 1)
        self.assertEqual(self.api.publishes, 1)
        self.assertTrue(result['published'])
        saved = json.loads((self.root / '.netlify' / 'state.json').read_text())
        self.assertEqual(saved['siteId'], 'test-site')
        self.assertNotIn('token', saved)

    def test_preview_does_not_replace_production(self):
        result = publisher.deploy(self.api, self.root, verify=lambda url: None)
        self.assertFalse(result['published'])
        self.assertEqual(self.api.publishes, 0)


if __name__ == '__main__':
    unittest.main()

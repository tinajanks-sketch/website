'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {calculate} = require('../metrics.js');

test('gross margin uses direct costs and the same-period revenue denominator', () => {
  assert.deepEqual(calculate('margin',{revenue:120000,delivery:48000}),{value:60,amountA:120000,amountB:48000});
});
test('gross margin can be negative; zero revenue is undefined', () => {
  assert.equal(calculate('margin',{revenue:100,delivery:125}).value,-25);
  assert.equal(calculate('margin',{revenue:0,delivery:125}).error,'zeroRevenue');
});
test('retention includes expansion and removes contraction/churn from the opening cohort', () => {
  assert.deepEqual(calculate('retention',{opening:50000,expansion:8000,contraction:2000,churn:4000}),{value:104,amountA:50000,amountB:52000});
});
test('new-customer revenue does not enter the retention calculation', () => {
  const base={opening:50000,expansion:0,contraction:5000,churn:10000};
  assert.equal(calculate('retention',{...base,newCustomers:500000}).value,70);
});
test('retention rejects zero opening revenue and losses above the opening cohort', () => {
  assert.equal(calculate('retention',{opening:0,expansion:100,contraction:0,churn:0}).error,'zeroOpening');
  assert.equal(calculate('retention',{opening:100,expansion:200,contraction:60,churn:50}).error,'excessLosses');
});
test('complete churn can yield zero retention and expansion can exceed 100 percent', () => {
  assert.equal(calculate('retention',{opening:100,expansion:0,contraction:0,churn:100}).value,0);
  assert.equal(calculate('retention',{opening:100,expansion:50,contraction:0,churn:0}).value,150);
});
test('runway divides available cash by net cash burn, not gross expenses', () => {
  assert.deepEqual(calculate('runway',{cash:150000,receipts:50000,payments:75000}),{value:6,amountA:150000,amountB:25000});
});
test('zero cash with positive burn yields zero months', () => {
  assert.equal(calculate('runway',{cash:0,receipts:0,payments:100}).value,0);
});
test('zero or negative burn does not produce an infinite or negative runway', () => {
  for (const receipts of [100,200]) assert.deepEqual(calculate('runway',{cash:1000,receipts,payments:100}),{error:'nonPositiveBurn'});
});
test('missing, negative, nonfinite and nonnumeric inputs do not produce financial results', () => {
  for (const revenue of [undefined,NaN,Infinity,-1,'100',1e10]) assert.equal(calculate('margin',{revenue,delivery:0}).error,'invalidInputs');
  assert.throws(()=>calculate('unknown',{}),RangeError);
});
test('calculations retain precision before formatting', () => {
  assert.ok(Math.abs(calculate('margin',{revenue:300,delivery:100}).value-66.66666666666667)<1e-10);
  assert.equal(calculate('runway',{cash:1000,receipts:100.5,payments:200.5}).value,10);
});

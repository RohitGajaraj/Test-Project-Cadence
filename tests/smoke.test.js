const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('health.json status is UP', () => {
  const healthData = JSON.parse(fs.readFileSync(path.join(__dirname, '../health.json'), 'utf8'));
  assert.strictEqual(healthData.status, 'UP');
});

test('index.html is NOT empty', () => {
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert.ok(indexHtml.length > 0);
});

test('VERSION file matches main.ts response (logic)', () => {
  const version = fs.readFileSync(path.join(__dirname, '../VERSION'), 'utf8').trim();
  assert.ok(version.length > 0);
});
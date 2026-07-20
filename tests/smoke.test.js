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

test('status endpoint returns valid JSON with version', async () => {
  const response = await fetch('http://localhost:8000/status');
  assert.strictEqual(response.status, 200);
  
  const contentType = response.headers.get('content-type');
  assert.ok(contentType?.includes('application/json'), `Expected JSON content type, got ${contentType}`);
  
  const data = await response.json();
  assert.ok(data.version, 'Version field is missing from response');
  assert.ok(typeof data.version === 'string', 'Version should be a string');
});
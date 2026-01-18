import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const read = (file) => readFileSync(path.join(root, file), 'utf8');

test('required files exist', () => {
  ['src/pages/index.astro', 'src/data/profile.ts', 'astro.config.ts'].forEach((file) => {
    assert.ok(existsSync(path.join(root, file)), `${file} should exist`);
  });
});

test('profile data includes key fields', () => {
  const content = read('src/data/profile.ts');
  assert.match(content, /name: 'Noman Ali Malik'/);
  assert.match(content, /title: 'Front-end Engineer'/);
  assert.match(content, /location: 'London, UK'/);
  assert.match(content, /email: 'noumanmalik970@gmail.com'/);
});

test('astro config uses dynamic base for GitHub Pages', () => {
  const content = read('astro.config.ts');
  assert.match(content, /GITHUB_REPOSITORY/);
  assert.match(content, /base/);
});

test('homepage includes key sections', () => {
  const content = read('src/pages/index.astro');
  ['#experience', '#projects', '#skills', '#contact'].forEach((anchor) => {
    assert.ok(content.includes(anchor), `Missing ${anchor} section link`);
  });
});

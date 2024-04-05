const chai = require('chai');
global.expect = chai.expect;
global.chai = chai;
const fs = require('file-system');
const jsdom = require('mocha-jsdom');
const path = require('path');
const babel = require('babel-core');
const spies = require('chai-spies');

chai.use(spies);

const htmlFilePath = path.resolve(__dirname, '..', 'index.html');
const jsFilePath = path.resolve(__dirname, '..', 'index.js');

try {
  const html = fs.readFileSync(htmlFilePath, 'utf-8');
  const babelResult = babel.transformFileSync(jsFilePath, {
    presets: ['env']
  });
  const src = babelResult.code;

  jsdom({
    html,
    src
  });
} catch (error) {
  console.error('Error setting up test environment:', error);
}


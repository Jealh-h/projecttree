#!/usr/bin/env node

const ProjectTree = require('../lib/index.js').default;
try {
  const ins = new ProjectTree();
  ins.run();
} catch (err) {
  console.log('Error:', err);
  process.exit();
}
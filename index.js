#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

if (process.argv.length != 4) {
  console.log('usage: flatten-dir source dest')
  process.exit(1)
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const src = process.argv[2];
const dst = process.argv[3];
walkDir(src, function(filePath) { 
  const oldPath = filePath.substring(src.length+1);
  const newPath = oldPath.replace(path.sep, '_');

  fs.copyFileSync(path.join(src, oldPath), path.join(dst, newPath));
});

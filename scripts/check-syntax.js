const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const src = fs.readFileSync(p, 'utf8');
try {
  esbuild.transformSync(src, { loader: 'jsx', sourcemap: false, sourcefile: p });
  console.log('No syntax errors detected by esbuild transform.');
} catch (err) {
  console.error('esbuild transform error:');
  console.error(err.message);
  if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
  process.exit(1);
}

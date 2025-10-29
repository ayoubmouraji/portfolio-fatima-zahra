//  @ts-check
const esbuild = require('esbuild');
const path = require('path');

esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '../src/PortfolioFz.jsx')],
  bundle: true,
  platform: 'browser',
  jsx: 'preserve',
  write: false,
  logLevel: 'verbose',
  format: 'esm',
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
});
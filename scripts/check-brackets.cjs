const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);
let square = 0;
let curly = 0;
let paren = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let ch of line) {
    if (ch === '[') square++;
    if (ch === ']') square--;
    if (ch === '{') curly++;
    if (ch === '}') curly--;
    if (ch === '(') paren++;
    if (ch === ')') paren--;
  }
  if (square < 0 || curly < 0 || paren < 0) {
    console.log('Mismatch at line', i+1, 'lineText:', line);
    process.exit(1);
  }
  // report when we hit the problematic line region
  if (i+1 === 108 || i+1 === 110) {
    console.log('Line', i+1, line);
    console.log('counts so far:', {square, curly, paren});
  }
}
console.log('Final counts:', {square, curly, paren});

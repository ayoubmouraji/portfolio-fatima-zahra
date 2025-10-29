const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);
let square = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j=0;j<line.length;j++){
    const ch = line[j];
    if (ch === '[') { square++; console.log('Line', i+1, 'col', j+1, 'FOUND [ ->', square, 'lineText:', line.trim()); }
    if (ch === ']') { console.log('Line', i+1, 'col', j+1, 'FOUND ] before ->', square); square--; console.log(' ->', square); }
  }
}
console.log('Final square count', square);

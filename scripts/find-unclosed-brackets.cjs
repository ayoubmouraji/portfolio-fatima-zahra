const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);
const stack = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j=0;j<line.length;j++){
    const ch = line[j];
    if (ch === '[') { stack.push({line: i+1, col: j+1, text: line.trim()}); }
    if (ch === ']') { if (stack.length===0) console.log('Extra ] at', i+1, j+1); else stack.pop(); }
  }
}
if (stack.length===0) console.log('All [] matched.'); else {
  console.log('Unclosed [ count:', stack.length);
  console.log(JSON.stringify(stack, null, 2));
}

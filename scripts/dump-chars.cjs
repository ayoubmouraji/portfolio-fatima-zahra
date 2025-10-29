const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);
for (let i = 98; i <= 112; i++) {
  if (i-1 >= lines.length) break;
  const line = lines[i-1];
  console.log('Line', i, JSON.stringify(line));
  let out = '';
  for (let j = 0; j < line.length; j++) {
    out += `${j+1}:${line.charCodeAt(j)}(${line[j]}) `;
  }
  console.log(out);
}

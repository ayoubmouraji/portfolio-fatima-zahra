const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);

let matched = s.match(/(?:liens|objectifs|technos|competences|livrables): *\[([^\]]*\])?/g);
if (matched) {
  console.log('Found array property declarations:', matched.length);
  matched.forEach((m, i) => {
    const has_closer = /\]$/.test(m);
    console.log(`[${i+1}]`, m.trim(), has_closer ? '(has closer)' : '*** UNCLOSED ***');
  });
}

// Check project objects
let objects = s.match(/(?:const PROJETS = )?\[([\s\S]+?)\];/g);
if (objects) {
  console.log('\nFound array declarations:', objects.length);
  objects.forEach((obj, i) => {
    const contents = obj.slice(obj.indexOf('[')+1, obj.lastIndexOf(']'));
    const open_count = contents.split('[').length - 1;
    const close_count = contents.split(']').length - 1;
    console.log(`Array [${i+1}]:`, open_count, 'opens vs', close_count, 'closes', 
      open_count === close_count ? '(balanced)' : '*** IMBALANCED ***');
  });
}

// Find any suspicious areas
const warning_patterns = [
  /\]\s*[^,}\]]/, // array not followed by comma/brace/array close
  /:[^"'\s\[{][^,}]*$/, // property value not starting with quote or array/object
  /\[[^\]]*$/, // unterminated array on line
];

warning_patterns.forEach((pattern, i) => {
  const matches = s.match(pattern);
  if (matches) {
    console.log('\nPotential syntax issue type', i+1);
    matches.forEach(m => console.log(' -', m.trim()));
  }
});
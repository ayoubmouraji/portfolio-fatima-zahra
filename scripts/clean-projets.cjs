const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');

// Extract the PROJETS array content
const match = /const PROJETS = \[([\s\S]*?)(?=const DIPLOMES)/.exec(s);
if (!match) {
  console.log('Could not find PROJETS array');
  process.exit(1);
}

// Split into individual project objects
const projects = match[1].trim().split(/\n\s*},\s*\n\s*{/).map(p => p.trim());
console.log('Found', projects.length, 'projects');

// Clean up each project object
const cleaned = projects.map(proj => {
  // Remove any extra braces/brackets at start/end
  proj = proj.replace(/^{?\s*/, '').replace(/\s*}?\s*$/, '');
  
  // Ensure each property ends with comma
  proj = proj.replace(/(["\]]),?\s*(?=\w+:)/g, '$1,\n    ');
  
  // Clean up array closures
  proj = proj.replace(/\[\s*([^,\s])/g, '[ $1');
  proj = proj.replace(/([^,\s])\s*\]/g, '$1 ]');
  
  return proj;
}).join(',\n  {\n    ') + '\n  }';

// Build new file content
const newContent = s.slice(0, match.index) + 
  'const PROJETS = [\n  {\n    ' + cleaned + '\n];\n\n' + 
  s.slice(match.index + match[0].length);

if (newContent !== s) {
  console.log('Writing cleaned file...');
  fs.writeFileSync(p + '.cleaned', newContent);
  console.log('Wrote cleaned file to', p + '.cleaned');
} else {
  console.log('No changes needed');
}
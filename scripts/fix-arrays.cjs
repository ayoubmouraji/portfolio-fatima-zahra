const fs = require('fs');
const path = require('path');
const p = path.resolve(__dirname, '../src/PortfolioFz.jsx');
const s = fs.readFileSync(p, 'utf8');
console.log('Content length:', s.length);
const lines = s.split(/\r?\n/);
console.log('Lines:', lines.length);
let changes = s;
let changes_made = 0;

// Fix missing array closer
if (!/const PROJETS = \[.*?[\r\n]]\s*;\s*[\r\n]/s.test(s)) {
  console.log('Patching PROJETS array ending...');
  changes = changes.replace(
    /const PROJETS = \[([\s\S]*?)(\s*const\s+DIPLOMES\s*=)/,
    'const PROJETS = [$1];\n\n$2'
  );
  changes_made++;
}

// Check for any nested arrays not properly closed
const proj_match = /const PROJETS = \[([\s\S]*?)\];/.exec(changes);
if (proj_match) {
  let proj_text = proj_match[1];
  const nested_matches = [...proj_text.matchAll(/(?<!\])\s*,\s*\{/g)];
  if (nested_matches.length > 0) {
    console.log('Found', nested_matches.length, 'project objects');
    for (const m of nested_matches) {
      const before = proj_text.slice(0, m.index);
      const array_starts = (before.match(/\[/g) || []).length;
      const array_ends = (before.match(/\]/g) || []).length; 
      if (array_starts !== array_ends) {
        console.log('Array imbalance detected:', array_starts, 'vs', array_ends, 'at pos', m.index);
        // Find the last property before this that should have an array closer
        const property_match = /(\w+):\s*\[(?:[^[\]]*|\[[^\]]*\])*$/y.exec(before);
        if (property_match) {
          console.log('Found unclosed array for property:', property_match[1]);
          // Close it
          const patch_pos = property_match.index + before.slice(property_match.index).length;
          proj_text = proj_text.slice(0, patch_pos) + ']' + proj_text.slice(patch_pos);
          changes_made++;
        }
      }
    }
    // Put back updated projects array
    if (changes_made > 0) {
      changes = changes.replace(/const PROJETS = \[([\s\S]*?)\];/, `const PROJETS = [${proj_text}];`);
    }
  }
}

if (changes_made > 0) {
  fs.writeFileSync(p, changes);
  console.log('Made', changes_made, 'fixes');
} else {
  console.log('No fixes needed');
}
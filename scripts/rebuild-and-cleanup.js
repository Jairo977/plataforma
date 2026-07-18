const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');

console.log("Starting full rebuild sequence...");

// 1. Rebuild base template
execSync('node scripts/rebuild-question-bank.js', { stdio: 'inherit' });

// 2. Run speakers
execSync('node scripts/update-speaking-bank.js', { stdio: 'inherit' });
execSync('node scripts/update-speaking-bank2.js', { stdio: 'inherit' });

// 3. Run listening
execSync('node scripts/update-listening-bank.js', { stdio: 'inherit' });

// 4. Run reading
execSync('node scripts/update-reading-bank.js', { stdio: 'inherit' });
execSync('node scripts/expand-reading-bank.js', { stdio: 'inherit' });

// 5. Run writing expansion
execSync('node scripts/expand-writing-bank.js', { stdio: 'inherit' });

// 6. Read and clean up the file
let content = fs.readFileSync(bankPath, 'utf8');

// Replace any leading commas in arrays: [ , -> [
content = content.replace(/\[\s*,/g, '[');

// Replace any double/multiple commas: , , -> ,
content = content.replace(/,\s*,/g, ',');

// Fix the spelling color and skill colors to keep the elegant new theme
// Just in case any update script overwrote globals.css or anything, but they only touch question-bank.ts.

fs.writeFileSync(bankPath, content, 'utf8');

console.log("Cleanup complete. Checking TypeScript compiling...");

try {
  execSync('pnpm tsc --noEmit', { stdio: 'inherit' });
  console.log("SUCCESS: TypeScript compiled with NO errors!");
} catch (e) {
  console.error("ERROR: TypeScript compilation failed.");
  process.exit(1);
}

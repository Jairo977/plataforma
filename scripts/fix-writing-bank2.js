const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

// The corruption pattern is literally:  "}\n] = [\n" which should be "}\n];\n"
// But there are also duplicated items after it. We need to:
// 1. Find the pattern "] = [" 
// 2. Find where the duplicate block ends (the next "];" followed by SPEAKING BANK or the next export)
// 3. Remove everything from "] = [" through that "];"

const badStr = '] = [\n';
let idx = content.indexOf(badStr);
while (idx !== -1) {
  console.log('Found corruption at index:', idx, '- line ~', content.substring(0, idx).split('\n').length);
  
  // Find the matching "];" for this "[" 
  let depth = 1; // we're inside the "[" 
  let searchFrom = idx + badStr.length;
  let endIdx = -1;
  for (let i = searchFrom; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  
  if (endIdx === -1) {
    console.log('Could not find matching end bracket');
    break;
  }
  
  // Replace "] = [... content ...]" with just "]"
  // We need to include the ";" after the closing "]"
  let afterEnd = endIdx + 1;
  if (content[afterEnd] === ';') afterEnd++;
  
  content = content.substring(0, idx) + '];\n' + content.substring(afterEnd);
  console.log('Removed duplicate block. Checking for more...');
  
  idx = content.indexOf(badStr);
}

// Also clean up any double "};," patterns
content = content.replace(/}\s*,\s*,/g, '},');

fs.writeFileSync(bankPath, content, 'utf8');
console.log('Done. File cleaned.');

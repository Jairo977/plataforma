const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

// Strategy: Find all "export const XXXBank: BankQuestion[] = [" declarations.
// For each, track brackets depth to find its true end "];"  
// If between the first "]" and next code there's a "= [" pattern, that's a corruption.
// We need to remove the duplicate block.

// First, let's just do a simple global replacement of ALL "] = [" patterns (which should never exist in valid TS)
// Each occurrence of "] = [" should just be "];\n\nexport const listeningBank: BankQuestion[] = [" or similar.
// But since those are different arrays being accidentally merged, we need a smarter approach.

// Actually the simplest fix: replace all occurrences of "] = [\n" with "];\n"
// Then check if the resulting file has orphaned content (items without an array container)

// Let's check what we get
let count = 0;
while (content.includes('] = [\n')) {
  // Find it
  const idx = content.indexOf('] = [\n');
  // We need to find the matching "]" for this new "[" 
  let depth = 1;
  let searchFrom = idx + 6; // after "] = [\n"
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
    console.log('Could not find matching bracket at index', idx);
    break;
  }
  
  // Check what comes after the end bracket
  let afterEnd = endIdx + 1;
  if (content[afterEnd] === ';') afterEnd++;
  if (content[afterEnd] === '\n') afterEnd++;
  if (content[afterEnd] === '\n') afterEnd++;
  
  // Remove the "] = [" and everything until the matching "];"  
  content = content.substring(0, idx) + '];\n\n' + content.substring(afterEnd);
  count++;
  console.log('Fixed corruption #' + count + ' at line ~' + content.substring(0, idx).split('\n').length);
}

if (count === 0) {
  console.log('No corruptions found.');
} else {
  console.log('Fixed ' + count + ' corruptions total.');
}

// Also fix any trailing comma issues
content = content.replace(/,\s*,/g, ',');

fs.writeFileSync(bankPath, content, 'utf8');
console.log('File saved.');

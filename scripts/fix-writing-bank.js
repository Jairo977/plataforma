const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'src', 'lib', 'question-bank.ts');
let content = fs.readFileSync(bankPath, 'utf8');

// The corruption is: after the new writing items we have "] = [" followed by a duplicate of the old writingBank.
// We need to find "} \n] = [\n" and replace it with "}\n];\n" then remove the duplicate old content up to the next "];".

// Find the bad pattern
const badPattern = '  }\n] = [\n';
const idx = content.indexOf(badPattern);

if (idx === -1) {
  console.log("Pattern not found, trying alternate...");
  const badPattern2 = '  }\r\n] = [\r\n';
  const idx2 = content.indexOf(badPattern2);
  if (idx2 === -1) {
    console.log("No corruption found. File may already be fixed.");
    process.exit(0);
  }
  // Find the next "];" after this point
  const nextEnd = content.indexOf('];\n', idx2 + 10);
  if (nextEnd === -1) {
    console.log("Could not find end marker.");
    process.exit(1);
  }
  content = content.substring(0, idx2 + 4) + content.substring(nextEnd);
  fs.writeFileSync(bankPath, content, 'utf8');
  console.log("Fixed (CRLF variant)");
  process.exit(0);
}

// Find the next "];" after the bad pattern  
const nextEnd = content.indexOf('];\n', idx + 10);
if (nextEnd === -1) {
  console.log("Could not find end marker.");
  process.exit(1);
}

// Replace: keep everything up to "}" then close the array with "];\n" then continue from after the duplicate's "];\n"
content = content.substring(0, idx + 4) + content.substring(nextEnd);
fs.writeFileSync(bankPath, content, 'utf8');
console.log("Fixed: removed duplicate writingBank content.");

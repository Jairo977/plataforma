const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const files = [
  { pdf: 'temp_reading.pdf', txt: 'temp_reading.txt' },
  { pdf: 'temp_speaking.pdf', txt: 'temp_speaking.txt' },
  { pdf: 'temp_listening.pdf', txt: 'temp_listening.txt' },
  { pdf: 'temp_writing.pdf', txt: 'temp_writing.txt' }
];

async function parseAll() {
  for (const file of files) {
    const pdfPath = path.join(__dirname, '..', file.pdf);
    const txtPath = path.join(__dirname, '..', file.txt);
    
    if (!fs.existsSync(pdfPath)) {
      console.error(`File ${file.pdf} does not exist. Skipping...`);
      continue;
    }
    
    console.log(`Parsing ${file.pdf} to text...`);
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      fs.writeFileSync(txtPath, result.text, 'utf8');
      console.log(`Saved text to ${file.txt}. Length: ${result.text.length}`);
    } catch (e) {
      console.error(`Failed to parse ${file.pdf}:`, e);
    }
  }
}

parseAll().then(() => console.log("All PDFs parsed successfully."));

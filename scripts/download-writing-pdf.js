const fs = require('fs');
const path = require('path');

const url = 'https://articulateusercontent.com/rise/courses/Y1fNf1rYlWVXs2azO9GgKIkk2KtAQxjB/-aDzMYcAwOkj93z3-preparing-for-the-oxford-test-of-english-writing.pdf';
const dest = path.join(__dirname, '..', 'temp_writing.pdf');

console.log("Downloading writing PDF...");

fetch(url)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.arrayBuffer();
  })
  .then(buffer => {
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log("Downloaded successfully to:", dest);
  })
  .catch(err => {
    console.error("Download failed:", err);
    process.exit(1);
  });

// Reads every .txt file in the repo root and writes www/books.json
// File name (without .txt) becomes the book title.
const fs = require('fs');
const out = [];
const files = fs.readdirSync('.')
  .filter(f => f.toLowerCase().endsWith('.txt') && !/^(readme|license)/i.test(f))
  .sort();
for (const f of files) {
  const t = f.replace(/\.txt$/i, '').replace(/_+/g, ' ').trim();
  const c = fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '').trim();
  if (c) out.push({ t, c });
}
fs.mkdirSync('www', { recursive: true });
fs.writeFileSync('www/books.json', JSON.stringify(out));
console.log('Books bundled:', out.length);

/*
  Minimal PDF text extractor using pdfjs-dist (works without worker).
  Usage: node scripts/extract-pdf.js "BORRADOR WEB BHP (1).pdf"
*/
const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist');

async function extract(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs);
    process.exit(1);
  }
  const data = new Uint8Array(fs.readFileSync(abs));
  const loadingTask = pdfjsLib.getDocument({ data, disableWorker: true });
  const pdf = await loadingTask.promise;
  const pages = [];
  const outDir = path.resolve('extracted');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((it) => (it.str || '').trim()).filter(Boolean);
    // merge consecutive pieces and dedupe noisy fragments
    const text = strings.join(' ').replace(/\s+/g, ' ').trim();
    pages.push({ index: i, text });
    const fname = path.join(outDir, String(i).padStart(2, '0') + '.txt');
    fs.writeFileSync(fname, text + '\n');
  }
  return pages;
}

(async () => {
  const file = process.argv[2] || 'BORRADOR WEB BHP (1).pdf';
  const pages = await extract(file);
  for (const p of pages) {
    console.log(`Wrote extracted/${String(p.index).padStart(2, '0')}.txt`);
  }
})();

#!/usr/bin/env node
/** Fix import order: all imports before exports */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const exportMeta = content.match(/export const metadata = buildPageMetadata\([\s\S]*?\);\n/);
  if (!exportMeta) return;

  content = content.replace(exportMeta[0], '');
  const imports = content.match(/^(import .+\n)+/m);
  const rest = content.replace(/^(import .+\n)+/m, '');

  if (imports) {
    content = imports[0] + '\n' + exportMeta[0] + rest;
    fs.writeFileSync(filePath, content);
    console.log('✓', path.relative(ROOT, filePath));
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name === 'page.tsx') fixFile(full);
  }
}

walk(path.join(ROOT, 'src/app/blog'));
walk(path.join(ROOT, 'src/app/services'));

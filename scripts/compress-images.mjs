#!/usr/bin/env node
/**
 * Compresses images in public/images and public/logos.
 * Run: node scripts/compress-images.mjs
 * Requires: npm install sharp --save-dev
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIRS = ['public/images', 'public/logos'];
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

/** Max width by filename hint */
function maxWidth(filePath) {
  const name = path.basename(filePath).toLowerCase();
  if (name.includes('banner') || name.includes('hero') || name.includes('slide')) return 1920;
  if (name.includes('logo') || name.includes('icon')) return 512;
  return 1400;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function compressFile(filePath) {
  const before = (await fs.stat(filePath)).size;
  const ext = path.extname(filePath).toLowerCase();
  const width = maxWidth(filePath);
  const tmp = `${filePath}.tmp`;

  let pipeline = sharp(filePath).rotate().resize({
    width,
    withoutEnlargement: true,
    fit: 'inside',
  });

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 82 });
  }

  await pipeline.toFile(tmp);
  const after = (await fs.stat(tmp)).size;

  if (after < before) {
    await fs.rename(tmp, filePath);
    const saved = ((1 - after / before) * 100).toFixed(1);
    console.log(`✓ ${path.relative(ROOT, filePath)}: ${formatBytes(before)} → ${formatBytes(after)} (-${saved}%)`);
    return { before, after };
  }

  await fs.unlink(tmp);
  console.log(`– ${path.relative(ROOT, filePath)}: skipped (already small)`);
  return { before, after: before };
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const dir of DIRS) {
    const abs = path.join(ROOT, dir);
    try {
      await fs.access(abs);
    } catch {
      continue;
    }
    const files = await walk(abs);
    console.log(`\nProcessing ${files.length} files in ${dir}...\n`);
    for (const f of files) {
      const { before, after } = await compressFile(f);
      totalBefore += before;
      totalAfter += after;
    }
  }

  console.log(
    `\nTotal: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)} (saved ${formatBytes(totalBefore - totalAfter)})`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

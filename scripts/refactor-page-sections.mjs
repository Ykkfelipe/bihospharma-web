#!/usr/bin/env node
/**
 * Safely replaces duplicated contact footers and WhatsApp CTAs with shared components.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src/app');

const SERVICE_PAGES = [
  'services/enfermeria/page.tsx',
  'services/fisioterapia/page.tsx',
  'services/medicina-general/page.tsx',
  'services/medicina-interna/page.tsx',
  'services/medicina-laboral/page.tsx',
  'services/nutricion/page.tsx',
  'services/psicologia/page.tsx',
  'services/reumatologia/page.tsx',
  'services/trabajo-social/page.tsx',
];

const BLOG_PAGES = [
  'blog/dia-mundial-corazon/page.tsx',
  'blog/dia-mundial-cuidados-paliativos/page.tsx',
  'blog/dia-mundial-del-lavado-de-manos/page.tsx',
  'blog/dia-mundial-fibrosis-quistica/page.tsx',
  'blog/dia-mundial-linfoma/page.tsx',
  'blog/dia-mundial-paralisis-cerebral/page.tsx',
  'blog/dia-mundial-salud-mental/page.tsx',
  'blog/dia-prevencion-suicidio/page.tsx',
  'blog/migrana-dolores-cabeza/page.tsx',
  'blog/salud-mental-sueno/page.tsx',
  'blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador/page.tsx',
];

function addImports(content, needed) {
  const imports = {
    SiteContactSection: "import SiteContactSection from '@/app/components/SiteContactSection';",
    WhatsAppCTA: "import WhatsAppCTA from '@/app/components/WhatsAppCTA';",
    PageHero: "import PageHero from '@/app/components/PageHero';",
  };
  let result = content;
  for (const key of needed) {
    const line = imports[key];
    if (line && !result.includes(line)) {
      const useClient = /^["']use client["']/.test(result);
      const insertAt = useClient
        ? result.indexOf('\n', result.indexOf('client')) + 1
        : 0;
      result = result.slice(0, insertAt) + line + '\n' + result.slice(insertAt);
    }
  }
  return result;
}

/** Replace compact WhatsApp CTA sections only (short blocks with wa.me + AGENDA) */
function replaceWhatsAppCTA(content) {
  return content.replace(
    /<section[\s\S]{0,1200}?wa\.me[\s\S]{0,400}?AGENDA TU CITA[\s\S]{0,400}?<\/section>/gi,
    '<WhatsAppCTA />'
  );
}

/** Replace blog contact block at end of page */
function replaceBlogContact(content) {
  const patterns = [
    /\{\/\* CONTACTO \*\/\}\s*<section className="contact"[\s\S]*?<\/section>/,
    /\{\/\* CONTACTO \*\/\}\s*<section className="contact relative[\s\S]*?<\/section>/,
    /\{\/\* Contact block[\s\S]*?\*\/\}\s*<section className="contact"[\s\S]*?<\/section>/,
    /\{\/\* Contacto[\s\S]*?\*\/\}\s*<section className="contact"[\s\S]*?<\/section>/,
  ];
  for (const re of patterns) {
    if (re.test(content)) {
      return content.replace(re, '<SiteContactSection variant="blog" />');
    }
  }
  return content;
}

/** Replace centered CTA button sections */
function replaceCtaButton(content) {
  return content.replace(
    /<section className="ctaButton"[\s\S]{0,1800}?AGENDA TU CITA[\s\S]{0,300}?<\/section>/gi,
    '<WhatsAppCTA />'
  );
}

/** Replace service footer — last instagram footer section before closing fragment */
function replaceServiceFooter(content) {
  const patterns = [
    /\{\/\* Contact footer \(matches Services page layout\) \*\/\}\s*<section[\s\S]*?instagram\.com\/bihospharma[\s\S]*?<\/section>/,
    /\{\/\* FOOTER block \(blue card \+ contact\) \*\/\}\s*<section[\s\S]*?instagram\.com\/bihospharma[\s\S]*?<\/section>/,
    /\{\/\* Contact footer[\s\S]*?\*\/\}\s*<section[\s\S]*?instagram\.com\/bihospharma[\s\S]*?<\/section>/,
    /\{\s*\/\*\s*Bottom legal links line[\s\S]*?\*\/\}\s*<section[\s\S]*?instagram\.com\/bihospharma[\s\S]*?<\/section>/,
  ];
  for (const re of patterns) {
    if (re.test(content)) {
      return content.replace(re, '<SiteContactSection />');
    }
  }
  // Fallback: last section containing instagram social links before </>
  const match = content.match(
    /(<section[\s\S]*?instagram\.com\/bihospharma[\s\S]*?<\/section>)(\s*<\/>[\s\S]*$)/
  );
  if (match && match[1].length < 4000) {
    return content.replace(match[1], '<SiteContactSection />');
  }
  return content;
}

function cleanupImports(content) {
  if (!content.includes('<Image') && !content.includes('<Image ')) {
    content = content.replace(/^import Image from ['"]next\/image['"];\n?/m, '');
  }
  return content;
}

async function processFile(relPath, type) {
  const filePath = path.join(SRC, relPath);
  let content = await fs.readFile(filePath, 'utf8');
  const original = content;

  content = replaceWhatsAppCTA(content);
  content = replaceCtaButton(content);
  if (type === 'service') content = replaceServiceFooter(content);
  if (type === 'blog') content = replaceBlogContact(content);

  const needed = [];
  if (content.includes('<SiteContactSection')) needed.push('SiteContactSection');
  if (content.includes('<WhatsAppCTA')) needed.push('WhatsAppCTA');
  content = addImports(content, needed);
  content = cleanupImports(content);

  if (content !== original) {
    await fs.writeFile(filePath, content);
    const origLines = original.split('\n').length;
    const newLines = content.split('\n').length;
    console.log(`✓ ${relPath} (${origLines} → ${newLines} lines)`);
    return true;
  }
  console.log(`– ${relPath}`);
  return false;
}

async function main() {
  let count = 0;
  for (const p of SERVICE_PAGES) if (await processFile(p, 'service')) count++;
  for (const p of BLOG_PAGES) if (await processFile(p, 'blog')) count++;
  console.log(`\nUpdated ${count} files`);
}

main().catch(console.error);

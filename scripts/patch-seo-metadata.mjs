#!/usr/bin/env node
/** Patches blog + service pages with OG metadata and ArticleJsonLd */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const BLOG_POSTS = [
  { slug: '/blog/salud-mental-sueno', title: 'Salud Mental y el Sueño', desc: 'Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional.', image: '/images/sueno2.png' },
  { slug: '/blog/dia-mundial-salud-mental', title: 'Día Mundial de la Salud Mental', desc: 'Una jornada para recordar la importancia de cuidar la salud mental.', image: '/images/mental.png' },
  { slug: '/blog/dia-mundial-del-lavado-de-manos', title: 'Día Mundial del Lavado de Manos', desc: 'Consejos prácticos y la importancia del lavado de manos.', image: '/images/hand-heart.png' },
  { slug: '/blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador', title: 'Síndrome de Burnout', desc: 'El agotamiento laboral crónico que afecta la energía y la motivación.', image: '/images/burnout.png' },
  { slug: '/blog/migrana-dolores-cabeza', title: '¿Migraña o dolores de cabeza?', desc: 'Conoce las diferencias entre migraña y otros tipos de cefalea.', image: '/images/migrana1.png' },
  { slug: '/blog/dia-mundial-fibrosis-quistica', title: 'Día Mundial de la Fibrosis Quística', desc: 'Visibilizar la fibrosis quística y promover el diagnóstico temprano.', image: '/images/fibrosis.png' },
  { slug: '/blog/dia-prevencion-suicidio', title: 'Día Internacional para la Prevención del Suicidio', desc: 'Crear conciencia y apoyar a quienes atraviesan momentos difíciles.', image: '/images/prev1.png' },
  { slug: '/blog/dia-mundial-linfoma', title: 'Día Mundial del Linfoma', desc: 'Concientización sobre el linfoma y la detección temprana.', image: '/images/linfoma-banner.png' },
  { slug: '/blog/dia-mundial-corazon', title: 'Día Mundial del Corazón', desc: 'Prevención y control de enfermedades cardiovasculares.', image: '/images/corazon1.png' },
  { slug: '/blog/dia-mundial-paralisis-cerebral', title: 'Día Mundial de la Parálisis Cerebral', desc: 'Inclusión, esperanza y resiliencia.', image: '/images/paralisis1.png' },
  { slug: '/blog/dia-mundial-cuidados-paliativos', title: 'Día Mundial de los Cuidados Paliativos', desc: 'Los cuidados paliativos son un derecho.', image: '/images/cuidados1.png' },
];

const SERVICES = [
  { slug: '/services/medicina-general', title: 'Medicina General', desc: 'Atención integral para prevención, diagnóstico y tratamiento.', image: '/images/medicina-general-banner.png' },
  { slug: '/services/medicina-laboral', title: 'Medicina Laboral', desc: 'Exámenes ocupacionales y salud en el trabajo.', image: '/images/banner-laboral.png' },
  { slug: '/services/medicina-interna', title: 'Medicina Interna', desc: 'Atención especializada en enfermedades del adulto.', image: '/images/medicina-interna-banner.png' },
  { slug: '/services/enfermeria', title: 'Enfermería', desc: 'Cuidado profesional y humanizado.', image: '/images/enfermeria.png' },
  { slug: '/services/nutricion', title: 'Nutrición', desc: 'Asesoría nutricional personalizada.', image: '/images/nutricion-comida-sana.png' },
  { slug: '/services/reumatologia', title: 'Reumatología', desc: 'Diagnóstico y tratamiento de enfermedades reumáticas.', image: '/images/reumatologia.png' },
  { slug: '/services/psicologia', title: 'Psicología', desc: 'Apoyo psicológico para el bienestar emocional.', image: '/images/psicologia-banner.png' },
  { slug: '/services/trabajo-social', title: 'Trabajo Social', desc: 'Acompañamiento social en salud.', image: '/images/hands.png' },
  { slug: '/services/fisioterapia', title: 'Fisioterapia', desc: 'Rehabilitación y recuperación funcional.', image: '/images/fisio1.png' },
];

function slugToDir(slug) {
  return path.join(ROOT, 'src/app', slug.replace(/^\//, ''), 'page.tsx');
}

function patchMetadata(filePath, slug, title, desc, image, type = 'website') {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  const metaBlock = `import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: '${title.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'")}',
  path: '${slug}',
  image: '${image}',
  type: '${type}',
});
`;

  content = content.replace(
    /import type \{ Metadata \} from 'next';\n/g,
    ''
  );
  content = content.replace(
    /export const metadata[^;]*\{[\s\S]*?\};\n\n/g,
    ''
  );
  content = content.replace(
    /export const metadata = [\s\S]*?;\n\n/,
    ''
  );

  if (!content.includes("from '@/lib/seo'")) {
    const firstImport = content.match(/^import .+\n/m);
    if (firstImport) {
      content = content.replace(firstImport[0], firstImport[0] + metaBlock);
    } else {
      content = metaBlock + content;
    }
  }

  if (!content.includes('ArticleJsonLd') && slug.startsWith('/blog')) {
    if (!content.includes("from '@/app/components/JsonLd'")) {
      content = content.replace(
        /^import /m,
        "import { ArticleJsonLd } from '@/app/components/JsonLd';\nimport "
      );
    }
    const jsonLd = `
      <ArticleJsonLd
        title="${title.replace(/"/g, '\\"')}"
        description="${desc.replace(/"/g, '\\"')}"
        path="${slug}"
        image="${image}"
      />`;
    if (content.includes('SiteContactSection')) {
      content = content.replace(
        /(<SiteContactSection[^/]*\/>)/,
        `$1${jsonLd}`
      );
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('✓', path.relative(ROOT, filePath));
}

for (const p of BLOG_POSTS) {
  patchMetadata(slugToDir(p.slug), p.slug, p.title, p.desc, p.image, 'article');
}
for (const s of SERVICES) {
  patchMetadata(slugToDir(s.slug), s.slug, s.title, s.desc, s.image, 'website');
}

console.log('Done.');

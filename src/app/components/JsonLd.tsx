import { CONTACT } from '@/lib/contactInfo';
import { absoluteUrl, siteUrl } from '@/lib/seo';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Bihospharma IPS',
    url: siteUrl,
    logo: absoluteUrl('/logos/bihos-logo.png'),
    description:
      'Soluciones integrales en salud. Consulta externa, medicina laboral, psicología y programas de atención en Yopal y Bogotá.',
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: CONTACT.locations.map((loc) => ({
      '@type': 'PostalAddress',
      addressLocality: loc.name.includes('YOPAL') ? 'Yopal' : 'Bogotá',
      addressRegion: loc.name.includes('YOPAL') ? 'Casanare' : 'Cundinamarca',
      addressCountry: 'CO',
      streetAddress: loc.lines[0],
    })),
    sameAs: [
      'https://www.instagram.com/bihospharma.ips/',
      'https://www.facebook.com/Bihospharma.ips/',
      'https://www.linkedin.com/company/bihospharma-sas/',
      'https://twitter.com/bihospharma',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
};

export function ArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished = '2025-09-01',
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: absoluteUrl(image),
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'Bihospharma IPS',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bihospharma IPS',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logos/bihos-logo.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

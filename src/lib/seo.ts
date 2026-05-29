import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bihospharma.com';

export function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
  image = '/images/Banner-2026.png',
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      locale: 'es_CO',
      siteName: 'Bihospharma IPS',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildBlogMetadata(slug: string, title: string, description: string, image: string): Metadata {
  return buildPageMetadata({
    title,
    description,
    path: slug,
    image,
    type: 'article',
  });
}

export function buildServiceMetadata(slug: string, title: string, description: string, image: string): Metadata {
  return buildPageMetadata({
    title,
    description,
    path: slug,
    image,
  });
}

export { siteUrl };

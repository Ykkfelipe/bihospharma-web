import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import { BLOG_POSTS } from './blogPosts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos de salud, prevención y bienestar de Bihospharma IPS. Salud mental, enfermedades crónicas y fechas conmemorativas.',
  openGraph: {
    title: 'Blog | Bihospharma',
    description: 'Noticias y artículos de salud de Bihospharma IPS.',
  },
};

const CARD_IMAGE_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

const readMoreClass =
  'inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-white bg-gradient-to-b from-[#2EA0DF] to-[#1c82c3] px-5 py-2.5 text-sm font-extrabold tracking-wide text-white no-underline shadow-md transition hover:shadow-lg';

export default function BlogIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-hidden px-3 sm:px-4">
      <PageHero
        src="/images/psicologia-banner.png"
        alt="Blog de salud Bihospharma"
        title="BLOG"
      />

      <section className="py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={post.slug}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
            >
              <div className="relative aspect-[16/10] w-full sm:h-48 sm:aspect-auto">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes={CARD_IMAGE_SIZES}
                  quality={80}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h2 className="text-lg font-bold leading-snug text-gray-800">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-2">
                  <Link href={post.slug} className={readMoreClass}>
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

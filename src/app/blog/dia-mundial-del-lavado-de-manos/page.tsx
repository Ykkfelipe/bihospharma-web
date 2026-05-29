import { buildPageMetadata } from '@/lib/seo';
import BlogPostLayout, {
  BlogSection,
  BlogHeading,
  BlogParagraph,
  BlogList,
  BlogImage,
  BlogCtaBand,
  BlogSplitRow,
} from '@/app/components/BlogPostLayout';

export const metadata = buildPageMetadata({
  title: 'Día Mundial del Lavado de Manos',
  description: 'Consejos prácticos y la importancia del lavado de manos.',
  path: '/blog/dia-mundial-del-lavado-de-manos',
  image: '/images/hand-heart.png',
  type: 'article',
});

export default function DiaLavadoManos() {
  return (
    <BlogPostLayout
      title="Día Mundial del Lavado de Manos"
      heroImage="/images/lavado-manos3.png"
      heroAlt="Día Mundial del Lavado de Manos"
      description="Consejos prácticos y la importancia del lavado de manos."
      slug="/blog/dia-mundial-del-lavado-de-manos"
      heroTitle={
        <>
          Día Mundial del
          <br />
          Lavado de Manos:
          <br />
          <span className="font-extrabold">Un gesto simple que salva vidas</span>
        </>
      }
      heightClass="h-[clamp(280px,52vh,620px)] min-h-[280px] sm:min-h-[360px]"
      overlayClass="bg-gradient-to-r from-transparent via-white/10 to-white/35"
      titleClassName="relative z-10 ml-auto max-w-[680px] px-4 text-right text-3xl font-black leading-tight text-[#0B1B2B] drop-shadow sm:text-4xl md:text-5xl max-md:mx-auto max-md:text-center"
    >
      <BlogSection>
        <BlogParagraph>
          <strong>El 15 de octubre</strong> se celebra el <strong>Día Mundial del Lavado de Manos</strong>, una fecha
          proclamada en 2008 por la Asociación Mundial para el Lavado de Manos con el propósito de promover esta práctica
          como una de las formas más efectivas y accesibles de prevenir enfermedades.
        </BlogParagraph>
        <BlogParagraph>
          <strong>Lavarse las manos</strong> con agua y jabón es un hábito sencillo, pero capaz de salvar millones de
          vidas, especialmente entre los niños. Este día busca recordar que la higiene de manos es una herramienta clave
          para detener la propagación de gérmenes y proteger la salud de todos.
        </BlogParagraph>

        <BlogHeading>La salud mental desde la infancia y la adolescencia.</BlogHeading>

        <BlogParagraph>
          La Organización Mundial de la Salud (OMS) define cinco momentos esenciales para mantener una correcta higiene de
          manos. Estos momentos, adaptados a la vida cotidiana, ayudan a reducir el riesgo de infecciones:
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/lavado-manos.png" imageAlt="Lavado de manos con jabón">
          <BlogList
            items={[
              <>
                <strong>Antes de preparar o comer alimentos:</strong>
                <br />
                Evita que los gérmenes lleguen a la comida y, posteriormente, a tu cuerpo.
              </>,
              <>
                <strong>Después de ir al baño:</strong>
                <br />
                Impide la propagación de microorganismos que pueden causar enfermedades intestinales.
              </>,
              <>
                <strong>Después de tocar mascotas o superficies sucias:</strong>
                <br />
                Los animales y los objetos de uso frecuente, como picaportes o carritos de supermercado, pueden ser
                portadores de gérmenes.
              </>,
              <>
                <strong>Después de toser, estornudar o sonarte la nariz:</strong>
                <br />
                Las manos pueden contaminarse con secreciones respiratorias que transmiten virus.
              </>,
              <>
                <strong>Antes de tocarse los ojos, la nariz o la boca:</strong>
                <br />
                Evita que los gérmenes ingresen directamente al organismo por las mucosas faciales.
              </>,
            ]}
          />
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <div className="text-center">
          <BlogHeading>
            Adoptar este hábito previene la propagación de enfermedades y protege tu salud y la de los demás.
          </BlogHeading>
        </div>
        <BlogImage src="/images/lavado-manos2.png" alt="Niño lavándose las manos con ayuda de un adulto" />
      </BlogSection>

      <BlogCtaBand>
        En <strong>Bihospharma</strong> reafirmamos nuestro <strong>compromiso</strong> con la salud y el{' '}
        <strong>bienestar</strong>, fomentando <strong>hábitos de higiene</strong> que salvan vidas.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

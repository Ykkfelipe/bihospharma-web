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
  title: '¿Migraña o dolores de cabeza?',
  description: 'Conoce las diferencias entre migraña y otros tipos de cefalea.',
  path: '/blog/migrana-dolores-cabeza',
  image: '/images/migrana1.png',
  type: 'article',
});

export default function BlogPostMigranaODolores() {
  return (
    <BlogPostLayout
      title="¿Migraña o dolores de cabeza?"
      heroImage="/images/migrana1.png"
      heroAlt="¿Migraña o dolores de cabeza?"
      description="Conoce las diferencias entre migraña y otros tipos de cefalea."
      slug="/blog/migrana-dolores-cabeza"
      heroTitle={
        <>
          ¿Migraña o dolores de
          <br />
          cabeza?
        </>
      }
      heightClass="h-[56vh] min-h-[420px]"
    >
      <BlogSection>
        <BlogParagraph>
          El <strong>dolor de cabeza</strong> es una de las molestias más comunes en la población. Sin embargo, no todos
          los dolores son iguales: mientras algunas cefaleas son pasajeras y se alivian con descanso, otras como la{' '}
          <strong>migraña</strong> pueden llegar a ser incapacitantes. Conocer las diferencias entre una{' '}
          <strong>migraña</strong> y otros tipos de dolor de cabeza es clave para recibir el tratamiento adecuado.
        </BlogParagraph>
        <BlogImage src="/images/migrana2.png" alt="Dolor de cabeza" priority />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>¿Qué es la migraña?</BlogHeading>
        <BlogSplitRow image="/images/migrana3.png" imageAlt="Persona con migraña" imageOnRight={false}>
          <BlogParagraph>
            La <strong>migraña</strong> es un tipo de dolor de cabeza recurrente y crónico que suele tener estas
            características:
          </BlogParagraph>
          <BlogList
            items={[
              'Dolor unilateral (afecta un solo lado de la cabeza).',
              'Dolor pulsátil, de intensidad moderada a severa.',
              'Intolerancia a las actividades cotidianas.',
              'Puede estar acompañada de náuseas, vómitos o sensibilidad a la luz y al ruido.',
            ]}
          />
          <BlogParagraph>
            Para el diagnóstico clínico, no es necesario presentar todos los síntomas: basta con cumplir al menos dos de
            los cuatro principales.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/migrana4.png" imageAlt="Migraña con aura">
          <BlogHeading>Migraña con aura vs. migraña sin aura</BlogHeading>
          <BlogParagraph>
            En algunos casos, la migraña se presenta con <strong>aura</strong>, un conjunto de alteraciones visuales que
            preceden o acompañan al dolor de cabeza.
          </BlogParagraph>
          <BlogList
            items={[
              <>
                El aura puede manifestarse como destellos de luz, zonas brillantes en forma de “C” o incluso una pérdida
                temporal de la visión.
              </>,
              <>
                Estos síntomas visuales suelen aparecer de manera progresiva y durar entre 5 minutos y 1 hora.
              </>,
            ]}
          />
          <BlogParagraph>
            Cuando no aparecen estas alteraciones, se considera <strong>migraña sin aura</strong>.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Otros tipos de dolores de cabeza</BlogHeading>
        <BlogParagraph>
          Además de la migraña, existen otros tipos de cefaleas, siendo la más frecuente la
          <strong> cefalea tensional</strong>. Características de la cefalea tensional:
        </BlogParagraph>
        <BlogList
          items={[
            'Dolor o presión constante en ambos lados de la cabeza.',
            'Sensación de “cabeza en un torno”, como si algo la comprimiera.',
            'Dolor leve a moderado, no incapacitante.',
            'Puede acompañarse de tensión muscular en cuello y hombros.',
            <>
              En ocasiones presenta sensibilidad a la luz o al sonido, pero sin náuseas, vómitos ni aura visual.
            </>,
          ]}
        />
        <BlogParagraph>
          Las cefaleas tensionales abarcan casi todos los dolores de cabeza que no cumplen criterios de migraña.
        </BlogParagraph>
      </BlogSection>

      <BlogCtaBand>
        En <strong>Bihospharma</strong> contamos con profesionales dispuestos a acompañarte en el cuidado de tu salud. Si
        sufres de migrañas o dolores de cabeza frecuentes, agenda tu cita y recibe la atención que necesitas.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

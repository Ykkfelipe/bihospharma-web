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
  title: 'Día Internacional para la Prevención del Suicidio',
  description: 'Crear conciencia y apoyar a quienes atraviesan momentos difíciles.',
  path: '/blog/dia-prevencion-suicidio',
  image: '/images/prev1.png',
  type: 'article',
});

export default function BlogPostPrevencionSuicidio() {
  return (
    <BlogPostLayout
      title="Día Internacional para la Prevención del Suicidio"
      heroImage="/images/prev1.png"
      heroAlt="Día Internacional para la Prevención del Suicidio"
      description="Crear conciencia y apoyar a quienes atraviesan momentos difíciles."
      slug="/blog/dia-prevencion-suicidio"
      heroTitle={
        <>
          Día Internacional para la
          <br />
          Prevención del Suicidio
        </>
      }
      heightClass="h-[56vh] min-h-[420px]"
    >
      <BlogSection>
        <BlogParagraph>
          Cada 10 de septiembre, la Asociación Internacional para la Prevención del Suicidio (IASP) junto con la
          Organización Mundial de la Salud (OMS) conmemoran el Día Internacional para la Prevención del Suicidio, con el
          propósito de generar conciencia en todo el mundo sobre un hecho fundamental: el suicidio puede prevenirse.
        </BlogParagraph>
        <BlogParagraph>
          Según la OMS, casi un millón de personas mueren por suicidio cada año, lo que equivale a una vida perdida cada
          40 segundos. Por cada muerte, se estima que ocurren al menos 20 intentos. Es además la segunda causa de muerte
          en jóvenes de 15 a 29 años, lo que lo convierte en un problema de salud pública de gran magnitud.
        </BlogParagraph>
        <BlogImage src="/images/prev2.png" alt="Conciencia y prevención del suicidio" priority />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Factores de riesgo</BlogHeading>
        <BlogParagraph>
          El suicidio es un fenómeno complejo influenciado por múltiples factores: psicológicos, sociales, ambientales y
          biológicos. Algunos de los más comunes son:
        </BlogParagraph>
        <div>
          <BlogParagraph className="font-bold">En niños y adolescentes:</BlogParagraph>
          <BlogList
            items={[
              'Antecedentes psiquiátricos familiares, depresión, pérdida de un ser querido, aislamiento social, consumo de alcohol o drogas.',
            ]}
          />
        </div>
        <div>
          <BlogParagraph className="font-bold">En adultos:</BlogParagraph>
          <BlogList
            items={[
              'Problemas en las relaciones interpersonales, violencia doméstica, entornos familiares problemáticos, enfermedades mentales, abuso de sustancias.',
            ]}
          />
        </div>
        <div>
          <BlogParagraph className="font-bold">En personas mayores:</BlogParagraph>
          <BlogList
            items={[
              'Depresión, dolor físico crónico, enfermedades incapacitantes, aislamiento social y familiar.',
            ]}
          />
        </div>
        <BlogParagraph>
          Cada persona vive una realidad distinta, por lo que la comprensión y el acompañamiento son esenciales para
          prevenir conductas suicidas.
        </BlogParagraph>
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/prev3.png" imageAlt="Señales de alerta">
          <BlogHeading>Señales de alerta</BlogHeading>
          <BlogParagraph>
            No siempre es fácil identificar si alguien piensa en el suicidio, pero existen comportamientos que pueden ser
            señales de advertencia:
          </BlogParagraph>
          <BlogList
            items={[
              'Hablar de querer morir o expresar frases como “quisiera no haber nacido”.',
              'Intentar conseguir medios para hacerse daño.',
              'Retraimiento y aislamiento extremo.',
              'Cambios repentinos de humor.',
              'Preocupación constante por la muerte.',
              'Sentimientos de desesperanza e impotencia.',
              'Consumo excesivo de alcohol o drogas.',
              'Conductas autodestructivas o imprudentes.',
              'Despedirse de familiares o amigos como si fuera definitivo.',
            ]}
          />
          <BlogParagraph>
            Reconocer estas señales puede marcar la diferencia y salvar una vida.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>La importancia de la prevención y el apoyo</BlogHeading>
        <BlogParagraph>
          Cada vida perdida representa a un hijo, padre, madre, amigo o compañero que deja una huella imborrable en
          quienes lo rodean. La prevención del suicidio implica:
        </BlogParagraph>
        <BlogList
          items={[
            'Escuchar sin juzgar a quienes expresan dolor emocional.',
            'Buscar ayuda profesional en caso de sospecha o riesgo.',
            'Promover la salud mental desde la infancia y la adolescencia.',
            'Romper el estigma que rodea a las enfermedades mentales.',
          ]}
        />
        <BlogParagraph>
          En <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la promoción de la salud mental. Si tú o
          alguien cercano atraviesa una situación difícil, no dudes en buscar apoyo profesional. Estamos aquí para
          ayudarte.
        </BlogParagraph>
        <BlogParagraph>
          La prevención del suicidio es una responsabilidad compartida: de la familia, la comunidad, los profesionales de
          salud y la sociedad en general. Hablar abiertamente sobre la salud mental, brindar apoyo y acompañar a quienes
          lo necesitan es el primer paso hacia un mundo con menos pérdidas evitables.
        </BlogParagraph>
      </BlogSection>

      <BlogCtaBand>
        Agenda tu cita con nuestros especialistas y recibe acompañamiento integral para ti y tu familia.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

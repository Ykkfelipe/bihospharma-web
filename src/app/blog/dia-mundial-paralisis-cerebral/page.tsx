import { buildPageMetadata } from '@/lib/seo';
import BlogPostLayout, {
  BlogSection,
  BlogHeading,
  BlogParagraph,
  BlogList,
  BlogCtaBand,
  BlogSplitRow,
} from '@/app/components/BlogPostLayout';

export const metadata = buildPageMetadata({
  title: 'Día Mundial de la Parálisis Cerebral',
  description: 'Inclusión, esperanza y resiliencia.',
  path: '/blog/dia-mundial-paralisis-cerebral',
  image: '/images/paralisis1.png',
  type: 'article',
});

export default function BlogPostParalisisCerebral() {
  return (
    <BlogPostLayout
      title="Día Mundial de la Parálisis Cerebral"
      heroImage="/images/paralisis1.png"
      heroAlt="Día Mundial de la Parálisis Cerebral"
      description="Inclusión, esperanza y resiliencia."
      slug="/blog/dia-mundial-paralisis-cerebral"
      heroTitle={
        <>
          Día Mundial de la Parálisis Cerebral:
          <br />
          inclusión, esperanza y resiliencia
        </>
      }
      heightClass="h-[clamp(300px,52vh,520px)]"
      titleClassName="relative z-10 mx-auto w-full max-w-[1100px] px-4 text-left text-3xl font-black leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
    >
      <BlogSection>
        <BlogParagraph>
          Cada 7 de octubre se conmemora el <strong>Día Mundial de la Parálisis Cerebral</strong>, una fecha que busca
          visibilizar y <strong>apoyar a las personas que viven con esta condición</strong>, así como reconocer la labor
          de sus familias y cuidadores.
        </BlogParagraph>
        <BlogParagraph>
          El color verde representa esta causa, simbolizando el crecimiento, la esperanza y la resiliencia de toda la
          comunidad con parálisis cerebral.
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>¿Qué es la Parálisis Cerebral?</BlogHeading>
        <BlogParagraph>
          La Parálisis Cerebral (PC), también conocida como Parálisis Cerebral Infantil, es un conjunto de trastornos
          neuromotores crónicos que se originan por una lesión o alteración en el desarrollo del cerebro inmaduro.
        </BlogParagraph>
        <BlogParagraph>
          Para que pueda hablarse de parálisis cerebral, la lesión debe ocurrir entre los primeros días de gestación y los
          3 a 5 años de vida, una etapa clave en el desarrollo del sistema nervioso.
        </BlogParagraph>
      </BlogSection>

      <BlogSection>
        <BlogParagraph>
          El término “Parálisis” se refiere a la debilidad o dificultad en el uso de los músculos, manifestada en
          alteraciones del movimiento, el tono muscular y la postura.
        </BlogParagraph>
        <BlogParagraph>
          Por su parte, el término “Cerebral” destaca que la causa radica en una lesión en las áreas motoras del cerebro,
          responsables del control del movimiento y la coordinación.
        </BlogParagraph>
        <BlogHeading>Causas y factores de riesgo</BlogHeading>
        <BlogParagraph>La PC puede desarrollarse:</BlogParagraph>
        <BlogList
          items={[
            <>
              <strong>Antes del nacimiento</strong>, debido a factores prenatales como infecciones maternas o
              alteraciones genéticas.
            </>,
            <>
              <strong>Durante el parto</strong>, por falta de oxígeno en el cerebro (anoxia), bajo peso al nacer o
              complicaciones obstétricas.
            </>,
            <>
              <strong>Después del nacimiento</strong>, por traumatismos, infecciones o episodios de anoxia en los primeros
              años de vida.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow
          image="/images/paralisis2.png"
          imageAlt="Persona en silla de ruedas sosteniendo un balón de baloncesto"
        >
          <BlogParagraph>
            Además de las limitaciones motoras, pueden presentarse otros síntomas asociados, como:
          </BlogParagraph>
          <BlogList
            items={[
              'Dificultades en la comunicación y el lenguaje.',
              'Alteraciones cognitivas.',
              'Problemas sensoriales.',
              'Crisis convulsivas o epilepsia.',
            ]}
          />
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <BlogHeading>Autocuidado y bienestar personal</BlogHeading>
        <BlogList
          items={[
            <>
              <strong>Concienciar:</strong> Informar a la sociedad sobre la parálisis cerebral, una de las
              discapacidades infantiles más comunes en el mundo, y promover la empatía hacia quienes la viven.
            </>,
            <>
              <strong>Promover la inclusión:</strong> Fomentar entornos accesibles y equitativos que permitan la
              participación activa de las personas con parálisis cerebral en la educación, el trabajo y la comunidad.
            </>,
            <>
              <strong>Asegurar derechos:</strong> Garantizar el acceso a servicios médicos, educativos y sociales que
              aseguren el bienestar y la igualdad de oportunidades.
            </>,
            <>
              <strong>Celebrar la fuerza:</strong> Reconocer los logros, la determinación y el potencial de las
              personas con parálisis cerebral, así como el acompañamiento fundamental de sus familias, terapeutas y
              cuidadores.
            </>,
          ]}
        />
      </BlogSection>

      <BlogCtaBand>
        Desde <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la atención integral, la inclusión y la
        sensibilización social.
        <br />
        <br />
        Creemos que cada persona merece un entorno accesible, lleno de oportunidades para crecer, aprender y vivir con
        dignidad.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

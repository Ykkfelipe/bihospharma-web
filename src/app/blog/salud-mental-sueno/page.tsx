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
  title: 'Salud Mental y el Sueño',
  description: 'Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional.',
  path: '/blog/salud-mental-sueno',
  image: '/images/sueno2.png',
  type: 'article',
});

export default function BlogPostSaludMentalSueno() {
  return (
    <BlogPostLayout
      title="Salud Mental y el Sueño"
      heroImage="/images/salud-mental-1.png"
      heroAlt="Salud mental y el sueño"
      description="Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional."
      slug="/blog/salud-mental-sueno"
      heroTitle={
        <>
          Salud Mental y el Sueño:
          <br />
          una relación vital para tu bienestar
        </>
      }
      titleClassName="relative z-10 px-4 text-center text-2xl font-black leading-tight text-[#1C2B4E] drop-shadow-lg sm:text-3xl md:text-4xl"
      overlayClass="bg-black/15"
    >
      <BlogSection>
        <BlogParagraph>
          El sueño es mucho más que un período de descanso para el cerebro y el cuerpo; es un{' '}
          <strong>estado esencial</strong> que influye profundamente en nuestra <strong>salud mental y física</strong>.
          Durante el sueño, ocurren procesos críticos que ayudan al cerebro a consolidar la memoria y las emociones, a
          regular el estrés y el estado de ánimo, y a recuperarse de las actividades diarias.
        </BlogParagraph>
        <BlogParagraph>
          La falta de sueño o un sueño de mala calidad puede desencadenar y agravar diferentes trastornos psicológicos.
        </BlogParagraph>
        <BlogImage src="/images/salud-mental-2.png" alt="Bienestar y descanso" priority />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/salud-mental-3.png" imageAlt="Ilustración salud mental">
          <BlogHeading>Efectos del sueño en la salud mental</BlogHeading>
          <BlogList
            items={[
              <>
                <strong>Regulación emocional y del estado de ánimo:</strong> dormir bien ayuda a manejar las{' '}
                <strong>emociones</strong>, mejora el estado de ánimo y reduce la irritabilidad. La falta de sueño está
                directamente relacionada con mayor reactividad emocional y menor resiliencia.
              </>,
              <>
                <strong>Función cognitiva y toma de decisiones:</strong> la privación del sueño <strong>afecta la atención</strong>
                , la memoria y la capacidad de juicio, aumentando errores y accidentes.
              </>,
              <>
                <strong>Salud psicológica a largo plazo:</strong> dormir poco o mal se asocia con <strong>ansiedad y depresión</strong>
                . La relación es bidireccional: el mal sueño puede ser causa y síntoma de estos trastornos.
              </>,
            ]}
          />
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <BlogHeading>Hábitos para mejorar la calidad del sueño</BlogHeading>
        <BlogList
          items={[
            <>
              <strong>Mantener horarios regulares:</strong> establecer rutinas de sueño ayuda a sincronizar el reloj
              biológico.
            </>,
            <>
              <strong>Optimizar el ambiente del dormitorio:</strong> evita ruidos y exceso de luz. Cortinas opacas o
              sonido blanco pueden ayudar.
            </>,
            <>
              <strong>Preparación antes de dormir:</strong> leer, meditar o tomar un baño caliente favorecen el descanso.
            </>,
            <>
              <strong>Cuidar el consumo de sustancias:</strong> reducir cafeína y alcohol en la noche mejora la calidad
              del sueño.
            </>,
            <>
              <strong>Actividad física:</strong> el ejercicio regular ayuda a dormir mejor, pero evita hacerlo justo
              antes de dormir.
            </>,
            <>
              <strong>Manejo del estrés y la ansiedad:</strong> técnicas como la respiración profunda o la relajación
              muscular favorecen la calma.
            </>,
            <>
              <strong>Uso adecuado de la cama:</strong> reservar la cama solo para dormir ayuda al cerebro a asociarla
              con descanso.
            </>,
            <>
              <strong>Consultar al profesional de la salud:</strong> ante problemas persistentes (insomnio, apnea,
              piernas inquietas), busca atención médica.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/services.png" imageAlt="Consulta médica" imageOnRight={false}>
          <BlogParagraph>
            Dormir bien es un pilar de la salud mental. Cuidar la calidad del sueño no solo mejora el estado de ánimo y la
            concentración, sino que también previene problemas a largo plazo como la ansiedad y la depresión. Implementar
            hábitos saludables es clave para lograr un descanso reparador.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogCtaBand>
        En Bihospharma te acompañamos en el cuidado de tu bienestar integral. <strong>Agenda tu cita</strong> con
        nuestros profesionales de salud.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

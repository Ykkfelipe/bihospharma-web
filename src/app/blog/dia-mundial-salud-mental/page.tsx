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
  title: 'Día Mundial de la Salud Mental',
  description: 'Una jornada para recordar la importancia de cuidar la salud mental.',
  path: '/blog/dia-mundial-salud-mental',
  image: '/images/mental.png',
  type: 'article',
});

export default function DiaMundialSaludMental() {
  return (
    <BlogPostLayout
      title="Día Mundial de la Salud Mental"
      heroImage="/images/mental.png"
      heroAlt="Día Mundial de la Salud Mental"
      description="Una jornada para recordar la importancia de cuidar la salud mental."
      slug="/blog/dia-mundial-salud-mental"
      heroTitle={
        <>
          <span className="block">Día Mundial de la Salud Mental:</span>
          <span className="mt-1 block">cuidar la mente también es</span>
          <span className="mt-1 block">cuidar la vida</span>
        </>
      }
      heightClass="h-[clamp(320px,52vh,520px)] min-h-[320px]"
      overlayClass="bg-black/10"
      titleClassName="relative z-10 ml-auto max-w-[560px] px-4 text-left text-2xl font-black leading-tight tracking-tight text-[#0f1d36] drop-shadow sm:text-3xl md:text-4xl max-lg:mx-auto max-lg:text-center"
    >
      <BlogSection>
        <BlogParagraph>
          Cada 10 de octubre se celebra el <strong>Día Mundial de la Salud Mental</strong>, una fecha que busca crear
          conciencia sobre la importancia del <strong>bienestar emocional</strong> y movilizar esfuerzos para{' '}
          <strong>apoyar la salud mental a nivel global</strong>.
        </BlogParagraph>
        <BlogParagraph>
          El lema de este año es <strong>“Es tiempo de priorizar la salud mental en el lugar de trabajo”</strong>, un
          recordatorio de que la estabilidad emocional es clave en todos los ámbitos de la vida.
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>La salud mental desde la infancia y la adolescencia.</BlogHeading>
        <BlogParagraph>
          La infancia y la adolescencia son etapas críticas para el desarrollo del cerebro y la salud mental. Según la{' '}
          <strong>Organización Panamericana de la Salud (OPS, 2023)</strong>, las experiencias tempranas influyen
          profundamente en la vida adulta, pudiendo determinar la trayectoria emocional y social de una persona.
        </BlogParagraph>
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/mental2.png" imageAlt="Hábitos para la salud mental">
          <BlogParagraph>
            Actualmente, <strong>la depresión y la ansiedad</strong> se encuentran entre las{' '}
            <strong>cinco principales causas de discapacidad</strong> en este grupo de edad, mientras que{' '}
            <strong>el suicidio es la tercera causa de muerte</strong> entre los jóvenes de 15 a 29 años.
          </BlogParagraph>
          <BlogParagraph>
            Estos datos reflejan la urgencia de fortalecer la prevención, el acompañamiento emocional y la búsqueda de
            ayuda profesional.
          </BlogParagraph>
          <BlogHeading>Cómo puedes cuidar tu salud mental</BlogHeading>
          <BlogParagraph>
            El bienestar emocional se cultiva día a día a través de hábitos saludables, relaciones sanas y atención
            consciente a nuestras emociones. Aquí te compartimos algunas estrategias para fortalecer tu salud mental:
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <BlogParagraph>
              Hablar de lo que sentimos es el primer paso para cuidar la salud mental. Normalizar el diálogo sobre las
              emociones reduce estigmas y alivia el peso emocional.
            </BlogParagraph>
            <BlogList
              items={[
                'Busca una red de apoyo, comparte lo que sientes y, si lo necesitas, acude a un profesional.',
                'La flexibilidad mental ayuda a enfrentar los cambios con serenidad.',
                'Aprende a ver los problemas desde nuevas perspectivas y acepta que la vida está en constante movimiento.',
                'Vivir el presente mejora el bienestar emocional.',
                'Practica la atención plena (mindfulness), desconéctate de la tecnología y realiza tus actividades con conciencia.',
                'La escritura también puede sanar.',
                'Expresar lo que sientes en un diario te ayuda a liberar emociones y entenderte mejor.',
              ]}
            />
          </div>
          <BlogImage src="/images/mental3.png" alt="Consejos salud mental" className="my-0" />
        </div>
      </BlogSection>

      <BlogSection>
        <div className="rounded-2xl bg-slate-200/80 p-6 sm:p-8">
          <BlogHeading>Hábitos para fortalecer tu bienestar</BlogHeading>
          <BlogList
            items={[
              <>
                <strong>El humor es una gran medicina.</strong>
                <div>Reír, rodearte de personas alegres y ver el lado positivo de las cosas reduce tensiones.</div>
              </>,
              <>
                <strong>Dormir bien es esencial.</strong>
                <div>Mantén una rutina de descanso, evita pantallas antes de dormir y crea un ambiente tranquilo.</div>
              </>,
              <>
                <strong>La incertidumbre forma parte de la vida.</strong>
                <div>Aceptar lo que no puedes controlar te permite crecer y mantener la calma.</div>
              </>,
              <>
                <strong>Cultiva pasiones que te inspiren.</strong>
                <div>Dedica tiempo a lo que amas y compártelo con los demás.</div>
              </>,
              <>
                <strong>Y, sobre todo, vive con propósito.</strong>
                <div>Define tus valores, establece metas y busca generar bienestar a tu alrededor.</div>
              </>,
            ]}
          />
        </div>
      </BlogSection>

      <BlogCtaBand>
        En <strong>Bihospharma</strong>, reafirmamos nuestro compromiso con la <strong>salud mental</strong> y el
        bienestar emocional de nuestros usuarios.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

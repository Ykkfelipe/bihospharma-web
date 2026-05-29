import { buildPageMetadata } from '@/lib/seo';
import {
  ServicePageHero,
  ServiceWatermarkIntro,
  ServiceSplitBlock,
  ServiceInfoBand,
  ServiceListColumn,
  ServiceCtaBanner,
  ServicePageFooter,
} from '@/app/components/service/ServicePageSections';

export const metadata = buildPageMetadata({
  title: 'Psicología',
  description: 'Apoyo psicológico para el bienestar emocional.',
  path: '/services/psicologia',
  image: '/images/psicologia-banner.png',
});

const HELP_AREAS = [
  'Estrés, ansiedad y depresión.',
  'Trastornos del sueño.',
  'Manejo del duelo.',
  'Terapia individual, de pareja y familiar.',
  'Orientación en problemas de conducta y aprendizaje en niños y adolescentes.',
  'Desarrollo de habilidades sociales y emocionales.',
  'Promoción de la salud mental y prevención de recaídas.',
];

const BENEFITS = [
  'Atención personalizada y confidencial.',
  'Profesionales especializados en diferentes enfoques terapéuticos.',
  'Acompañamiento integral junto a otras especialidades médicas.',
  'Estrategias prácticas para mejorar tu calidad de vida.',
];

export default function PsicologiaPage() {
  return (
    <>
      <ServicePageHero
        title="PSICOLOGÍA"
        image="/images/psicologia-banner.png"
        imageAlt="Psicología Bihospharma"
        heightClass="h-[50vh] min-h-[280px] sm:min-h-[340px]"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS ofrecemos acompañamiento en Psicología Clínica, brindando un espacio seguro y confidencial
          para el cuidado de tu salud mental, ayudándote a comprender, manejar y superar situaciones que afectan tu vida
          diaria.
        </p>
      </ServiceWatermarkIntro>

      <ServiceSplitBlock
        image="/images/psicologia-que-es.png"
        imageAlt="¿Qué es Psicología?"
        title="¿Qué es el servicio de Psicología?"
      >
        <p>
          La psicología clínica se centra en la evaluación, diagnóstico y tratamiento de las dificultades emocionales,
          conductuales y cognitivas que interfieren en tu bienestar.
        </p>
        <p>
          Nuestros psicólogos te ofrecen herramientas para afrontar el estrés, los conflictos, la ansiedad y otras
          situaciones, fortaleciendo tus habilidades personales y sociales.
        </p>
      </ServiceSplitBlock>

      <ServiceInfoBand>
        <ServiceListColumn title="Te ayudaremos en:" items={HELP_AREAS} />
        <ServiceListColumn title="Beneficios de nuestro servicio de Psicología" items={BENEFITS} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/psicologia-last.png"
        quote="En Bihospharma IPS, creemos que la salud mental es tan importante como la física. Por eso, trabajamos contigo para construir un equilibrio emocional que te permita vivir con mayor tranquilidad y bienestar."
        whatsappMessage="Hola, quiero agendar una cita de Psicología"
        tagline="Tu bienestar emocional también es salud"
      />

      <ServicePageFooter />
    </>
  );
}

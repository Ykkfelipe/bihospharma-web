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
  title: 'Medicina General',
  description:
    'Atención integral para prevención, diagnóstico y tratamiento con enfoque humano.',
  path: '/services/medicina-general',
  image: '/images/banner-medico-con-estetoscopio.png',
});

const WHEN_TO_VISIT = [
  'Fiebre persistente, tos o síntomas gripales prolongados.',
  'Dolor de cabeza frecuente, mareos o fatiga extrema.',
  'Malestar digestivo recurrente o alteraciones en la alimentación.',
  'Problemas en la piel como irritaciones, alergias o infecciones.',
  'Control y seguimiento de enfermedades crónicas.',
  'Revisión médica general para prevenir enfermedades.',
];

const BENEFITS = [
  'Atención personalizada basada en tus necesidades de salud.',
  'Diagnóstico temprano para evitar complicaciones.',
  'Seguimiento continuo para mejorar tu calidad de vida.',
  'Educación en salud para tomar decisiones informadas.',
];

export default function MedicinaGeneralPage() {
  return (
    <>
      <ServicePageHero
        title="MEDICINA GENERAL"
        image="/images/banner-medico-con-estetoscopio.png"
        imageAlt="Médico con estetoscopio — Medicina General Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma, ofrecemos atención en Medicina General con un enfoque integral en la prevención,
          diagnóstico y tratamiento de enfermedades. Nuestro equipo de profesionales está comprometido con tu
          salud, brindándote un servicio cálido, confiable y personalizado.
        </p>
      </ServiceWatermarkIntro>

      <ServiceSplitBlock
        image="/images/feliz-medico-masculino-visitando-pacientes-mayores-en-casa-y-revisando-documentos-medicos.png"
        imageAlt="Médico en consulta con paciente"
        title="¿Qué es la Medicina General?"
      >
        <p>
          La Medicina General es la primera línea de atención, encargada de evaluar, diagnosticar y tratar
          enfermedades comunes, realizar seguimiento a condiciones crónicas y promover hábitos saludables, con
          remisión a especialidades cuando es necesario.
        </p>
      </ServiceSplitBlock>

      <ServiceInfoBand>
        <ServiceListColumn
          title="¿Cuándo Deberías Consultar a un Médico General?"
          intro="Si presentas alguno de los siguientes síntomas o situaciones, es recomendable agendar una consulta:"
          items={WHEN_TO_VISIT}
        />
        <ServiceListColumn title="Beneficios de la Atención en Medicina General" items={BENEFITS} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/general-banner2.png"
        quote="Cuidar de tu salud es la mejor inversión. En Bihospharma, estamos listos para brindarte la mejor atención en Medicina General."
        whatsappMessage="Hola, quiero agendar una cita de Medicina General"
      />

      <ServicePageFooter />
    </>
  );
}

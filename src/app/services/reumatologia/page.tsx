import { buildPageMetadata } from '@/lib/seo';
import {
  ServicePageHero,
  ServiceWatermarkIntro,
  ServiceServicesPanel,
  ServiceInfoBand,
  ServiceListColumn,
  ServiceCtaBanner,
  ServicePageFooter,
} from '@/app/components/service/ServicePageSections';

export const metadata = buildPageMetadata({
  title: 'Reumatología',
  description: 'Diagnóstico y tratamiento de enfermedades reumáticas.',
  path: '/services/reumatologia',
  image: '/images/reumatologia.png',
});

const DISEASES = [
  'Artritis reumatoide.',
  'Artrosis.',
  'Lupus eritematoso sistémico.',
  'Espondiloartritis.',
  'Gota.',
  'Osteoporosis.',
  'Síndrome de Sjögren.',
  'Fibromialgia.',
];

const ADVANTAGES = [
  'Diagnóstico temprano con apoyo de exámenes especializados.',
  'Plan de tratamiento personalizado.',
  'Coordinación con otras especialidades para un manejo integral.',
  'Educación al paciente para el autocuidado y prevención de complicaciones.',
];

export default function ReumatologiaPage() {
  return (
    <>
      <ServicePageHero
        title="REUMATOLOGÍA"
        image="/images/reumatologia.png"
        imageAlt="Reumatología Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS, contamos con especialistas en Reumatología dedicados a la prevención, diagnóstico y
          tratamiento de enfermedades que afectan el sistema musculoesquelético y el tejido conectivo, mejorando tu
          calidad de vida y movilidad.
        </p>
      </ServiceWatermarkIntro>

      <ServiceServicesPanel
        image="/images/radiografia.png"
        imageAlt="Servicios de Reumatología"
        title="¿Qué es la Reumatología?"
      >
        <p>
          La reumatología es la especialidad médica que se enfoca en las enfermedades que afectan las articulaciones,
          músculos, huesos y tejidos blandos, muchas de ellas de origen autoinmune o inflamatorio.
        </p>
        <p>
          Nuestros reumatólogos ofrecen una atención integral para diagnosticar tempranamente y controlar estas
          patologías, evitando su progresión y reduciendo el dolor.
        </p>
      </ServiceServicesPanel>

      <ServiceInfoBand>
        <ServiceListColumn title="Enfermedades que tratamos" items={DISEASES} />
        <ServiceListColumn
          title={
            <>
              Ventajas de atenderte con nuestro equipo de
              <br />
              Reumatología
            </>
          }
          items={ADVANTAGES}
        />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/hand-pain.png"
        quote="En Bihospharma IPS trabajamos para que nuestros pacientes con enfermedades reumatológicas puedan mantener su movilidad, autonomía y bienestar a largo plazo."
        whatsappMessage="Hola, quiero agendar una cita de Reumatología"
        tagline="Cuidamos la salud de tus huesos, músculos y articulaciones"
      />

      <ServicePageFooter />
    </>
  );
}

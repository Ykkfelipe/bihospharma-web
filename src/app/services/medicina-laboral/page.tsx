import { buildPageMetadata } from '@/lib/seo';
import {
  ServicePageHero,
  ServiceWatermarkIntro,
  ServiceLaboralFeatures,
  ServiceInfoBand,
  ServiceListColumn,
  ServiceCtaBanner,
  ServicePageFooter,
} from '@/app/components/service/ServicePageSections';

export const metadata = buildPageMetadata({
  title: 'Medicina Laboral',
  description: 'Exámenes ocupacionales y salud en el trabajo.',
  path: '/services/medicina-laboral',
  image: '/images/banner-laboral.png',
});

const TREATMENTS = [
  'Riesgos osteomusculares y de fatiga laboral.',
  'Exposición a agentes físicos, químicos o biológicos.',
  'Trastornos respiratorios y de la voz por el trabajo.',
  'Reintegro y restricciones laborales.',
];

const ADVANTAGES = [
  'Evaluación médica integral.',
  'Diagnóstico preciso y personalizado.',
  'Coordinación con otras especialidades.',
  'Atención cálida, humana y sin demoras innecesarias.',
];

const LABORAL_FEATURES = [
  { image: '/images/laboral1.png', imageAlt: 'Exámenes ocupacionales', label: 'Exámenes ocupacionales' },
  {
    image: '/images/laboral2.png',
    imageAlt: 'Evaluaciones de ingreso, periódicas y de egreso',
    label: (
      <>
        Evaluaciones de
        <br />
        ingreso, periódicas y
        <br />
        de egreso
      </>
    ),
  },
  {
    image: '/images/laboral3.png',
    imageAlt: 'Exámenes médico-ocupacionales con énfasis osteomuscular',
    label: (
      <>
        Exámenes médico
        <br />
        ocupacionales con
        <br />
        énfasis osteomuscular.
      </>
    ),
  },
];

export default function MedicinaLaboralPage() {
  return (
    <>
      <ServicePageHero
        title={
          <>
            Medicina Laboral
            <br />
            Exámenes Ocupacionales
          </>
        }
        image="/images/banner-laboral.png"
        imageAlt="Medicina Laboral Bihospharma"
        heightClass="h-[50vh] min-h-[300px] sm:min-h-[360px]"
        titleClassName="relative z-10 px-4 text-center text-2xl font-extrabold uppercase leading-tight tracking-wider text-white drop-shadow-lg sm:text-3xl md:text-4xl"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma S.A.S, ofrecemos un servicio integral de Medicina Laboral, enfocado en la prevención,
          diagnóstico y control de riesgos ocupacionales. Nuestro objetivo es garantizar el bienestar de los
          trabajadores y el cumplimiento de las normativas de salud laboral en las empresas.
        </p>
      </ServiceWatermarkIntro>

      <ServiceLaboralFeatures title="¿Qué es la Medicina Laboral?" features={LABORAL_FEATURES} />

      <ServiceInfoBand>
        <ServiceListColumn title="¿Qué tratamos en Medicina Laboral?" items={TREATMENTS} />
        <ServiceListColumn title="Ventajas de atenderte con nosotros" items={ADVANTAGES} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/laboral-3.png"
        quote="En Bihospharma, contamos con especialistas para la prevención, diagnóstico y control de riesgos ocupacionales en tu empresa."
        whatsappMessage="Hola, quiero agendar exámenes de Medicina Laboral"
        tagline="Y garantiza un entorno laboral seguro y saludable."
      />

      <ServicePageFooter />
    </>
  );
}

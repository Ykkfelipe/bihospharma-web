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
  title: 'Medicina Interna',
  description: 'Atención especializada en enfermedades del adulto.',
  path: '/services/medicina-interna',
  image: '/images/medicina-interna-banner.png',
});

const TREATMENTS = [
  'Hipertensión arterial y enfermedades cardiovasculares.',
  'Diabetes y trastornos endocrinos.',
  'Enfermedades respiratorias crónicas.',
  'Trastornos gastrointestinales y hepáticos.',
  'Enfermedades autoinmunes.',
  'Alteraciones del sistema inmune.',
  'Valoración integral de pacientes con múltiples enfermedades.',
];

const ADVANTAGES = [
  'Evaluación médica integral.',
  'Diagnóstico preciso y personalizado.',
  'Coordinación con otras especialidades.',
  'Atención cálida, humana y sin demoras innecesarias.',
];

export default function MedicinaInternaPage() {
  return (
    <>
      <ServicePageHero
        title="MEDICINA INTERNA"
        image="/images/medicina-interna-banner.png"
        imageAlt="Medicina Interna Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS, contamos con médicos especialistas en Medicina Interna dedicados a la prevención,
          diagnóstico y tratamiento de enfermedades en adultos, brindando atención humana, ética y de alta calidad.
        </p>
      </ServiceWatermarkIntro>

      <ServiceServicesPanel
        image="/images/medicina-interna.png"
        imageAlt="Servicios de Medicina Interna"
        title="¿Qué es la Medicina Interna?"
      >
        <p>
          La Medicina Interna es la especialidad médica que aborda de manera integral las enfermedades que afectan a
          los adultos, especialmente aquellas complejas o que comprometen varios órganos y sistemas del cuerpo.
        </p>
        <p>
          Nuestros internistas actúan como médicos de cabecera especializados, coordinando la atención con otras
          especialidades cuando es necesario.
        </p>
      </ServiceServicesPanel>

      <ServiceInfoBand>
        <ServiceListColumn title="¿Qué tratamos en Medicina Interna?" items={TREATMENTS} />
        <ServiceListColumn title="Ventajas de atenderte con nosotros" items={ADVANTAGES} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/imagen3interna.png"
        quote="En Bihospharma, contamos con especialistas para la prevención, diagnóstico y tratamiento de enfermedades en adultos, con un enfoque humano y profesional."
        whatsappMessage="Hola, quiero agendar una cita de Medicina Interna"
        tagline="Y garantiza un entorno laboral seguro y saludable."
      />

      <ServicePageFooter />
    </>
  );
}

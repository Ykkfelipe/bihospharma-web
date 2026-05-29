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
  title: 'Enfermería',
  description: 'Cuidado profesional y humanizado.',
  path: '/services/enfermeria',
  image: '/images/hand-heart.png',
});

const SERVICES = [
  'Toma de signos vitales.',
  'Administración de medicamentos por vía oral, intramuscular, endovenosa y subcutánea.',
  'Curaciones y cuidado de heridas.',
  'Retiro y cambio de puntos de sutura.',
  'Canalización de vías periféricas.',
  'Nebulizaciones y terapias respiratorias.',
  'Control de glicemia capilar.',
  'Aplicación de inyectables y vacunas.',
  'Educación en autocuidado y prevención.',
];

const WHY_CHOOSE = [
  'Atención cálida y respetuosa.',
  'Profesionales capacitados y actualizados.',
  'Procedimientos seguros y con protocolos estrictos de bioseguridad.',
  'Disponibilidad y agilidad en la atención.',
];

export default function EnfermeriaPage() {
  return (
    <>
      <ServicePageHero
        title="ENFERMERÍA"
        image="/images/hand-heart.png"
        imageAlt="Enfermería Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS, nuestro equipo de enfermería está comprometido con tu bienestar, ofreciendo atención
          profesional, humana y oportuna en cada procedimiento y acompañamiento que necesites.
        </p>
      </ServiceWatermarkIntro>

      <ServiceSplitBlock
        image="/images/group-photo.png"
        imageAlt="Grupo de profesionales de enfermería"
        title="¿Qué es el servicio de Enfermería?"
        imageOnRight
      >
        <p>
          El servicio de enfermería es el pilar fundamental en el cuidado de la salud. Nuestros profesionales realizan
          procedimientos clínicos, apoyan la recuperación de los pacientes y brindan educación en salud para prevenir
          enfermedades y promover hábitos saludables.
        </p>
      </ServiceSplitBlock>

      <ServiceInfoBand>
        <ServiceListColumn title="Servicios de Enfermería que ofrecemos" items={SERVICES} />
        <ServiceListColumn title="¿Por qué elegir nuestro servicio de Enfermería?" items={WHY_CHOOSE} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/heart-chest.png"
        quote="En Bihospharma IPS entendemos que el cuidado de la salud está en los detalles. Por eso, cada procedimiento de enfermería es realizado con precisión, amabilidad y dedicación, asegurando tu tranquilidad en todo momento."
        whatsappMessage="Hola, quiero agendar una cita de Enfermería"
        tagline="Cuidamos de ti con profesionalismo y calidez en cada procedimiento"
      />

      <ServicePageFooter />
    </>
  );
}

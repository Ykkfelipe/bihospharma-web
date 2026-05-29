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
  title: 'Fisioterapia',
  description: 'Rehabilitación y recuperación funcional.',
  path: '/services/fisioterapia',
  image: '/images/fisio2.png',
});

const INTERVENTION_AREAS = [
  'Terapia manual y movilización articular.',
  'Ejercicio terapéutico y fortalecimiento.',
  'Rehabilitación postoperatoria y postlesión.',
  'Manejo del dolor agudo y crónico.',
  'Fisioterapia respiratoria.',
  'Prevención de lesiones y educación postural.',
];

const BENEFITS = [
  'Mejora de la movilidad y la fuerza.',
  'Disminución del dolor y la inflamación.',
  'Aceleración de la recuperación funcional.',
  'Prevención de recaídas y nuevas lesiones.',
  'Mayor independencia y calidad de vida.',
];

export default function FisioterapiaPage() {
  return (
    <>
      <ServicePageHero
        title="FISIOTERAPIA"
        image="/images/fisio2.png"
        imageAlt="Fisioterapia Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS ofrecemos Fisioterapia para prevenir, tratar y rehabilitar lesiones y disfunciones
          musculoesqueléticas. Nuestro objetivo es aliviar el dolor, recuperar tu movilidad y ayudarte a retomar tus
          actividades con seguridad.
        </p>
      </ServiceWatermarkIntro>

      <ServiceServicesPanel
        image="/images/fisio3.png"
        imageAlt="Servicios de Fisioterapia"
        title="¿Qué es el servicio de Fisioterapia?"
      >
        <p>
          La Fisioterapia es una disciplina de la salud que evalúa, diagnostica y trata alteraciones del movimiento y del
          sistema musculoesquelético. Con técnicas manuales, ejercicio terapéutico y equipos especializados, diseñamos
          planes personalizados para recuperar funciones, corregir patrones de movimiento y prevenir recaídas.
        </p>
      </ServiceServicesPanel>

      <ServiceInfoBand>
        <ServiceListColumn title="Áreas de intervención" items={INTERVENTION_AREAS} />
        <ServiceListColumn title="Beneficios de nuestro servicio" items={BENEFITS} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/fisio1.png"
        quote="En Bihospharma trabajamos contigo para recuperar tu movilidad, reducir el dolor y lograr una rehabilitación segura y efectiva."
        whatsappMessage="Hola, quiero agendar una cita de Fisioterapia"
        tagline="Recupera tu movilidad, mejora tu calidad de vida."
      />

      <ServicePageFooter />
    </>
  );
}

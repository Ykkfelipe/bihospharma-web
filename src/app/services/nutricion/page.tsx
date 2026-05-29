import { buildPageMetadata } from '@/lib/seo';
import {
  ServicePageHero,
  ServiceWatermarkIntro,
  ServiceSplitWithServicesImage,
  ServiceInfoBand,
  ServiceListColumn,
  ServiceCtaBanner,
  ServicePageFooter,
} from '@/app/components/service/ServicePageSections';

export const metadata = buildPageMetadata({
  title: 'Nutrición',
  description: 'Asesoría nutricional personalizada.',
  path: '/services/nutricion',
  image: '/images/nutricion-comida-sana.png',
});

const AREAS = [
  'Control y manejo de peso.',
  'Alimentación en enfermedades crónicas (diabetes, hipertensión, colesterol alto).',
  'Nutrición deportiva.',
  'Planes para embarazo y lactancia.',
  'Alimentación en la infancia y adolescencia.',
  'Educación nutricional para hábitos saludables.',
];

const ADVANTAGES = [
  'Valoración integral y personalizada.',
  'Planes alimenticios prácticos y adaptados a tu rutina.',
  'Acompañamiento y seguimiento para mantener los resultados.',
  'Orientación basada en evidencia científica.',
];

export default function NutricionPage() {
  return (
    <>
      <ServicePageHero
        title="NUTRICIÓN"
        image="/images/nutricion-comida-sana.png"
        imageAlt="Nutrición Bihospharma"
        heightClass="h-[50vh] min-h-[300px] sm:min-h-[360px] md:min-h-[400px]"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS, nuestro servicio de nutrición está enfocado en mejorar tu calidad de vida a través de
          planes alimenticios personalizados, adaptados a tus necesidades, condición de salud y estilo de vida.
        </p>
      </ServiceWatermarkIntro>

      <ServiceSplitWithServicesImage
        image="/images/nutricion-servicios.png"
        imageAlt="Servicios de nutrición"
        title="¿En qué consiste nuestro servicio de Nutrición?"
      >
        <p>
          La consulta de nutrición te brinda orientación profesional sobre cómo alimentarte de forma equilibrada para
          prevenir enfermedades, controlar tu peso y optimizar tu bienestar físico y mental.
        </p>
        <p>
          Nuestros nutricionistas realizan una valoración completa y diseñan un plan único para ti, teniendo en cuenta
          tu estado de salud, objetivos y preferencias.
        </p>
      </ServiceSplitWithServicesImage>

      <ServiceInfoBand>
        <ServiceListColumn title="Áreas en las que te podemos ayudar" items={AREAS} />
        <ServiceListColumn title="Ventajas de nuestro servicio" items={ADVANTAGES} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/nutricion-weights.png"
        quote="En Bihospharma IPS, la nutrición no es solo un plan de alimentación, es un acompañamiento constante para que adoptes hábitos que mejoren tu salud a largo plazo."
        whatsappMessage="Hola, quiero agendar una cita de Nutrición"
        tagline="Alimentarte bien es cuidarte mejor"
      />

      <ServicePageFooter />
    </>
  );
}

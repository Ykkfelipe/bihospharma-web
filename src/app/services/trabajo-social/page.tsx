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
  title: 'Trabajo Social',
  description: 'Acompañamiento social en salud.',
  path: '/services/trabajo-social',
  image: '/images/hands.png',
});

const INTERVENTION_AREAS = [
  'Orientación familiar y comunitaria.',
  'Acompañamiento en situaciones de vulnerabilidad social.',
  'Asesoría en acceso a programas y servicios de salud.',
  'Prevención de problemáticas sociales que afectan la salud.',
  'Promoción de hábitos saludables y redes de apoyo.',
  'Fortalecimiento de la comunicación y relaciones familiares.',
];

const BENEFITS = [
  'Atención cercana, humana y empática.',
  'Orientación integral frente a situaciones sociales y de salud.',
  'Acompañamiento en procesos administrativos y de acceso a servicios.',
  'Apoyo en la construcción de redes de cuidado y protección.',
];

export default function TrabajoSocialPage() {
  return (
    <>
      <ServicePageHero
        title="TRABAJO SOCIAL"
        image="/images/hands.png"
        imageAlt="Trabajo Social Bihospharma"
      />

      <ServiceWatermarkIntro>
        <p>
          En Bihospharma IPS, el área de Trabajo Social acompaña a los usuarios y sus familias en la resolución de
          situaciones sociales, familiares y comunitarias que afectan su salud y calidad de vida.
        </p>
      </ServiceWatermarkIntro>

      <ServiceSplitBlock
        image="/images/trabajo-social.png"
        imageAlt="Trabajo Social"
        title="¿Qué es el servicio de Trabajo Social?"
      >
        <p>
          El Trabajo Social en salud se centra en brindar orientación, apoyo y acompañamiento a las personas y sus
          familias para enfrentar dificultades sociales, económicas o familiares que influyen en su bienestar físico y
          emocional.
        </p>
        <p>
          Nuestro equipo trabaja de manera integral con las demás áreas médicas para garantizar una atención completa y
          humana.
        </p>
      </ServiceSplitBlock>

      <ServiceInfoBand>
        <ServiceListColumn title="Áreas de intervención" items={INTERVENTION_AREAS} />
        <ServiceListColumn title="Beneficios de nuestro servicio de Trabajo Social" items={BENEFITS} />
      </ServiceInfoBand>

      <ServiceCtaBanner
        image="/images/trabajo-social-2.png"
        quote="En Bihospharma entendemos que la salud no solo depende del cuerpo, sino también del entorno en el que vivimos. Por eso, desde Trabajo Social ofrecemos acompañamiento para que cada persona y su familia puedan superar barreras y acceder a una vida más plena y saludable."
        whatsappMessage="Hola, quiero agendar una cita de Trabajo Social"
        tagline="Tu bienestar emocional también es salud"
      />

      <ServicePageFooter />
    </>
  );
}

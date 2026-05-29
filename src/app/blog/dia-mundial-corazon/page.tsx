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
  title: 'Día Mundial del Corazón',
  description: 'Prevención y control de enfermedades cardiovasculares.',
  path: '/blog/dia-mundial-corazon',
  image: '/images/corazon1.png',
  type: 'article',
});

export default function DiaMundialCorazonPage() {
  return (
    <BlogPostLayout
      title="Día Mundial del Corazón"
      heroImage="/images/corazon1.png"
      heroAlt="Día Mundial del Corazón"
      description="Prevención y control de enfermedades cardiovasculares."
      slug="/blog/dia-mundial-corazon"
    >
      <BlogSection>
        <BlogParagraph>
          Desde el año 2000, la <strong>Federación Mundial del Corazón</strong>, con el apoyo de la{' '}
          <strong>Organización Mundial de la Salud (OMS)</strong>, conmemora cada <strong>25 de septiembre</strong> el{' '}
          <strong>Día Mundial del Corazón</strong>. Esta fecha busca crear conciencia sobre las enfermedades
          cardiovasculares, su prevención, control y tratamiento.
        </BlogParagraph>
      </BlogSection>

      <BlogSection>
        <BlogHeading>Un problema de salud global</BlogHeading>
        <BlogParagraph>Las enfermedades cardiovasculares son la principal causa de muerte en el mundo.</BlogParagraph>
        <BlogList
          items={[
            <>
              Cada año, más de 17 millones de personas fallecen a causa de infartos y accidentes cerebrovasculares.
            </>,
            <>
              Se estima que para el año 2030 esta cifra alcanzará los 23 millones si no se refuerzan las medidas de
              prevención.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Enfermedades más comunes que afectan al corazón</BlogHeading>
        <BlogParagraph>Algunas de las afecciones cardíacas más frecuentes son:</BlogParagraph>
        <BlogList
          items={[
            <>
              <strong>Infarto de miocardio:</strong> ocurre por el estrechamiento o bloqueo de los vasos sanguíneos que
              llevan sangre al corazón.
            </>,
            <>
              <strong>Enfermedades cerebrovasculares:</strong> causadas por sangrado cerebral o coágulos en el cerebro.
            </>,
            <>
              <strong>Hipertensión arterial:</strong> presión alta, uno de los mayores factores de riesgo.
            </>,
            <>
              <strong>Angina de pecho:</strong> dolor torácico debido a la reducción del flujo sanguíneo al corazón.
            </>,
            <>
              <strong>Arritmias:</strong> alteraciones en el ritmo normal del corazón.
            </>,
            <>
              <strong>Insuficiencia cardíaca:</strong> cuando el corazón no puede bombear suficiente sangre para cubrir
              las necesidades del cuerpo.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/corazon2.png" imageAlt="Cuida tu corazón">
          <BlogHeading>¿Cómo cuidar tu corazón?</BlogHeading>
          <BlogParagraph>
            La OMS invita a adoptar cambios sencillos pero poderosos en el estilo de vida para proteger el corazón:
          </BlogParagraph>
          <BlogList
            items={[
              <>
                <strong>Alimentación saludable:</strong> seguir una dieta tipo mediterránea, reduciendo grasas saturadas
                e incorporando omega 3 y pescado.
              </>,
              <>
                <strong>Ejercicio físico:</strong> al menos 30 minutos diarios de actividad moderada.
              </>,
              <>
                <strong>Evitar sustancias dañinas:</strong> limitar la sal, reducir el alcohol y eliminar el tabaco.
              </>,
              <>
                <strong>Controlar el colesterol y la presión arterial.</strong>
              </>,
              <>
                <strong>Mantener un peso saludable:</strong> ya que la obesidad es un importante factor de riesgo
                cardiovascular.
              </>,
            ]}
          />
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogParagraph className="text-center text-lg sm:text-xl">
          El cuidado del corazón depende en gran medida de nuestros hábitos diarios. Prevenir es la mejor manera de
          reducir el riesgo de enfermedades cardiovasculares y garantizar una mejor calidad de vida.
        </BlogParagraph>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <BlogImage src="/images/corazon4.png" alt="Ejercicio físico" width={280} height={200} className="my-0 max-w-[280px]" />
          <BlogImage src="/images/corazon5.png" alt="Alimentación saludable" width={280} height={200} className="my-0 max-w-[280px]" />
          <BlogImage src="/images/corazon6.png" alt="Control de peso" width={280} height={200} className="my-0 max-w-[280px]" />
        </div>
      </BlogSection>

      <BlogCtaBand>
        En <strong>Bihospharma</strong> te acompañamos en el cuidado integral de tu salud. Agenda tu cita con nuestros
        especialistas y da el primer paso hacia un corazón más saludable.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

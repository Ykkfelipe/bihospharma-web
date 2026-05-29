import { buildPageMetadata } from '@/lib/seo';
import BlogPostLayout, {
  BlogSection,
  BlogHeading,
  BlogParagraph,
  BlogImage,
  BlogCtaBand,
  BlogSplitRow,
} from '@/app/components/BlogPostLayout';

export const metadata = buildPageMetadata({
  title: 'Día Mundial de la Fibrosis Quística',
  description: 'Visibilizar la fibrosis quística y promover el diagnóstico temprano.',
  path: '/blog/dia-mundial-fibrosis-quistica',
  image: '/images/fibrosis.png',
  type: 'article',
});

export default function DiaMundialFibrosisQuisticaPage() {
  return (
    <BlogPostLayout
      title="Día Mundial de la Fibrosis Quística"
      heroImage="/images/fibrosis.png"
      heroAlt="Día Mundial de la Fibrosis Quística"
      description="Visibilizar la fibrosis quística y promover el diagnóstico temprano."
      slug="/blog/dia-mundial-fibrosis-quistica"
      heroTitle={
        <>
          Día Mundial de la
          <br />
          Fibrosis Quística
        </>
      }
      heightClass="h-[58vh] min-h-[420px]"
    >
      <BlogSection>
        <BlogParagraph>
          Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística (FQ), una fecha impulsada por la
          Asociación Internacional de Fibrosis Quística (CFW) desde 2013, con el objetivo de visibilizar esta enfermedad
          crónica y apoyar a las personas y familias que la enfrentan.
        </BlogParagraph>
        <BlogImage src="/images/fibrosis2.png" alt="Consulta sobre síntomas respiratorios" priority />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>¿Qué es la fibrosis quística?</BlogHeading>
        <BlogParagraph>
          La fibrosis quística (FQ) es una enfermedad crónica y hereditaria, que produce generalmente la degeneración del
          sistema digestivo y del sistema respiratorio. En realidad, esta alteración genética, solo afecta las zonas del
          cuerpo que producen secreciones tales como los pulmones, el páncreas, hígado y el sistema reproductivo.
        </BlogParagraph>
        <BlogParagraph>
          La fibrosis quística provoca una obstrucción en los canales que transportan dichas secreciones que terminan
          convirtiéndose en infecciones graves. El verdadero problema es que, con el paso de los años, este padecimiento
          tiende a empeorar, lo que trae como resultado una esperanza de vida limitada.
        </BlogParagraph>

        <BlogHeading>La importancia del cribado neonatal o la prueba talón</BlogHeading>
        <BlogParagraph>
          El mejor diagnóstico temprano que pueda existir hoy en día es el cribado neonatal o prueba talón. Se trata de
          un pequeño examen de laboratorio que se le aplica al recién nacido durante los primeros 15 días de haber
          llegado al mundo.
        </BlogParagraph>

        <BlogSplitRow image="/images/fibrosis3.png" imageAlt="Prueba del talón en recién nacido">
          <BlogParagraph>
            Para ejecutarlo una enfermera o doctora tomará una muestra de tejido del talón del bebé, dejándole una
            pequeña marca parecida a la de una ampolla abierta, la cual se debe limpiar regularmente hasta que cicatrice.
          </BlogParagraph>
          <BlogParagraph>
            La prueba de talón, no solo permite detectar la fibrosis quística, sino cualquier enfermedad metabólica
            congénita, alteraciones cerebrales y neurológicas, problemas hormonales, trastornos de crecimiento, entre
            otra serie de padecimientos que de ser tratados eficazmente desde niños pueden mejorar la salud de la persona
            alargando su vida.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/fibrosis4.png" imageAlt="Revisión de radiografía pulmonar" imageOnRight={false}>
          <BlogParagraph>
            <strong>La fibrosis quística</strong> es un desafío de salud que requiere conciencia, investigación y
            acompañamiento médico especializado. En fechas como esta, <strong>recordamos</strong> la importancia de la{' '}
            <strong>prevención</strong>, el <strong>diagnóstico</strong> temprano y el <strong>apoyo a las familias</strong>{' '}
            que viven con esta <strong>condición</strong>.
          </BlogParagraph>
        </BlogSplitRow>
        <BlogParagraph>
          En <strong>Bihospharma</strong> reafirmamos nuestro compromiso con la <strong>promoción</strong> de la salud y
          la <strong>prevención</strong> de enfermedades.
        </BlogParagraph>
      </BlogSection>

      <BlogCtaBand>
        En <strong>Bihospharma</strong> contamos con profesionales dispuestos a acompañarte en el cuidado de tu salud. Si
        sufres de migrañas o dolores de cabeza frecuentes, agenda tu cita y recibe la atención que necesitas.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

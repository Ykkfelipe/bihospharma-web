import { buildPageMetadata } from '@/lib/seo';
import BlogPostLayout, {
  BlogSection,
  BlogHeading,
  BlogParagraph,
  BlogList,
} from '@/app/components/BlogPostLayout';

export const metadata = buildPageMetadata({
  title: 'Día Mundial del Linfoma',
  description: 'Concientización sobre el linfoma y la detección temprana.',
  path: '/blog/dia-mundial-linfoma',
  image: '/images/linfoma-banner.png',
  type: 'article',
});

export default function BlogPostDiaMundialDelLinfoma() {
  return (
    <BlogPostLayout
      title="Día Mundial del Linfoma"
      heroImage="/images/linfoma-banner.png"
      heroAlt="Día Mundial del Linfoma"
      description="Concientización sobre el linfoma y la detección temprana."
      slug="/blog/dia-mundial-linfoma"
      heightClass="h-[56vh] min-h-[420px]"
    >
      <BlogSection>
        <BlogHeading>¿Qué es el linfoma?</BlogHeading>
        <BlogParagraph>
          Cada 15 de septiembre se conmemora el Día Mundial del Linfoma, una fecha dedicada a concienciar sobre este tipo
          de cáncer que afecta al sistema linfático y que, con un diagnóstico temprano, puede tener mejores opciones de
          tratamiento y recuperación.
        </BlogParagraph>
        <BlogParagraph>
          El linfoma es un tipo de cáncer que se origina en los linfocitos, células que forman parte del sistema
          inmunológico y que se encuentran en los ganglios linfáticos, el bazo y otras partes del cuerpo. Cuando los
          linfocitos sufren alteraciones, empiezan a crecer y multiplicarse de forma anormal, lo que da lugar al
          linfoma. Un signo común es la presencia de ganglios linfáticos duros, agrandados y que no duelen al tocarlos.
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Tipos de linfomas</BlogHeading>
        <BlogParagraph>Existen dos tipos principales:</BlogParagraph>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-1 text-lg font-extrabold text-gray-900">Linfoma de Hodgkin</h3>
            <BlogList
              items={[
                'Afecta  principalmente a los ganglios linfáticos de la parte superior del cuerpo (cuello, tórax, costillas).',
                'Se caracteriza por la presencia de la célula de Reed-Sternberg.',
                'Es más fácil de tratar en comparación con otros tipos.',
                'Se propaga de un ganglio a otro siguiendo un patrón más predecible.',
              ]}
            />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-extrabold text-gray-900">Linfoma no Hodgkin</h3>
            <BlogList
              items={[
                'Es más común en hombres y en adultos jóvenes (20 a 40 años).',
                'Puede aparecer en cualquier parte del cuerpo.',
                'Su crecimiento suele ser rápido, aunque existen variantes menos agresivas.',
                'Es un grupo amplio que incluye muchos subtipos diferentes.',
              ]}
            />
          </div>
        </div>
      </BlogSection>

      <BlogSection>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <BlogHeading>Factores de riesgo</BlogHeading>
            <BlogParagraph>
              Aunque muchas veces no se conoce la causa exacta, algunos factores pueden aumentar el riesgo de
              desarrollar linfoma:
            </BlogParagraph>
            <BlogList
              items={[
                'Haber recibido tratamientos previos de quimioterapia o radioterapia.',
                'Haber tenido mononucleosis.',
                'Estar infectado con virus como HTLV o VIH.',
                'Tener antecedentes familiares de linfoma (aunque es poco frecuente).',
              ]}
            />
          </div>
          <div>
            <BlogHeading>Síntomas más comunes</BlogHeading>
            <BlogParagraph>
              Los signos varían según la localización del linfoma, pero los más frecuentes son:
            </BlogParagraph>
            <BlogList
              items={[
                'Ganglio linfático agrandado (en cuello, pecho, axila, abdomen o ingle).',
                'Tos y dificultad para respirar.',
                'Fiebre persistente.',
                'Sudoración excesiva en las noches.',
                'Pérdida de apetito.',
                'Pérdida de peso repentina.',
                'Cansancio extremo.',
                'Erupciones o pequeños puntos rojos en la piel.',
                'Dolor en los ganglios después de consumir alcohol.',
              ]}
            />
          </div>
        </div>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Tratamiento</BlogHeading>
        <BlogParagraph>
          El tratamiento depende del tipo de linfoma y del estadio en el que se encuentre. Las opciones más comunes
          incluyen:
        </BlogParagraph>
        <BlogList
          items={['Quimioterapia.', 'Radioterapia.', 'Inmunoterapia.', 'Trasplante de médula ósea en algunos casos.']}
        />
        <BlogParagraph>
          La clave es el diagnóstico temprano, que permite diseñar un plan de tratamiento oportuno y aumentar las
          posibilidades de éxito.
        </BlogParagraph>
        <BlogParagraph>
          El linfoma es una enfermedad grave, pero detectarla a tiempo puede salvar vidas. Conocer sus síntomas y
          factores de riesgo es fundamental para consultar al especialista de manera oportuna.
        </BlogParagraph>
      </BlogSection>
    </BlogPostLayout>
  );
}

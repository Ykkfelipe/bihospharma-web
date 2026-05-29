import { buildPageMetadata } from '@/lib/seo';
import BlogPostLayout, {
  BlogSection,
  BlogHeading,
  BlogParagraph,
  BlogList,
  BlogCtaBand,
  BlogSplitRow,
} from '@/app/components/BlogPostLayout';

export const metadata = buildPageMetadata({
  title: 'Día Mundial de los Cuidados Paliativos',
  description: 'Los cuidados paliativos son un derecho.',
  path: '/blog/dia-mundial-cuidados-paliativos',
  image: '/images/cuidados1.png',
  type: 'article',
});

export default function BlogPostCuidadosPaliativos() {
  return (
    <BlogPostLayout
      title="Día Mundial de los Cuidados Paliativos"
      heroImage="/images/cuidados1.png"
      heroAlt="Día Mundial de los Cuidados Paliativos"
      description="Los cuidados paliativos son un derecho."
      slug="/blog/dia-mundial-cuidados-paliativos"
      heroTitle={
        <>
          Día Mundial de los
          <br />
          Cuidados Paliativos:
          <br />
          cumplir la promesa
          <br />
          del acceso universal
        </>
      }
    >
      <BlogSection>
        <BlogParagraph>
          Cada año, en el mes de octubre, se conmemora el <strong>Día Mundial de los Cuidados Paliativos</strong>, una
          fecha para reconocer la importancia de ofrecer <strong>atención integral</strong>, compasiva y digna a las
          personas que enfrentan enfermedades potencialmente mortales.
        </BlogParagraph>
        <BlogParagraph>
          Los <strong>cuidados paliativos</strong> son un enfoque destinado a <strong>mejorar la calidad de vida</strong>{' '}
          de los pacientes y sus familias. Buscan <strong>prevenir y aliviar el sufrimiento</strong> mediante la
          identificación temprana, evaluación y tratamiento del dolor, así como de otros problemas físicos, emocionales,
          sociales y espirituales.
        </BlogParagraph>
        <BlogHeading>¿Por qué son importantes los cuidados paliativos?</BlogHeading>
        <BlogParagraph>
          Se estima que más de 40 millones de personas en el mundo necesitan cuidados paliativos cada año. Esta cifra
          aumenta debido al envejecimiento de la población y al incremento de enfermedades crónicas y no transmisibles como
          el cáncer, la insuficiencia cardíaca o la enfermedad pulmonar avanzada.
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogParagraph>
          Brindar acceso oportuno a los cuidados paliativos no solo reduce el sufrimiento físico y emocional, sino que
          también fortalece el acompañamiento familiar y mejora la calidad de vida en todas las etapas de la enfermedad.
        </BlogParagraph>
        <BlogHeading>Tema 2025: “Cumplir la Promesa: Acceso Universal a los Cuidados Paliativos”</BlogHeading>
        <BlogParagraph>
          El lema de este año, “Cumplir la Promesa: Acceso Universal a los Cuidados Paliativos”, se inspira en la
          resolución aprobada por la Asamblea Mundial de la Salud hace una década, que instó a todos los países a
          fortalecer los cuidados paliativos como parte de la atención integral a lo largo de la vida.
        </BlogParagraph>
        <BlogParagraph>Este llamado busca que todos los sistemas de salud garanticen:</BlogParagraph>
        <BlogList
          items={[
            'Capacitación continua a los profesionales en cuidados paliativos.',
            'Disponibilidad de medicamentos para el manejo del dolor.',
            'Integración de los cuidados paliativos en todos los niveles del sistema de salud.',
            'Sensibilización comunitaria y apoyo familiar.',
          ]}
        />
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/cuidados2.png" imageAlt="Acompañamiento humano">
          <BlogHeading>Más allá de la atención médica: una mirada humana</BlogHeading>
          <BlogParagraph>
            Los <strong>cuidados paliativos</strong> <strong>no</strong> solo tratan los síntomas físicos; también
            acompañan al paciente y su entorno en los aspectos emocionales, sociales y espirituales, fomentando la
            empatía, el respeto y la dignidad.
          </BlogParagraph>
          <BlogParagraph>
            El objetivo es que cada persona reciba atención centrada en sus valores y necesidades, reconociendo la vida
            en todas sus etapas.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/cuidados3.png" imageAlt="Atención integral" imageOnRight={false}>
          <BlogHeading>Bihospharma IPS promueve una atención humana e integral</BlogHeading>
          <BlogParagraph>
            Trabajamos para fortalecer la formación del talento humano en salud, garantizar un acompañamiento integral
            al paciente y su familia, y promover la dignidad y el bienestar en cada etapa de la vida.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogCtaBand>
        Creemos que brindar <strong>cuidados paliativos de calidad</strong> es una forma de honrar la vida y acompañar
        con respeto y compasión.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

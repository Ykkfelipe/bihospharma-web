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
  title: 'Síndrome de Burnout',
  description: 'El agotamiento laboral crónico que afecta la energía y la motivación.',
  path: '/blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador',
  image: '/images/burnout.png',
  type: 'article',
});

export default function BlogPostBurnout() {
  return (
    <BlogPostLayout
      title="Síndrome de Burnout"
      heroImage="/images/burnout.png"
      heroAlt="Síndrome de Burnout"
      description="El agotamiento laboral crónico que afecta la energía y la motivación."
      slug="/blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador"
      heroTitle={
        <>
          Síndrome de Burnout:
          <br />
          cuando el trabajo se vuelve agotador
        </>
      }
      heightClass="h-[clamp(280px,56vh,520px)]"
    >
      <BlogSection>
        <BlogParagraph className="text-center text-lg sm:text-xl">
          El <strong>síndrome de burnout</strong> o <strong>síndrome de agotamiento laboral</strong> es una respuesta al{' '}
          <strong>estrés crónico</strong> en el trabajo, que afecta tanto a nivel individual como organizacional. Se
          caracteriza por <strong>agotamiento emocional</strong>, <strong>actitud fría o despersonalizada</strong> y{' '}
          <strong>baja realización</strong> profesional o personal.
        </BlogParagraph>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/burnout2.png" imageAlt="Persona estresada en oficina">
          <BlogHeading>¿Qué es el agotamiento emocional?</BlogHeading>
          <BlogParagraph>
            El agotamiento emocional se manifiesta como una sensación constante de cansancio físico y mental, la
            percepción de no poder dar más de sí mismo y el sobresfuerzo continuo.
            <br />
            Suele aparecer en personas que trabajan en contacto permanente con otras, especialmente cuando las
            condiciones laborales no son las adecuadas.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection>
        <BlogSplitRow image="/images/burnout3.png" imageAlt="Persona con estrés en oficina" imageOnRight={false}>
          <BlogHeading>Actitud fría o despersonalizada</BlogHeading>
          <BlogParagraph>
            Las personas con burnout pueden desarrollar actitudes distantes, frías o cínicas hacia los demás. Esto se
            refleja en la irritabilidad, pérdida de motivación y en la dificultad para mantener relaciones laborales y
            personales saludables.
          </BlogParagraph>
          <BlogHeading>Baja realización personal o profesional</BlogHeading>
          <BlogParagraph>
            Quienes padecen este síndrome tienden a evaluarse de forma negativa, sintiéndose ineficaces o poco
            competentes. Esto puede generar bajo rendimiento, dificultad para manejar la presión y una autoestima
            debilitada, afectando todas las áreas de su vida.
          </BlogParagraph>
        </BlogSplitRow>
      </BlogSection>

      <BlogSection variant="gray">
        <BlogHeading>Prevención del síndrome de burnout</BlogHeading>
        <BlogList
          items={[
            <>
              Implementar <strong>planes de recuperación o rehabilitación</strong>.
            </>,
            <>
              Recibir <strong>tratamiento psicoterapéutico y asesoramiento</strong> oportuno.
            </>,
            <>
              <strong>Promover la adaptación</strong> entre el trabajador y su entorno laboral.
            </>,
            <>
              <strong>Mejorar el ambiente de trabajo</strong> y las condiciones organizacionales.
            </>,
            <>
              <strong>Fortalecer vínculos sociales</strong> y redes de apoyo.
            </>,
            <>
              Potenciar la <strong>gestión del desempeño</strong> y <strong>reconocimiento del esfuerzo</strong>.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection>
        <BlogHeading>Autocuidado y bienestar personal</BlogHeading>
        <BlogParagraph>
          El autocuidado es clave para prevenir el agotamiento laboral. Algunos hábitos que puedes aplicar son:
        </BlogParagraph>
        <BlogList
          items={[
            <>
              <strong>Establece límites</strong>: define el fin de tu jornada y respétalo.
            </>,
            <>
              <strong>Organiza tu tiempo</strong>: planifica tus tareas y evita la sobrecarga.
            </>,
            <>
              <strong>Desconéctate</strong>: busca espacios para descansar y desconectar del trabajo.
            </>,
            <>
              <strong>Valora tu esfuerzo</strong>: reconoce tus logros y los de tu equipo.
            </>,
          ]}
        />
      </BlogSection>

      <BlogSection variant="gray">
        <BlogSplitRow image="/images/burnout4.png" imageAlt="Alimentación saludable">
          <BlogHeading>Estilo de vida saludable</BlogHeading>
          <BlogList
            items={[
              'Haz ejercicio: mejora el ánimo y reduce el estrés.',
              'Aliméntate bien: una dieta equilibrada mejora tu energía y concentración.',
              'Duerme suficiente: el descanso es esencial para la recuperación mental.',
              'Practica la atención plena: medita o realiza respiraciones profundas.',
              'Cuida tus relaciones: rodéate de personas que te apoyen y te motiven.',
            ]}
          />
        </BlogSplitRow>
      </BlogSection>

      <BlogCtaBand>
        En Bihospharma, <strong>nuestro equipo de salud</strong> te acompaña en el cuidado integral de tu bienestar
        físico y emocional.
      </BlogCtaBand>
    </BlogPostLayout>
  );
}

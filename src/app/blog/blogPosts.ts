export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '/blog/salud-mental-sueno',
    title: 'Salud Mental y el Sueño: una relación vital para tu bienestar',
    excerpt:
      'Dormir bien impacta directamente tu estado de ánimo, concentración y salud emocional. Descubre cómo mejorar tu descanso y proteger tu bienestar mental.',
    image: '/images/sueno2.png',
    imageAlt: 'Salud mental y el sueño',
  },
  {
    slug: '/blog/dia-mundial-salud-mental',
    title: 'Día Mundial de la Salud Mental: cuidar la mente también es cuidar la vida',
    excerpt:
      'Una jornada para recordar la importancia de cuidar la salud mental. Recursos, apoyo y acciones para proteger el bienestar emocional.',
    image: '/images/mental.png',
    imageAlt: 'Día Mundial de la Salud Mental',
  },
  {
    slug: '/blog/dia-mundial-del-lavado-de-manos',
    title: 'Día Mundial del Lavado de Manos',
    excerpt:
      'Consejos prácticos y la importancia del lavado de manos para prevenir enfermedades.',
    image: '/images/hand-heart.png',
    imageAlt: 'Día Mundial del Lavado de Manos',
  },
  {
    slug: '/blog/sindrome-de-burnout-cuando-el-trabajo-se-vuelve-agotador',
    title: 'Síndrome de Burnout: cuando el trabajo se vuelve agotador',
    excerpt:
      'El agotamiento laboral crónico que afecta la energía, la motivación y el desempeño. Conoce causas, síntomas y estrategias para prevenir y manejar el burnout.',
    image: '/images/burnout.png',
    imageAlt: 'Síndrome de Burnout',
  },
  {
    slug: '/blog/migrana-dolores-cabeza',
    title: '¿Migraña o dolores de cabeza?',
    excerpt:
      'Aprende a diferenciar migraña de otros tipos de cefalea, identifica señales de alerta y conoce cuándo consultar a un especialista para un manejo adecuado.',
    image: '/images/migrana1.png',
    imageAlt: '¿Migraña o dolores de cabeza?',
  },
  {
    slug: '/blog/dia-mundial-fibrosis-quistica',
    title: 'Día Mundial de la Fibrosis Quística',
    excerpt:
      'Cada 8 de septiembre se conmemora el Día Mundial de la Fibrosis Quística, una jornada para visibilizar esta enfermedad crónica, apoyar a las familias y promover la prevención y el diagnóstico temprano.',
    image: '/images/fibrosis.png',
    imageAlt: 'Día Mundial de la Fibrosis Quística',
  },
  {
    slug: '/blog/dia-prevencion-suicidio',
    title: 'Día Internacional para la Prevención del Suicidio',
    excerpt:
      'Cada 10 de septiembre se busca crear conciencia y adoptar medidas para reducir los índices de suicidio, apoyando a quienes atraviesan momentos difíciles.',
    image: '/images/prev1.png',
    imageAlt: 'Día Internacional para la Prevención del Suicidio',
  },
  {
    slug: '/blog/dia-mundial-linfoma',
    title: 'Día Mundial del Linfoma',
    excerpt:
      'Una fecha dedicada a generar conciencia sobre el linfoma, su detección temprana y la importancia del tratamiento oportuno para mejorar la calidad de vida de los pacientes.',
    image: '/images/linfoma-banner.png',
    imageAlt: 'Día Mundial del Linfoma',
  },
  {
    slug: '/blog/dia-mundial-corazon',
    title: 'Día Mundial del Corazón',
    excerpt:
      'Desde el año 2000, la Federación Mundial del Corazón, con el apoyo de la OMS, conmemora cada 29 de septiembre el Día Mundial del Corazón. Esta fecha busca crear conciencia sobre las enfermedades cardiovasculares, su prevención, control y tratamiento.',
    image: '/images/corazon1.png',
    imageAlt: 'Día Mundial del Corazón',
  },
  {
    slug: '/blog/dia-mundial-paralisis-cerebral',
    title: 'Día Mundial de la Parálisis Cerebral',
    excerpt:
      'Inclusión, esperanza y resiliencia: visibilizamos la parálisis cerebral, sus apoyos, terapias y el compromiso con la inclusión.',
    image: '/images/paralisis1.png',
    imageAlt: 'Día Mundial de la Parálisis Cerebral',
  },
  {
    slug: '/blog/dia-mundial-cuidados-paliativos',
    title: 'Día Mundial de los Cuidados Paliativos: cumplir la promesa del acceso universal',
    excerpt:
      'Los cuidados paliativos son un derecho. Conoce por qué es crucial garantizar su acceso universal y cómo podemos contribuir desde la comunidad y las políticas públicas.',
    image: '/images/cuidados1.png',
    imageAlt: 'Día Mundial de los Cuidados Paliativos',
  },
];

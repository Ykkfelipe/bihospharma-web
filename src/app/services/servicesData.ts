export type ServiceCard = {
  title: string;
  lines?: string[];
  image: string;
  slug: string;
};

export const SERVICE_CARDS: ServiceCard[] = [
  { title: 'MEDICINA GENERAL', image: 'medicina-general.png', slug: '/services/medicina-general' },
  {
    title: 'MEDICINA LABORAL',
    lines: ['EXÁMENES OCUPACIONALES'],
    image: 'medicina-laboral.png',
    slug: '/services/medicina-laboral',
  },
  { title: 'MEDICINA INTERNA', image: 'medicina-interna.png', slug: '/services/medicina-interna' },
  { title: 'ENFERMERÍA', image: 'enfermeria.png', slug: '/services/enfermeria' },
  { title: 'NUTRICIÓN', image: 'nutricion.png', slug: '/services/nutricion' },
  { title: 'REUMATOLOGÍA', image: 'reumatologia.png', slug: '/services/reumatologia' },
  { title: 'PSICOLOGÍA', image: 'psicologia.png', slug: '/services/psicologia' },
  { title: 'TRABAJO SOCIAL', image: 'trabajo-social.png', slug: '/services/trabajo-social' },
  { title: 'FISIOTERAPIA', image: 'fisioterapia.png', slug: '/services/fisioterapia' },
];

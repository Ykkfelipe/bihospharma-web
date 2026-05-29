/**
 * Knowledge injected into the chatbot system prompt.
 * The bot does NOT browse the site — it only uses this text + the static prompt rules.
 * Update here when service pages change.
 */

export type ChatServiceKnowledge = {
  name: string;
  path: string;
  summary: string;
  details?: string;
};

export const CHAT_SERVICES: ChatServiceKnowledge[] = [
  {
    name: 'Medicina general',
    path: '/services/medicina-general',
    summary: 'Consulta médica integral, prevención, control de enfermedades crónicas y orientación en salud.',
  },
  {
    name: 'Medicina laboral (SST)',
    path: '/services/medicina-laboral',
    summary: 'Exámenes ocupacionales, evaluaciones de ingreso/periódico/retiro y programas de salud en el trabajo.',
  },
  {
    name: 'Medicina interna',
    path: '/services/medicina-interna',
    summary: 'Atención especializada en enfermedades del adulto y manejo de patologías complejas.',
  },
  {
    name: 'Enfermería',
    path: '/services/enfermeria',
    summary: 'Cuidado profesional, procedimientos, educación al paciente y apoyo en el proceso de atención.',
  },
  {
    name: 'Nutrición',
    path: '/services/nutricion',
    summary: 'Asesoría nutricional personalizada, planes alimentarios y educación para hábitos saludables.',
  },
  {
    name: 'Reumatología',
    path: '/services/reumatologia',
    summary:
      'Diagnóstico y tratamiento de enfermedades del sistema musculoesquelético y tejido conectivo (articulaciones, músculos, huesos).',
    details:
      'Tratamos, entre otras: artritis reumatoide, artrosis, lupus, espondiloartritis, gota, osteoporosis, síndrome de Sjögren y fibromialgia. Más info en /services/reumatologia.',
  },
  {
    name: 'Psicología',
    path: '/services/psicologia',
    summary: 'Apoyo psicológico para el bienestar emocional y afrontamiento de situaciones de salud mental.',
  },
  {
    name: 'Trabajo social',
    path: '/services/trabajo-social',
    summary: 'Acompañamiento social en salud, orientación a pacientes y familias en el proceso asistencial.',
  },
  {
    name: 'Fisioterapia',
    path: '/services/fisioterapia',
    summary: 'Rehabilitación, recuperación funcional y tratamiento de dolor o lesiones musculoesqueléticas.',
  },
];

export function buildChatServicesBlock(): string {
  return CHAT_SERVICES.map(
    (s) =>
      `- ${s.name} (${s.path}): ${s.summary}${s.details ? ` ${s.details}` : ''}`
  ).join('\n');
}

export const CHAT_KNOWLEDGE_NOTE = `CÓMO OBTIENES LA INFORMACIÓN:
- No navegas internet ni lees el sitio en tiempo real.
- Respondes solo con los datos de este mensaje y la página/ruta que indiques al usuario.
- Si preguntan por un servicio, resume con lo de SERVICIOS DETALLADOS y sugiere la ruta /services/[especialidad] para leer más.
- Si no tienes un dato (precios, convenios, disponibilidad exacta), no inventes: ofrece WhatsApp o llamada al número de contacto.`;

/**
 * FAQ chatbot knowledge — service summaries are auto-generated at build from page sources.
 * Edit service pages; run `npm run chat:knowledge` or `npm run build` to refresh.
 */

import { GENERATED_CHAT_SERVICES } from './chatKnowledge.generated';

export type ChatServiceKnowledge = {
  name: string;
  path: string;
  summary: string;
  details?: string;
};

/** Static site facts the generator does not cover */
export const CHAT_SITE_PAGES = [
  { label: 'Inicio', path: '/', note: 'mapa con acceso a WhatsApp' },
  { label: 'Servicios', path: '/services', note: 'listado de especialidades' },
  { label: 'Contacto', path: '/contact', note: 'mensaje general al equipo (no citas)' },
  { label: 'PQRSF', path: '/pqrs', note: 'petición, queja, reclamo, sugerencia o felicitación' },
  { label: 'Blog', path: '/blog', note: 'artículos de salud' },
] as const;

export const CHAT_MEDICAL_RULES = `CONOCIMIENTO MÉDICO (cómo usar tu entrenamiento):
- Sí puedes usar conocimiento general para explicar en lenguaje sencillo qué es una especialidad o un término (ej. qué hace un reumatólogo, qué es medicina laboral).
- Ese conocimiento es solo educativo: NO sustituye la información específica del sitio para citas, horarios, sedes o servicios de Bihospharma.
- NO des diagnósticos, NO indiques medicamentos, dosis ni tratamientos para el caso del usuario.
- Si preguntan por síntomas o "qué tengo", orienta a consultar con nuestros profesionales por WhatsApp o llamada al número de contacto, o urgencias si es grave.`;

export const CHAT_KNOWLEDGE_NOTE = `CÓMO OBTIENES LA INFORMACIÓN DEL SITIO:
- No navegas internet ni lees páginas en tiempo real; usas el bloque SERVICIOS DETALLADOS (generado desde las páginas del sitio al publicar).
- Si preguntan por un servicio, prioriza ese bloque y sugiere la ruta /services/... para leer más en el sitio.
- Si no tienes un dato (precios, convenios EPS, cupos), no inventes: escríbenos o llámanos al número de contacto.`;

export function getChatServices(): ChatServiceKnowledge[] {
  return GENERATED_CHAT_SERVICES;
}

export function buildChatServicesBlock(): string {
  return getChatServices()
    .map(
      (s) =>
        `- ${s.name} (${s.path}): ${s.summary}${s.details ? ` ${s.details}` : ''}`
    )
    .join('\n');
}

import { CONTACT } from '@/lib/contactInfo';
import { getChatServices } from '@/lib/chatKnowledge';

const MOBILE = CONTACT.phoneMobile;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[¿?¡!.,;:()"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function locationsReply(): string {
  const lines = CONTACT.locations.map((loc) => {
    const address = loc.lines.join(', ');
    return `• ${loc.name}: ${address}`;
  });
  return `Estamos en dos sedes:\n${lines.join('\n')}\n\nHorario: lun–vie 7am–12pm y 2pm–5pm; sáb 7am–1pm. Para citas, escríbenos o llámanos al ${MOBILE}.`;
}

function hoursReply(): string {
  return `Atendemos de lunes a viernes de 7:00 a.m. a 12:00 m. y de 2:00 p.m. a 5:00 p.m., y los sábados de 7:00 a.m. a 1:00 p.m. Para agendar, escríbenos o llámanos al ${MOBILE}.`;
}

function appointmentReply(): string {
  return `Para agendar tu cita, escríbenos por WhatsApp o llámanos al ${MOBILE} y te ayudamos a coordinarla. También puedes usar el botón flotante de WhatsApp en el sitio.`;
}

function servicesReply(): string {
  const names = getChatServices().map((s) => s.name);
  return `Ofrecemos ${names.join(', ')}. En el menú entra a Servicios (/services) para ver cada área. ¿Sobre cuál te cuento más?`;
}

/**
 * Instant, reliable answers for the most common site FAQ questions.
 * Avoids depending on Azure for sedes/horarios/citas/servicios.
 */
export function matchFaqReply(message: string): string | null {
  const q = normalize(message);
  if (!q) return null;

  const asksLocation =
    /\b(ubicad|ubicacion|direccion|sede|sedes|donde quedan|donde estan|como llegar|yopal|bogota)\b/.test(
      q
    ) || q === 'donde estan ubicados' || q.includes('donde estan ubicados');

  const asksHours =
    /\b(horario|horarios|a que hora|que hora|cuando abren|cuando cierran|dias de atencion)\b/.test(q);

  const asksAppointment =
    /\b(cita|citas|agendar|agenda|turno|whatsapp|telefono|llamar|contact)\b/.test(q) &&
    !asksLocation;

  const asksServices =
    /\b(servicios|especialidades|que ofrecen|que hacen)\b/.test(q) ||
    q === 'que servicios ofrecen' ||
    q.includes('que servicios ofrecen');

  // Prefer the most specific match when several keywords appear.
  if (asksLocation) return locationsReply();
  if (asksHours) return hoursReply();
  if (asksAppointment) return appointmentReply();
  if (asksServices) return servicesReply();

  return null;
}

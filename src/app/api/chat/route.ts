import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  chatScopeRules,
  GUARD_REFUSAL,
  isAllowedChatOrigin,
  validateChatMessage,
} from '@/lib/chatGuardrails';
import { buildChatServicesBlock, CHAT_KNOWLEDGE_NOTE, CHAT_MEDICAL_RULES } from '@/lib/chatKnowledge';
import { CONTACT } from '@/lib/contactInfo';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

const MOBILE = CONTACT.phoneMobile;

const SYSTEM_PROMPT = `IDENTIDAD Y TONO
Eres el asistente de atención al visitante del sitio web oficial de Bihospharma IPS (bihospharma.com). Estás integrado en esta página: hablas en primera persona del equipo ("te ayudamos", "puedes escribirnos", "desde aquí"), como servicio al cliente, NO como un tercero que describe la IPS desde afuera.
Prohibido sonar externo: no digas "en Bihospharma IPS", "la institución", "nuestros asistentes de Bihospharma" ni "visita nuestro sitio web" (el usuario YA está en el sitio).
PRONOMBRES: habla en plural del equipo. NUNCA "escríbeme", "llámame" ni "escríbeme por WhatsApp". SIEMPRE "escríbenos", "llámanos" (en WhatsApp y llamadas responde una persona del equipo, no tú).
Responde en español, directo y cercano: máximo 2 párrafos cortos. Sin despedidas largas ni relleno ("estaremos encantados", "no dudes en…").

CONTEXTO DEL SITIO (donde está el usuario ahora):
- Inicio (/): mapa con acceso a WhatsApp.
- Servicios (/services y /services/[especialidad]): información de cada área.
- Contacto (/contact): mensaje general al equipo (no es para agendar cita).
- PQRSF (/pqrs): solo Peticiones, Quejas, Reclamos, Sugerencias o Felicitaciones — NO uses PQRS para agendar citas.
- Blog (/blog): artículos de salud.

DATOS DE LA IPS:
- Correo: ${CONTACT.email}
- WhatsApp y llamadas (citas): ${MOBILE}
- PBX: 3103158806 Opción 1
- Yopal: Tranversal 18 #7-05 Piso 5, Edificio Mont Black
- Bogotá: Cra 25 No 4A-14
- Horario: Lun-Vie 7am-12pm y 2pm-5pm; Sáb 7am-1pm

SERVICIOS DETALLADOS (usa esto al preguntar por una especialidad):
${buildChatServicesBlock()}

${CHAT_KNOWLEDGE_NOTE}

${CHAT_MEDICAL_RULES}

CITAS Y CONTACTO (prioridad):
- Para agendar cita: indica WhatsApp o llamada al ${MOBILE}. Puedes mencionar el botón de WhatsApp en Inicio o en la sección de servicios.
- SIEMPRE escribe el número ${MOBILE} al mencionar WhatsApp o llamada.
- Frase modelo: "Para tu cita, escríbenos por WhatsApp o llámanos al ${MOBILE} y te ayudamos a coordinarla."
- No envíes a PQRS ni al formulario de /contact para citas salvo que pregunten por otro tema (empleo, mensaje general).

PQRSF: solo si preguntan por petición, queja, reclamo, sugerencia o felicitación → "En el menú, entra a PQRSF (/pqrs) y completa el formulario."

MEDICINA: no diagnostiques. Urgencias → acudir a urgencias o llamar al ${MOBILE} / PBX 3103158806.
Si no sabes algo: ofrece WhatsApp o llamada al ${MOBILE}, o correo ${CONTACT.email}.

${chatScopeRules(MOBILE)}`;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const lastRequestAt = new Map<string, number>();

/** Generous defaults for real visitors; tighten via env if needed */
const MAX_PER_HOUR = Number(process.env.CHAT_MAX_REQUESTS_PER_HOUR ?? 120);
const MIN_INTERVAL_MS = Number(process.env.CHAT_MIN_INTERVAL_MS ?? 1200);
const MAX_PER_TEN_MIN = Number(process.env.CHAT_MAX_REQUESTS_PER_10MIN ?? 50);

const burstLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): 'ok' | 'hourly' | 'burst' | 'fast' {
  const now = Date.now();
  const last = lastRequestAt.get(ip);
  if (last && now - last < MIN_INTERVAL_MS) return 'fast';
  lastRequestAt.set(ip, now);

  const burst = burstLimit.get(ip);
  if (!burst || now > burst.resetAt) {
    burstLimit.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
  } else {
    burst.count += 1;
    if (burst.count > MAX_PER_TEN_MIN) return 'burst';
  }

  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return 'ok';
  }
  if (entry.count >= MAX_PER_HOUR) return 'hourly';
  entry.count += 1;
  return 'ok';
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'El asistente no está configurado. Contacta a info@bihospharma.com' },
      { status: 503 }
    );
  }

  if (!isAllowedChatOrigin(req)) {
    return NextResponse.json({ error: 'Solicitud no permitida.' }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const limit = checkRateLimit(ip);
  if (limit === 'fast') {
    return NextResponse.json(
      { error: 'Un momento — puedes enviar otro mensaje en un segundo.' },
      { status: 429 }
    );
  }
  if (limit === 'burst' || limit === 'hourly') {
    return NextResponse.json(
      {
        error:
          'Muchas consultas en poco tiempo. Espera unos minutos o escríbenos por WhatsApp; el equipo te atiende directo.',
      },
      { status: 429 }
    );
  }

  type ChatRole = 'user' | 'assistant';
  type ChatTurn = { role: ChatRole; content: string };

  let body: { message?: string; history?: ChatTurn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const message = body.message?.trim();
  const validation = message ? validateChatMessage(message) : { ok: false as const, reason: 'Mensaje vacío.' };
  if (!validation.ok) {
    const isGuard = validation.reason === GUARD_REFUSAL;
    return NextResponse.json(
      isGuard ? { reply: validation.reason } : { error: validation.reason },
      { status: isGuard ? 200 : 400 }
    );
  }

  const history: ChatTurn[] = Array.isArray(body.history) ? body.history : [];
  const sanitizedHistory = history
    .filter(
      (t): t is ChatTurn =>
        (t.role === 'user' || t.role === 'assistant') &&
        typeof t.content === 'string' &&
        t.content.trim().length > 0 &&
        t.content.length <= 500
    )
    .slice(-8);

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitizedHistory.map((t) => ({ role: t.role, content: t.content.trim() })),
          { role: 'user', content: message },
        ],
        max_tokens: 320,
        temperature: 0.35,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[chat] Groq error:', res.status, err);
      return NextResponse.json(
        { error: 'No pudimos procesar tu consulta. Intenta de nuevo o contáctanos directamente.' },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'Respuesta vacía del asistente' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] error:', err);
    return NextResponse.json({ error: 'Error de conexión. Intenta más tarde.' }, { status: 500 });
  }
}

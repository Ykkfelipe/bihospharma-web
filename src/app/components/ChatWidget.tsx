'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/contactInfo';

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME: Message = {
  role: 'assistant',
  content:
    '¡Hola! Soy el asistente de atención de Bihospharma. Estoy aquí en el sitio para ayudarte con servicios, horarios, sedes y cómo contactarnos. ¿En qué te ayudo?',
};

const QUICK_QUESTIONS = [
  '¿Cuál es el horario de atención?',
  '¿Dónde están ubicados?',
  '¿Qué servicios ofrecen?',
  '¿Cómo solicito una cita?',
];

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSentAt = useRef(0);
  const MIN_SEND_GAP_MS = 1200;

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const now = Date.now();
    if (now - lastSentAt.current < MIN_SEND_GAP_MS) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Un momento — puedes enviar otro mensaje en un segundo.',
        },
      ]);
      return;
    }
    lastSentAt.current = now;

    setInput('');
    const nextMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setLoading(true);

    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Error');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            err instanceof Error
              ? err.message
              : `No pudimos responder. Escríbenos por WhatsApp o llámanos al ${CONTACT.phoneMobile}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showQuickQuestions =
    messages.length === 1 && messages[0].role === 'assistant' && !loading;

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-4 z-[9998] flex w-[min(100vw-2rem,400px)] flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl sm:right-6"
          role="dialog"
          aria-label="Asistente virtual Bihospharma"
        >
          <div className="flex items-center gap-3 bg-[#1C2B4E] px-4 py-3 text-white">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#48a4dc]/30 text-sm font-bold"
              aria-hidden="true"
            >
              B
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Asistente Bihospharma</p>
              <p className="text-xs text-blue-200/90">Información general · No es consejo médico</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
              aria-label="Cerrar chat"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="flex max-h-80 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'ml-auto bg-[#48a4dc] text-white'
                    : 'mr-auto bg-[#e8f4fc] text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto flex items-center gap-1.5 rounded-2xl bg-[#e8f4fc] px-3.5 py-2.5" aria-live="polite">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#48a4dc] [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#48a4dc] [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#48a4dc] [animation-delay:300ms]" />
              </div>
            )}
            {showQuickQuestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#48a4dc]/40 bg-white px-3 py-1.5 text-left text-xs text-[#1C2B4E] transition hover:border-[#48a4dc] hover:bg-[#e8f4fc]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-gray-100 bg-gray-50/50 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              maxLength={500}
              disabled={loading}
              className="min-h-[44px] flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm focus:border-[#48a4dc] focus:outline-none focus:ring-2 focus:ring-[#48a4dc]/30 disabled:opacity-60"
              aria-label="Mensaje"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="min-h-[44px] shrink-0 rounded-xl bg-[#48a4dc] px-4 text-sm font-semibold text-white transition hover:bg-[#3a8fc4] disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#48a4dc] text-white shadow-lg ring-4 ring-white/80 transition hover:bg-[#3a8fc4] hover:shadow-xl sm:bottom-6 sm:right-6"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente virtual'}
        aria-expanded={open}
      >
        {open ? (
          <CloseIcon />
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
          </svg>
        )}
      </button>
    </>
  );
}

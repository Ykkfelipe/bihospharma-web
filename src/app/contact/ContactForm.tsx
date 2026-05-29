'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import SocialLinks from '@/app/components/SocialLinks';
import { CONTACT } from '@/lib/contactInfo';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMsg('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? 'No fue posible enviar el mensaje.');
      }

      setStatus('success');
      setFeedbackMsg('¡Mensaje enviado! Nos comunicaremos contigo pronto.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setFeedbackMsg(
        err instanceof Error ? err.message : 'No fue posible enviar el mensaje. Inténtalo nuevamente.'
      );
    }
  };

  const inputClass =
    'w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#48a4dc] md:text-lg';

  return (
    <div className="section-container py-10 sm:py-14">
      <p className="mb-10 text-center text-lg text-gray-700 md:text-xl">
        Si tienes preguntas o deseas solicitar más información, llena el siguiente formulario y nuestro equipo se
        comunicará contigo lo antes posible.
      </p>

      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-3 md:gap-12">
        <form onSubmit={handleSubmit} className="space-y-5 md:col-span-2">
          <div>
            <label className="mb-1 block font-semibold">Tu nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block font-semibold">Tu correo electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block font-semibold">Tu número de contacto</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block font-semibold">Asunto</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block font-semibold">Tu mensaje</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="min-h-[48px] rounded-lg bg-[#1C2B4E] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#2A3D6C] disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {status === 'success' && (
            <p role="status" aria-live="polite" className="text-sm font-medium text-green-700">
              {feedbackMsg}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {feedbackMsg}
            </p>
          )}

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-xl font-bold">SEDE BOGOTÁ</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6851195679894!2d-74.1014383!3d4.627054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a1990f1c147%3A0x1d8b2c918b11bbce!2sCra.%2025%20%234a-14%2C%20Los%20M%C3%A1rtires%2C%20Bogot%C3%A1%2C%20Cundinamarca%2C%20Colombia!5e0!3m2!1sen!2sca!4v1721040000000!5m2!1sen!2sca"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa sede Bogotá"
                className="rounded-xl border border-gray-200 shadow-md"
              />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-bold">SEDE YOPAL</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.212939363351!2d-72.4109714!3d5.3373924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a2c3a6a8eab3f%3A0xddaee8f8ef1b72fa!2sTv.%2018%20%237-5%2C%20Yopal%2C%20Casanare%2C%20Colombia!5e0!3m2!1sen!2sca!4v1721040000001!5m2!1sen!2sca"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa sede Yopal"
                className="rounded-xl border border-gray-200 shadow-md"
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-[#1C2B4E] p-6 text-white shadow-lg sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-[#B6E0FF]">Contacto</h2>
            <p className="font-medium">{CONTACT.email}</p>
            <p className="mb-4 font-medium">{CONTACT.website}</p>
            <SocialLinks variant="dark" iconSize={18} />
            <p className="mt-4 font-bold text-[#B6E0FF]">TELÉFONO</p>
            <p className="font-medium">{CONTACT.phone}</p>
            {CONTACT.locations.map((loc) => (
              <div key={loc.name} className="mt-4">
                <p className="font-bold text-[#B6E0FF]">{loc.name}</p>
                {loc.lines.map((line) => (
                  <p key={line} className="font-medium">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#B6E0FF] p-6 text-[#1C2B4E] shadow-md sm:p-8">
            <h2 className="mb-4 text-xl font-bold">HORARIO DE ATENCIÓN</h2>
            <div className="space-y-3 text-base font-medium">
              <div>
                <span className="font-bold">LUNES A VIERNES</span>
                <p className="pl-2">Mañana: 7:00 am a 12:00 pm</p>
                <p className="pl-2">Tarde: 2:00 pm – 5:00 pm</p>
              </div>
              <div>
                <span className="font-bold">SÁBADOS</span>
                <p className="pl-2">Mañana: 7:00 am a 1:00 pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

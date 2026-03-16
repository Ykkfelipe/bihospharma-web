"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear feedback when user starts editing again
    if (status !== "idle") {
      setStatus("idle");
      setFeedbackMsg("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedbackMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "No fue posible enviar el mensaje.");
      }

      setStatus("success");
      setFeedbackMsg("¡Mensaje enviado! Nos comunicaremos contigo pronto.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setFeedbackMsg(
        err instanceof Error ? err.message : "No fue posible enviar el mensaje. Inténtalo nuevamente."
      );
    }
  };

  return (
    <main className="py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-4 text-center">
        FORMULARIO DE CONTACTO
      </h1>
      <p className="text-lg md:text-xl text-[#1C2B4E] mb-12 text-center">
        Si tienes preguntas o deseas solicitar más información, llena el siguiente formulario y nuestro equipo se comunicará contigo lo antes posible.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
          <div>
            <label className="block mb-1 font-semibold text-base md:text-lg">Tu nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17] text-base md:text-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base md:text-lg">Tu correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17] text-base md:text-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base md:text-lg">Tu número de contacto</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17] text-base md:text-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base md:text-lg">Asunto</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17] text-base md:text-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base md:text-lg">Tu mensaje</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17] text-base md:text-lg"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-[#1C2B4E] hover:bg-[#2A3D6C] text-white font-semibold px-6 py-3 rounded-lg transition text-base md:text-lg shadow-md disabled:opacity-70 disabled:cursor-wait"
          >
            {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status === "success" && (
            <p role="status" aria-live="polite" className="text-green-700 font-medium text-sm mt-1">
              {feedbackMsg}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-red-700 font-medium text-sm mt-1">
              {feedbackMsg}
            </p>
          )}

          {/* Google Maps Section */}
          <div className="mt-16 bg-white py-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">SEDE BOGOTÁ</h2>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6851195679894!2d-74.1014383!3d4.627054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a1990f1c147%3A0x1d8b2c918b11bbce!2sCra.%2025%20%234a-14%2C%20Los%20M%C3%A1rtires%2C%20Bogot%C3%A1%2C%20Cundinamarca%2C%20Colombia!5e0!3m2!1sen!2sca!4v1721040000000!5m2!1sen!2sca"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl shadow-md border border-gray-200"
                  ></iframe>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">SEDE YOPAL</h2>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.212939363351!2d-72.4109714!3d5.3373924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a2c3a6a8eab3f%3A0xddaee8f8ef1b72fa!2sTv.%2018%20%237-5%2C%20Yopal%2C%20Casanare%2C%20Colombia!5e0!3m2!1sen!2sca!4v1721040000001!5m2!1sen!2sca"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl shadow-md border border-gray-200"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Contact Info and Schedule */}
        <div className="flex flex-col gap-8">
          {/* Contact Blue Box */}
          <div className="bg-[#1C2B4E] rounded-2xl p-8 text-white shadow-lg mb-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#B6E0FF]">Contacto</h2>
            <div className="space-y-2 text-base md:text-lg font-medium">
              <div>
                <span className="block">info@bihospharma.com</span>
                <span className="block">www.bihospharma.com</span>
                <div className="flex gap-4 mt-4">
                  <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="rounded-full bg-white hover:bg-[#00ACFF] transition p-2 flex items-center justify-center">
                    <svg width="20" height="20" fill="currentColor" className="text-[#1C2B4E]" viewBox="0 0 24 24"><path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="rounded-full bg-white hover:bg-[#00ACFF] transition p-2 flex items-center justify-center">
                    <svg width="20" height="20" fill="currentColor" className="text-[#1C2B4E]" viewBox="0 0 24 24"><path d="M6.94 6.94A1.06 1.06 0 1 1 8 8a1.06 1.06 0 0 1-1.06-1.06ZM7 10h2v8H7v-8Zm3.5 0h2v1.17h.03c.3-.57 1.04-1.17 2.15-1.17 2.3 0 2.72 1.51 2.72 3.48V18h-2v-3.18c0-.76-.01-1.75-1.07-1.75s-1.23.84-1.23 1.7V18h-2v-8Z" /></svg>
                  </a>
                  <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="rounded-full bg-white hover:bg-[#00ACFF] transition p-2 flex items-center justify-center">
                    <svg width="20" height="20" fill="currentColor" className="text-[#1C2B4E]" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <span className="font-bold text-[#B6E0FF]">TELÉFONO</span>
                <span className="block">PBX 3103158806 Opc1 - 3232347791</span>
              </div>
              <div className="mt-4">
                <span className="font-bold text-[#B6E0FF]">YOPAL (CASANARE)</span>
                <span className="block">Transversal 18 #7-05 Piso 5</span>
                <span className="block">Edificio Mont Black</span>
              </div>
              <div className="mt-4">
                <span className="font-bold text-[#B6E0FF]">BOGOTÁ D.C</span>
                <span className="block">Cra 25 No 4A-14</span>
              </div>
            </div>
          </div>
          {/* Schedule Box */}
          <div className="bg-[#B6E0FF] rounded-2xl p-8 text-[#1C2B4E] shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-4">HORARIO DE ATENCIÓN</h2>
            <div className="space-y-2 text-base md:text-lg font-medium">
              <div>
                <span className="font-bold">LUNES A VIERNES</span>
                <div className="pl-2">
                  <span className="block">Mañana: 7:00 am a 12:00 am</span>
                  <span className="block">Tarde: 2:00pm – 5:00pm</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-bold">SÁBADOS</span>
                <div className="pl-2">
                  <span className="block">Mañana: 7:00 am a 1 pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
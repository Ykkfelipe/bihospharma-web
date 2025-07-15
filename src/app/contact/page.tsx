"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Add types for event parameters
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Mensaje enviado. Gracias por contactarnos.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-12 text-center">
        Contáctanos para más información
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Tu nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tu correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Asunto</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17]"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Tu mensaje</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AC17]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#00AC17] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Enviar mensaje
          </button>
        </form>

        {/* Headquarters Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C2B4E] mb-2">Sede Bogotá</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.965473203076!2d-74.089941!3d4.603044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99fb9d1fba07%3A0x50f5c76f3b6d2f9b!2sCra.%2025%20%234B-14%2C%20Los%20M%C3%A1rtires%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sco!4v1620234567890!5m2!1sen!2sco"
              width="100%"
              height="250"
              className="rounded"
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1C2B4E] mb-2">Sede Yopal</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.965473203076!2d-72.402752!3d5.337750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6c6a4f4e5e5d7f%3A0x50f5c76f3b6d2f9b!2sTv.%2018%20%237-5%2C%20Yopal%2C%20Casanare%2C%20Colombia!5e0!3m2!1sen!2sco!4v1620234567890!5m2!1sen!2sco"
              width="100%"
              height="250"
              className="rounded"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center text-[#1C2B4E]">
        <div>
          <h3 className="font-bold mb-2">Email</h3>
          <p>info@bihospharma.com</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Teléfono</h3>
          <p>PBX 3103158806</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Dirección Bogotá</h3>
          <p>Carrera 25 No 4B-14 Bogotá - Colombia</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center space-x-6 text-[#1C2B4E]">
        <a
          href="https://wa.me/573103158806"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#00AC17] transition"
        >
          WhatsApp
        </a>
        <a
          href="https://www.facebook.com/bihospharma"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#4C80A4] transition"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/bihospharma"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition"
        >
          Instagram
        </a>
      </div>
    </main>
  );
}
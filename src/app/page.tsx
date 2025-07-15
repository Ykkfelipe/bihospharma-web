export default function Home() {
  return (
    <main>
      <section className="relative w-full min-h-[200px] sm:min-h-[600px] md:min-h-[400px] lg:min-h-[500px]">
        <img
          src="/images/hero-inicio2.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/images/services.png"
              alt="Consulta médica"
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-black mb-4">Servicios</h2>
            <p className="text-lg text-gray-800 mb-6">
              Ofrecemos atención de la mejor calidad para todos nuestros usuarios que acceden a los servicios, 
              seguimiento de controles, apoyados con un excelente equipo de especialistas, profesionales, 
              técnicos y tecnólogos prestamos los servicios asistenciales con experiencia en el manejo de pacientes crónicos.
            </p>
            <a
              href="/services"
              className="inline-block bg-[#2BA7E2] text-white font-bold py-3 px-6 rounded-md hover:bg-[#1c85bb] transition"
            >
              VER TODOS
            </a>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Banner */}
      <section className="bg-[#4C80A4] text-white py-12 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Necesitas agendar una cita?
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
          Contáctanos y recibe la mejor atención con calidez humana.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#00AC17] hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-md transition"
        >
          Contáctanos
        </a>
      </section>

      {/* Testimonials / Partners Logos Placeholder */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-12">
            Nuestros Aliados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Replace these divs with <img> tags when you have logos */}
            <div className="bg-white rounded shadow p-6">Logo 1</div>
            <div className="bg-white rounded shadow p-6">Logo 2</div>
            <div className="bg-white rounded shadow p-6">Logo 3</div>
            <div className="bg-white rounded shadow p-6">Logo 4</div>
          </div>
        </div>
      </section>
    </main>
  )
}
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
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1C2B4E] mb-12">
          Nuestros Servicios
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Service Card */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-semibold mb-2">Medicina General</h3>
            <p className="text-gray-600">
              Atención médica integral para el cuidado de tu salud y bienestar.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold mb-2">Medicina Laboral</h3>
            <p className="text-gray-600">
              Evaluaciones y servicios de salud ocupacional para empresas.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">💉</div>
            <h3 className="text-xl font-semibold mb-2">Enfermería</h3>
            <p className="text-gray-600">
              Procedimientos de enfermería con profesionalismo y calidad humana.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Teleasistencia</h3>
            <p className="text-gray-600">
              Asesoría y atención médica a distancia para mayor comodidad.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold mb-2">Hemofilia</h3>
            <p className="text-gray-600">
              Programas especializados para el manejo integral de hemofilia.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-[#00AC17] text-4xl mb-4">🫀</div>
            <h3 className="text-xl font-semibold mb-2">Nefroprotección</h3>
            <p className="text-gray-600">
              Servicios enfocados en el cuidado y protección de la salud renal.
            </p>
          </div>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">
            Nuestra Misión
          </h2>
          <p className="text-gray-700 mb-12">
            Brindar servicios de salud con calidad, calidez humana y tecnología avanzada, 
            enfocados en el bienestar integral de nuestros pacientes y sus familias.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">
            Nuestra Visión
          </h2>
          <p className="text-gray-700">
            Ser líderes en atención en salud reconocidos por nuestra excelencia, innovación y compromiso social.
          </p>
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
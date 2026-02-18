import Image from 'next/image';

export default function AboutPage() {
  return (
    <main>
      {/* Hero Image */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="/images/nosotros.png"
          alt="Nosotros"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg shadow-white">NOSOTROS</h1>
        </div>
      </section>
      {/* Quienes Somos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/images/thumbs-up.png"
              alt="Equipo médico"
              width={600}
              height={400}
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">QUIENES SOMOS</h2>
            <p className="text-gray-700 text-lg">
              Somos una compañía Colombiana orientada al manejo clínico ambulatorio de servicios de baja, mediana y alta complejidad;
              especializada en enfermedades de Alto Costo y en el suministro de productos farmacéuticos y hospitalarios.
            </p>
            <button className="mt-8 bg-[#3CA5DA] hover:bg-[#2d8dc2] text-white font-semibold py-2 px-6 rounded-full transition duration-300">
              VER TODOS
            </button>
          </div>
        </div>
      </section>

      {/* A qué contribuimos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-0 overflow-hidden rounded-2xl shadow-md">
          {/* Left side: Text and image */}
          <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-4">¿A qué contribuimos?</h2>
            <p className="text-gray-700 text-lg mb-6">
              Formación de Redes Integrales con modelos de gestión del riesgo como eje transversal en la prestación de servicios de salud.
              Somos una organización funcional que:
            </p>
            <Image
              src="/images/hospitality.png"
              alt="Gestión en salud"
              width={600}
              height={400}
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>

          {/* Right side: Blue box with bullet points */}
          <div className="w-full md:w-1/2 bg-[#3CA5DA] text-white p-10 flex flex-col justify-center">
            <ul className="list-disc pl-5 space-y-4 text-lg">
              <li>Fomenta la calidad del servicio</li>
              <li>Reduce los costos y gastos médicos</li>
              <li>Asegura resultados concretos y evaluables</li>
              <li>Visualiza el Bienestar como calidad de vida para el paciente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">Misión</h2>
            <p className="text-gray-700 text-lg">
              Nuestra compañía tiene el firme compromiso de brindar a nuestros clientes y pacientes Soluciones Integrales en el sector salud.
              Con la calidez y eficacia necesaria: contamos con una gama amplia de profesionales capacitados para brindar una atención personalizada
              con los más altos estándares de calidad y entregando los mejores indicadores de servicio y economía.
            </p>
          </div>
          <div>
            <Image
              src="/images/team-hands.png"
              alt="Equipo unido"
              width={600}
              height={400}
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visión */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">Visión</h2>
            <p className="text-gray-700 text-lg">
              Nos proyectamos para el 2027 como una compañía de servicios médicos y farmacéuticos importantes en la administración del riesgo y su intervención oportuna, reconocida por las empresas administradoras de planes de beneficios y aseguradoras para Colombia, trabajamos como una compañía que brinda solución en la optimización de recursos, con resultados positivos acordes con las necesidades actuales del Sistema de Salud.
            </p>
          </div>
          <div className="md:order-1">
            <Image
              src="/images/team-hands.png"
              alt="Equipo colaborativo"
              width={600}
              height={400}
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Valores Corporativos */}
      <section className="py-16 px-4 bg-[#3CA5DA] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Valores Corporativos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {[
              { label: "LEALTAD", img: "/images/lealtad.png" },
              { label: "OPORTUNIDAD", img: "/images/oportunidad.png" },
              { label: "DIFERENCIA", img: "/images/diferencia.png" },
              { label: "EXCELENCIA", img: "/images/excelencia.png" },
              { label: "RESPONSABILIDAD", img: "/images/responsabilidad.png" },
              { label: "PUNTUALIDAD", img: "/images/puntualidad.png" },
              { label: "TRANSPARENCIA", img: "/images/transparencia.png" },
            ].map((valor) => (
              <div key={valor.label} className="flex flex-col items-center">
                <div className="rounded-full p-[6px] bg-[#1C2B4E]">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[6px] border-[#79C3EA]">
                    <Image src={valor.img} alt={valor.label} width={128} height={128} className="object-cover w-full h-full" />
                  </div>
                </div>
                <span
                  className={`mt-4 px-3 py-1 font-semibold rounded-full text-sm ${["LEALTAD", "DIFERENCIA", "EXCELENCIA", "PUNTUALIDAD"].includes(valor.label)
                      ? "bg-[#1C2B4E] text-white"
                      : "bg-[#79C3EA] text-[#1C2B4E]"
                    }`}
                >
                  {valor.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#3CA5DA] text-white rounded-2xl p-8 space-y-4 text-lg">
            <ul className="space-y-2">
              <li><a href="/services/medicina-general" className="underline hover:text-white">Medicina General</a></li>
              <li><a href="/services" className="underline hover:text-white">Programas de atención</a></li>
              <li><a href="/services/medicina-laboral" className="underline hover:text-white">SST</a></li>
              <li><span>Laboratorio Clínico</span></li>
            </ul>
            <ul className="space-y-2 pt-4">
              <li><a href="/estados-financieros-2024" className="underline hover:text-white">Estados financieros</a></li>
              <li><a href="/contact" className="underline hover:text-white">Trabaja con nosotros</a></li>
              <li><a href="/pqrs" className="underline hover:text-white">Escríbenos PQRFS</a></li>
            </ul>
          </div>
          <div className="text-[#1C2B4E] space-y-4 text-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
            <p>info@bihospharma.com<br />www.bihospharma.com</p>
            <p><strong>TELÉFONO</strong><br />320 316 5870 - 350 2151683</p>
            <p><strong>YOPAL (CASANARE)</strong><br />Tranversal 18 #7-05 Piso 5<br />Edificio Mont Black</p>
            <p><strong>BOGOTÁ D.C</strong><br />Cra 25 No 4A-14</p>
            <div className="flex gap-6 pt-4">
              <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer">
                <Image src="/logos/instagram.png" alt="Instagram" width={32} height={32} />
              </a>
              <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
                <Image src="/logos/facebook.png" alt="Facebook" width={32} height={32} />
              </a>
              <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
                <Image src="/logos/linkedin.png" alt="LinkedIn" width={32} height={32} />
              </a>
              <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
                <Image src="/logos/x.png" alt="X/Twitter" width={32} height={32} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
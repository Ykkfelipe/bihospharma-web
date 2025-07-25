import Image from 'next/image';
import HeroCarousel from './components/HeroCarousel';
export default function Home() {
  return (
    <main>
      <section className="relative w-full">
        <HeroCarousel showDots={true} showArrows={true} />
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
      
      {/* Programas de Atención - New Layout */}
      <section className="bg-[#51ADE5] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Programas de Atención
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/artritis.png"
              alt="Artritis Reumatoide"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">ARTRITIS REUMATOIDE</h3>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/diabetes.png"
              alt="Diabetes"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <div className="text-center px-2">
                <h3 className="text-xl md:text-2xl font-bold mb-2">TELEASISTENCIA DOMICILIARIA PARA DIABETES</h3>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/vih.png"
              alt="VIH"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">VIH</h3>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/hemofilia.png"
              alt="Hemofilia"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">HEMOFILIA</h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/anticoagulados.png"
              alt="Anticoagulados"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">ANTICOAGULADOS</h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/esclerosis.png"
              alt="Esclerosis Múltiple"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">ESCLEROSIS MÚLTIPLE</h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/hipertension.png"
              alt="Diabetes e Hipertensión"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">DIABETES É HIPERTENSIÓN</h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/extension.png"
              alt="Extensión Domiciliaria"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">EXTENSIÓN DOMICILIARIA</h3>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 sm:h-56 md:h-64">
            <img
              src="/images/nefro.png"
              alt="Nefroprotección"
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">NEFROPROTECCIÓN</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-10">Confían en Nosotros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-6 items-center justify-items-center">
            <img src="/logos/capresoca-eps-logo.png" alt="Capresoca" className="h-28 w-auto object-contain" />
            <img src="/logos/medimas-eps-logo.png" alt="Medimás" className="h-28 w-auto object-contain" />
            <img src="/logos/logo-asmetsalud.png" alt="Asmet Salud" className="h-28 w-auto object-contain" />
            <img src="/logos/logo-convida.png" alt="Convida" className="h-28 w-auto object-contain" />
            <img src="/logos/coosalud-logo.png" alt="Coosalud" className="h-28 w-auto object-contain" />
            <img src="/logos/jersalud-logo.png" alt="Jersalud" className="h-28 w-auto object-contain" />
            <img src="/logos/logo-cohan-mas-vital.png" alt="Cohan" className="h-28 w-auto object-contain" />
            <img src="/logos/deposito-de-drogas-boyaca-logo.png" alt="Depósito de Drogas" className="h-28 w-auto object-contain" />
            <img src="/logos/logo-clinica-casanare.png" alt="Clínica Casanare" className="h-28 w-auto object-contain" />
          </div>
        </div>
      </section>
      
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black mb-4">Contacto</h2>
            <p className="text-black mb-2">info@bihospharma.com</p>
            <p className="text-black mb-4">www.bihospharma.com</p>
            <p className="text-black font-semibold">TELÉFONO</p>
            <p className="text-black mb-4">320 316 5870 - 350 2151683</p>
            <p className="text-black font-semibold">YOPAL (CASANARE)</p>
            <p className="text-black">Transversal 18 #7-05 Piso 5</p>
            <p className="text-black mb-4">Edificio Mont Black</p>
            <p className="text-black font-semibold">BOGOTÁ D.C</p>
            <p className="text-black mb-4">Cra 25 No 4A-14</p>
            <p className="text-black font-semibold mb-2">SÍGUENOS:</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logos/instagram.png"
                  alt="Instagram"
                  className="h-10 w-10 rounded-full bg-[#007bff] p-2"
                />
              </a>
              <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logos/facebook.png"
                  alt="Facebook"
                  className="h-10 w-10 rounded-full bg-[#007bff] p-2"
                />
              </a>
              <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logos/linkedin.png"
                  alt="LinkedIn"
                  className="h-10 w-10 rounded-full bg-[#007bff] p-2"
                />
              </a>
              <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logos/x.png"
                  alt="X/Twitter"
                  className="h-10 w-10 rounded-full bg-[#007bff] p-2"
                />
              </a>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="relative">
              <img src="/images/map.png" alt="Mapa" className="max-w-full rounded-lg" />
              <a
                href="https://wa.me/573203165870"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-[22px] right-[18px] w-[48px] h-[48px]"
              >
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
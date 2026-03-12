import Image from 'next/image';

export default function DiaMundialCorazonPage() {
  return (
    <>
      {/* HERO full-bleed */}
      <section className="relative w-full h-[320px] md:h-[420px]">
        <Image
          src="/images/corazon1.png"
          alt="Día Mundial del Corazón"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold text-center px-4 tracking-wide drop-shadow">
            Día Mundial del Corazón
          </h1>
        </div>
      </section>

      <main className="px-6 md:px-8 py-12 font-sans max-w-[1100px] mx-auto">

      <div className="py-8">
        <p className="text-lg mb-4 leading-relaxed">
          Desde el año 2000, la <strong>Federación Mundial del Corazón</strong>, con el apoyo de la <strong>Organización Mundial de la Salud (OMS)</strong>, conmemora cada <strong>25 de septiembre</strong> el <strong>Día Mundial del Corazón</strong>. Esta fecha busca crear conciencia sobre las enfermedades cardiovasculares, su prevención, control y tratamiento.
        </p>
      </div>

      {/* Problema Global */}
      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-[#1e88e5] mb-4">Un problema de salud global</h2>
        <p className="leading-relaxed">
          Las enfermedades cardiovasculares son la principal causa de muerte en el mundo.
        </p>
        <ul className="mt-4 pl-5 leading-relaxed list-disc">
          <li>Cada año, más de 17 millones de personas fallecen a causa de infartos y accidentes cerebrovasculares.</li>
          <li>Se estima que para el año 2030 esta cifra alcanzará los 23 millones si no se refuerzan las medidas de prevención.</li>
        </ul>
      </section>

      {/* Enfermedades más comunes (highlight box) */}
      <section className="mb-12 bg-gray-100 px-6 py-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-extrabold text-[#1e88e5] mb-4">
          Enfermedades más comunes que afectan al corazón
        </h2>
        <p className="leading-relaxed">
          Algunas de las afecciones cardíacas más frecuentes son:
        </p>
        <ul className="mt-4 pl-5 leading-relaxed list-disc space-y-1">
          <li><strong>Infarto de miocardio:</strong> ocurre por el estrechamiento o bloqueo de los vasos sanguíneos que llevan sangre al corazón.</li>
          <li><strong>Enfermedades cerebrovasculares:</strong> causadas por sangrado cerebral o coágulos en el cerebro.</li>
          <li><strong>Hipertensión arterial:</strong> presión alta, uno de los mayores factores de riesgo.</li>
          <li><strong>Angina de pecho:</strong> dolor torácico debido a la reducción del flujo sanguíneo al corazón.</li>
          <li><strong>Arritmias:</strong> alteraciones en el ritmo normal del corazón.</li>
          <li><strong>Insuficiencia cardíaca:</strong> cuando el corazón no puede bombear suficiente sangre para cubrir las necesidades del cuerpo.</li>
        </ul>
      </section>


      {/* Cómo cuidar tu corazón */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-8 items-center justify-between">
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-2xl font-extrabold text-[#1e88e5] mb-4">
              ¿Cómo cuidar tu corazón?
            </h2>
            <p className="leading-relaxed mb-4">
              La OMS invita a adoptar cambios sencillos pero poderosos en el estilo de vida para proteger el corazón:
            </p>
            <ul className="pl-5 leading-relaxed list-disc space-y-1">
              <li><strong>Alimentación saludable:</strong> seguir una dieta tipo mediterránea, reduciendo grasas saturadas e incorporando omega 3 y pescado.</li>
              <li><strong>Ejercicio físico:</strong> al menos 30 minutos diarios de actividad moderada.</li>
              <li><strong>Evitar sustancias dañinas:</strong> limitar la sal, reducir el alcohol y eliminar el tabaco.</li>
              <li><strong>Controlar el colesterol y la presión arterial.</strong></li>
              <li><strong>Mantener un peso saludable:</strong> ya que la obesidad es un importante factor de riesgo cardiovascular.</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[280px] text-center">
            <Image
              src="/images/corazon2.png"
              alt="Cuida tu corazón"
              width={400}
              height={250}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Prevención y mensaje final */}
      <section className="bg-gray-100 pt-12 pb-0 mb-0 rounded-xl">
        <div className="max-w-[960px] mx-auto text-center px-4">
          <p className="text-xl leading-relaxed mb-8">
            El cuidado del corazón depende en gran medida de nuestros hábitos diarios. Prevenir es la mejor manera de reducir el riesgo de enfermedades cardiovasculares y garantizar una mejor calidad de vida.
          </p>
          <div className="flex justify-center gap-6 flex-wrap mb-8">
            <Image src="/images/corazon4.png" alt="Ejercicio físico" width={280} height={200} className="rounded-lg object-cover" />
            <Image src="/images/corazon5.png" alt="Alimentación saludable" width={280} height={200} className="rounded-lg object-cover" />
            <Image src="/images/corazon6.png" alt="Control de peso" width={280} height={200} className="rounded-lg object-cover" />
          </div>
        </div>
      </section>

      {/* CTA AZUL */}
      <section className="bg-[#1991eb] py-6 mt-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="m-0 text-white text-center font-extrabold" style={{ fontSize: 'clamp(1.05rem, 2.7vw, 1.5rem)' }}>
            En <strong>Bihospharma</strong> te acompañamos en el cuidado integral de tu salud.
            Agenda tu cita con nuestros especialistas y da el primer paso hacia un
            corazón más saludable.
          </p>
        </div>
      </section>

      {/* Centered CTA button (match services style) */}
      <section className="ctaButton bg-white py-6 px-4">
        <div className="flex justify-center">
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20quiero%20agendar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-b from-[#2EA0DF] to-[#1c82c3] text-white px-7 py-3 rounded-full font-extrabold tracking-wide text-[clamp(0.98rem,1.9vw,1.25rem)] shadow-lg border-3 border-white"
            style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.4)' }}
          >
            <span aria-hidden className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M20.52 3.48A11.79 11.79 0 0012 0C5.373 0 0 5.373 0 12a11.94 11.94 0 001.64 6.01L0 24l6.1-1.6A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.5 16.07a8.5 8.5 0 01-4.58-1.3l-.33-.2-3.1.81.83-3.02-.21-.34a8.5 8.5 0 1110.4 3.05 8.44 8.44 0 01-3.01 1zm4.32-5.4c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.54 6.54 0 01-1.92-1.18 7.28 7.28 0 01-1.35-1.68c-.14-.24 0-.36.1-.48.1-.1.24-.26.36-.4a1.5 1.5 0 00.24-.4.25.25 0 00-.02-.4c-.06-.06-.54-1.3-.74-1.8s-.38-.42-.54-.42h-.46a1.4 1.4 0 00-1 .48 4.15 4.15 0 00-1.28 3.06 6.62 6.62 0 003.05 4.72 13.9 13.9 0 004.06 2.02 4.43 4.43 0 002 .16 3.27 3.27 0 001.98-1.44 2.91 2.91 0 00.2-1.44c-.06-.12-.24-.18-.54-.3z"/>
              </svg>
            </span>
            <span style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.2rem)' }}>AGENDA TU CITA</span>
          </a>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact relative bg-white py-12 px-4">
        <div className="absolute right-0 bottom-[-30px] w-80 h-80 opacity-10 pointer-events-none">
          <Image src="/images/bihospharma-logo-banner.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div
          className="max-w-[1200px] mx-auto grid gap-8 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
        >
          <div className="text-[#1d1d1f] text-[1.05rem] leading-[1.8rem]">
            <h2 className="m-0 mb-4 text-4xl font-extrabold">Contacto</h2>
            <p className="m-0 mb-1">info@bihospharma.com</p>
            <p className="m-0 mb-4">www.bihospharma.com</p>

            <p className="m-0 mb-1 font-bold">TELÉFONO</p>
            <p className="m-0 mb-4">PBX 3103158806 Opc1 - 3232347791</p>

            <p className="m-0 mb-2 font-bold">SÍGUENOS:</p>
            <div className="flex gap-3 mt-2">
              <a href="https://www.instagram.com/bihospharma.ips/" target="_blank" rel="noopener noreferrer"><Image src="/logos/instagram.png" alt="Instagram" width={30} height={30} /></a>
              <a href="https://www.facebook.com/Bihospharma.ips/" target="_blank" rel="noopener noreferrer"><Image src="/logos/facebook.png" alt="Facebook" width={30} height={30} /></a>
              <a href="https://www.linkedin.com/company/bihospharma-sas/" target="_blank" rel="noopener noreferrer"><Image src="/logos/linkedin.png" alt="LinkedIn" width={30} height={30} /></a>
              <a href="https://twitter.com/bihospharma" target="_blank" rel="noopener noreferrer"><Image src="/logos/x.png" alt="X" width={30} height={30} /></a>
            </div>
          </div>

          <div className="text-[#1d1d1f] text-[1.05rem] leading-[1.8rem]">
            <p className="my-1">
              <strong>YOPAL (CASANARE)</strong><br />
              Tranversal 18 #7-05 Piso 5<br />
              Edificio Mont Black
            </p>
            <p className="mt-2 mb-0">
              <strong>BOGOTÁ D.C</strong><br />
              Cra 25 No 4A-14
            </p>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

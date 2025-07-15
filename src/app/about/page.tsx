export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1C2B4E] text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiénes Somos</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-justify px-4 hyphens-auto">
          Somos una compañía Colombiana orientada al manejo clínico ambulatorio de servicios de baja, mediana y alta complejidad; especializada en enfermedades de Alto Costo y en el suministro de productos farmacéuticos y hospitalarios; a través de la implementación de modelos de atención costo efectivos que brindan soluciones Innovadoras e Integrales para los pacientes e instituciones. Hoy BIHOSPHARMA cuenta con un equipo interdisciplinario idóneo, comprometido con el bienestar y mejoramiento de la calidad de vida de los pacientes.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">Nuestra Misión</h2>
          <p className="text-gray-700 mb-12 text-justify">
            Brindar servicios de salud con calidad, calidez humana y tecnología avanzada,
            enfocados en el bienestar integral de nuestros pacientes y sus familias.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-6">Nuestra Visión</h2>
          <p className="text-gray-700 text-justify">
            Ser líderes en atención en salud reconocidos por nuestra excelencia, innovación y compromiso social.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2B4E] mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
              <p className="text-gray-600">Con nuestros pacientes, su salud y bienestar integral.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
              <p className="text-gray-600">Brindando servicios con calidad, seguridad y calidez humana.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600">Implementando tecnologías y procesos para mejores resultados.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
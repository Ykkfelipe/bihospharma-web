import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] text-center text-sm py-6 border-t border-[#e0e0e0] mt-12">
      <div className="flex justify-center mb-4">
        <Image
          src="/logos/vigilado-supersalud.png"
          alt="Vigilado Supersalud"
          width={160}
          height={80}
          className="rounded-md border border-blue-300 shadow-lg shadow-blue-200 hover:shadow-blue-400 hover:shadow-xl transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="text-[#009cde] font-medium">
        <a
          href="#"
          className="text-[#009cde] font-medium hover:underline mr-2"
        >
          Política Protección de datos
        </a>
        -
        <a
          href="#"
          className="text-[#009cde] font-medium hover:underline ml-2"
        >
          Formato tratamiento de datos
        </a>
      </div>
      <div className="text-[#5a5a5a] font-medium mt-1">
        © Copyright Bihospharma 2025. All Rights Reserved.
      </div>
    </footer>
  );
}
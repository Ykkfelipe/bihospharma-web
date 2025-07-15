

"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1C2B4E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="font-bold text-xl cursor-pointer">Bihospharma</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <span className="hover:text-gray-300 cursor-pointer">Inicio</span>
              </Link>
              <Link href="/about">
                <span className="hover:text-gray-300 cursor-pointer">Sobre Nosotros</span>
              </Link>
              <Link href="/services">
                <span className="hover:text-gray-300 cursor-pointer">Servicios</span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-gray-300 cursor-pointer">Contacto</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link href="/">
            <span className="block px-3 py-2 rounded-md hover:bg-[#4C80A4]">Inicio</span>
          </Link>
          <Link href="/about">
            <span className="block px-3 py-2 rounded-md hover:bg-[#4C80A4]">Sobre Nosotros</span>
          </Link>
          <Link href="/services">
            <span className="block px-3 py-2 rounded-md hover:bg-[#4C80A4]">Servicios</span>
          </Link>
          <Link href="/contact">
            <span className="block px-3 py-2 rounded-md hover:bg-[#4C80A4]">Contacto</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
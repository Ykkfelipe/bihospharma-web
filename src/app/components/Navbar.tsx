"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSustainabilityMenu, setShowSustainabilityMenu] = useState(false);

  // Dropdown timeout logic
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // delay to allow moving mouse to menu
  };

  return (
    <nav className="bg-white text-[#1C2B4E] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logos/bihos-logo.png"
              alt="Bihospharma Logo"
              width={100}
              height={100}
              priority
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-normal text-base">
            <Link href="/">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Inicio</span>
            </Link>
            <Link href="/about">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Nosotros</span>
            </Link>
            <Link href="/services">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Servicios</span>
            </Link>
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/estados-financieros-2024">
                <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">
                  Gestión y Sostenibilidad
                </span>
              </Link>
              <div className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded z-10 ${dropdownOpen ? 'flex' : 'hidden'} flex-col`}>
                <Link href="/estados-financieros-2024">
                  <span className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#1C2B4E]">Estados Financieros 2024</span>
                </Link>
                <Link href="/estados-financieros-2023">
                  <span className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#1C2B4E]">Estados Financieros 2023</span>
                </Link>
                <Link href="/estados-financieros-2022">
                  <span className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#1C2B4E]">Estados Financieros 2022</span>
                </Link>
              </div>
            </div>
            <Link href="/contact">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Contacto</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1C2B4E] hover:text-black focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 font-medium uppercase text-[#1C2B4E]">
          <Link href="/">
            <span onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:underline">Inicio</span>
          </Link>
          <Link href="/about">
            <span onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:underline">Nosotros</span>
          </Link>
          <Link href="/services">
            <span onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:underline">Servicios</span>
          </Link>
          <div>
            <span
              className="block px-3 py-2 cursor-pointer hover:underline hover:text-[#1C2B4E]"
              onClick={() => setShowSustainabilityMenu(!showSustainabilityMenu)}
            >
              Gestión y Sostenibilidad
            </span>
            {showSustainabilityMenu && (
              <>
                <Link href="/estados-financieros-2024">
                  <span onClick={() => setIsOpen(false)} className="block px-6 py-2 hover:underline">Estados Financieros 2024</span>
                </Link>
                <Link href="/estados-financieros-2023">
                  <span onClick={() => setIsOpen(false)} className="block px-6 py-2 hover:underline">Estados Financieros 2023</span>
                </Link>
                <Link href="/estados-financieros-2022">
                  <span onClick={() => setIsOpen(false)} className="block px-6 py-2 hover:underline">Estados Financieros 2022</span>
                </Link>
              </>
            )}
          </div>
          <Link href="/contact">
            <span onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:underline">Contacto</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
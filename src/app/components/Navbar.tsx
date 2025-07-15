"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/medicina-general">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Medicina General</span>
            </Link>
            <Link href="/services">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Servicios</span>
            </Link>
            <Link href="/blog">
              <span className="cursor-pointer hover:underline hover:text-[#1C2B4E]">Blog</span>
            </Link>
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
            <span className="block px-3 py-2 hover:underline">Inicio</span>
          </Link>
          <Link href="/about">
            <span className="block px-3 py-2 hover:underline">Nosotros</span>
          </Link>
          <Link href="/medicina-general">
            <span className="block px-3 py-2 hover:underline">Medicina General</span>
          </Link>
          <Link href="/services">
            <span className="block px-3 py-2 hover:underline">Servicios</span>
          </Link>
          <Link href="/blog">
            <span className="block px-3 py-2 hover:underline">Blog</span>
          </Link>
          <Link href="/contact">
            <span className="block px-3 py-2 hover:underline">Contacto</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white sticky top-0 z-50 shadow-md">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Title */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto text-center md:text-left">
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="Logo Desa" className="w-14 h-14 object-contain" />
            </Link>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-700 leading-tight">KKM 14 DESA PANAMBANGAN</span>
              <span className="text-xs text-gray-500 font-medium mt-0.5">KEC. SEDONG KAB. CIREBON PROV. JAWA BARAT</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center justify-center w-full md:w-auto mt-3 md:mt-0">
            <form action="/blog" method="GET" className="flex w-full md:w-72 border border-gray-300 rounded overflow-hidden">
              <input 
                type="text" 
                name="q"
                placeholder="Cari Artikel" 
                className="px-3 py-1.5 w-full text-sm outline-none"
              />
              <button type="submit" className="bg-[#2e79b9] hover:bg-[#256396] text-white px-4 py-1.5 text-sm font-medium transition-colors flex items-center justify-center">
                Cari
              </button>
            </form>
            
            {/* Mobile Menu Toggle */}
            <button 
              type="button" 
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 md:hidden text-gray-600 hover:text-[#dc3545] focus:outline-none flex-shrink-0"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Red Navigation */}
      <nav className="bg-[#dc3545] border-t border-b border-[#c82333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto whitespace-nowrap scrollbar-hide py-0">
            <Link href="/blog" className="text-white hover:bg-[#c82333] px-3 py-3 text-sm font-bold uppercase transition-colors">BERANDA</Link>
            <Link href="/artikel/jahe-merah" className="text-white hover:bg-[#c82333] px-3 py-3 text-sm font-bold uppercase transition-colors">ARTIKEL TOGA</Link>
            <Link href="/artikel/maggot-bsf" className="text-white hover:bg-[#c82333] px-3 py-3 text-sm font-bold uppercase transition-colors">ARTIKEL MAGGOT</Link>
            <Link href="/" className="text-white hover:bg-[#c82333] px-3 py-3 text-sm font-bold uppercase transition-colors">KEMBALI KE PORTAL</Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#dc3545] border-t border-[#c82333]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-white hover:bg-[#c82333] uppercase">BERANDA</Link>
              <Link href="/artikel/jahe-merah" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-white hover:bg-[#c82333] uppercase">ARTIKEL TOGA</Link>
              <Link href="/artikel/maggot-bsf" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-white hover:bg-[#c82333] uppercase">ARTIKEL MAGGOT</Link>
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-white hover:bg-[#c82333] uppercase">KEMBALI KE PORTAL</Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Marquee */}
      <div className="bg-gray-100 border-b border-gray-200 py-1.5 overflow-hidden block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden relative whitespace-nowrap">
          <div className="text-xs font-semibold text-gray-700 animate-marquee inline-block">
            Mari kita wujudkan Desa Panambangan menjadi Desa yang mandiri dan berwawasan lingkungan melalui program edukasi TOGA dan pengelolaan limbah organik dengan budidaya Maggot BSF.
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FDFBF5] sticky top-0 z-50 shadow-md">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Title */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 w-full md:w-auto text-center md:text-left">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Logo Desa" width={56} height={56} className="w-14 h-14 object-contain" />
            </Link>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#466651] leading-tight">KKM 14 DESA PANAMBANGAN</span>
              <span className="text-xs text-[#567a62] font-semibold mt-0.5">KEC. SEDONG KAB. CIREBON PROV. JAWA BARAT</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center justify-center w-full md:w-auto mt-3 md:mt-0">
            <form action="/blog" method="GET" className="flex w-full md:w-72 border border-[#567a62]/30 rounded overflow-hidden">
              <input 
                type="text" 
                name="q"
                placeholder="Cari Artikel" 
                className="px-3 py-1.5 w-full text-sm outline-none bg-white text-[#466651]"
              />
              <button type="submit" className="bg-[#567a62] hover:bg-[#466651] text-[#FDFBF5] px-4 py-1.5 text-sm font-semibold transition-colors flex items-center justify-center">
                Cari
              </button>
            </form>
            
            {/* Mobile Menu Toggle */}
            <button 
              type="button" 
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 md:hidden text-[#567a62] hover:text-[#d89f4b] focus:outline-none flex-shrink-0 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-[#466651] border-t border-b border-[#385241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto whitespace-nowrap scrollbar-hide py-0">
            <Link href="/blog" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">BERANDA</Link>
            <Link href="/artikel/jahe-merah" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">ARTIKEL TOGA</Link>
            <Link href="/artikel/maggot-bsf" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">ARTIKEL MAGGOT</Link>
            <Link href="/rab" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">ANGGARAN KKM</Link>
            <Link href="/laporan-keuangan" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">LAPORAN KEUANGAN</Link>
            <Link href="/" className="text-[#FDFBF5] hover:bg-[#385241] px-3 py-3 text-sm font-bold uppercase transition-colors">KEMBALI KE PORTAL</Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#466651] border-t border-[#385241]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">BERANDA</Link>
              <Link href="/artikel/jahe-merah" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">ARTIKEL TOGA</Link>
              <Link href="/artikel/maggot-bsf" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">ARTIKEL MAGGOT</Link>
              <Link href="/rab" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">ANGGARAN KKM</Link>
              <Link href="/laporan-keuangan" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">LAPORAN KEUANGAN</Link>
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#FDFBF5] hover:bg-[#385241] uppercase transition-colors">KEMBALI KE PORTAL</Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Marquee */}
      <div className="bg-[#567a62]/10 border-b border-[#567a62]/20 py-1.5 overflow-hidden block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden relative whitespace-nowrap">
          <div className="text-xs font-bold text-[#466651] animate-marquee inline-block">
            Mari kita wujudkan Desa Panambangan menjadi Desa yang mandiri dan berwawasan lingkungan melalui program edukasi TOGA dan pengelolaan limbah organik dengan budidaya Maggot BSF.
          </div>
        </div>
      </div>
    </div>
  );
}

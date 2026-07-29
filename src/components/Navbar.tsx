"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">DP</div>
              <span className="font-bold text-xl text-green-700 hidden sm:block">Desa Panambangan</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition">Home</Link>
            <Link href="/#artikel" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition">Artikel TOGA</Link>
            <Link href="/#artikel" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition">Artikel Maggot</Link>
            <a href="#kontak" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition">Kontak</a>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Home</Link>
            <Link href="/#artikel" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Artikel TOGA</Link>
            <Link href="/#artikel" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Artikel Maggot</Link>
            <a href="#kontak" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Kontak</a>
          </div>
        </div>
      )}
    </nav>
  );
}

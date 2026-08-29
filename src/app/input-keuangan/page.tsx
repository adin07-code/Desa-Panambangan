"use client";

import React from 'react';
import KeuanganForm from '@/components/KeuanganForm';
import { ArrowLeft, WalletCards } from 'lucide-react';
import Link from 'next/link';

export default function InputKeuanganPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
          <Link href="/laporan-keuangan" className="self-start w-12 h-12 flex items-center justify-center bg-white border border-[#466651]/20 rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-all shrink-0 mb-2">
            <ArrowLeft className="w-5 h-5 text-[#466651]" />
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b2d5bb]/30 text-[#466651] text-sm font-semibold tracking-wide">
            <WalletCards className="w-4 h-4" />
            <span>Sistem Input Keuangan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Catat Keuangan <span className="text-[#466651]">KKM</span>
          </h1>
          <p className="text-gray-600 max-w-sm leading-relaxed">
            Catat pemasukan dan pengeluaran secara real-time langsung dari HP Anda.
          </p>
        </div>

        {/* Content Section */}
        <KeuanganForm />
        
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import KeuanganForm from '@/components/KeuanganForm';
import { ArrowLeft, Lock, WalletCards } from 'lucide-react';
import Link from 'next/link';

export default function InputKeuanganPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bendahara14') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password salah!');
    }
  };

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
        {!isAuthenticated ? (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-6">
              <div className="bg-rose-100 p-4 rounded-full text-rose-600">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Akses Terkunci</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Masukkan PIN Bendahara untuk mengakses form input keuangan.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Masukkan Password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center tracking-widest text-lg px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all"
              />
              {error && <p className="text-rose-500 text-sm text-center font-medium">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-[#466651] hover:bg-[#3a5643] text-white py-3 rounded-xl font-bold transition-all active:scale-[0.98] shadow-md shadow-[#466651]/20"
              >
                Buka Akses
              </button>
            </form>
          </div>
        ) : (
          <KeuanganForm />
        )}
        
      </div>
    </div>
  );
}

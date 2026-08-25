"use client";

import React, { useState } from 'react';
import { Loader2, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KeuanganForm() {
  const [tanggal, setTanggal] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [tipe, setTipe] = useState<'Pemasukan' | 'Pengeluaran'>('Pengeluaran');
  const [nominal, setNominal] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  // Format number to Rupiah string
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNominal(formatRupiah(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    const numValue = parseInt(nominal.replace(/\./g, ''), 10) || 0;

    if (numValue <= 0) {
      setStatus({ type: 'error', message: 'Nominal tidak boleh kosong' });
      setIsLoading(false);
      return;
    }

    const payload = {
      tanggal,
      keterangan,
      pemasukan: tipe === 'Pemasukan' ? numValue : 0,
      pengeluaran: tipe === 'Pengeluaran' ? numValue : 0,
    };

    try {
      const res = await fetch('/api/input-keuangan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Data berhasil disimpan ke Spreadsheet!' });
        // Reset form
        setTanggal('');
        setKeterangan('');
        setNominal('');
        setTipe('Pengeluaran');
      } else {
        setStatus({ type: 'error', message: data.message || 'Terjadi kesalahan' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Gagal terhubung ke server' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
      
      {status.type === 'success' && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tanggal</label>
        <input 
          type="text" 
          required 
          placeholder="Contoh: 25 Agu 2026"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800"
        />
        <p className="text-xs text-gray-500">Format: Tanggal Bulan(Singkat) Tahun</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Keterangan</label>
        <input 
          type="text" 
          required 
          placeholder="Beli galon, beras, dll..."
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tipe Transaksi</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTipe('Pemasukan')}
            className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${tipe === 'Pemasukan' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
          >
            Pemasukan
          </button>
          <button
            type="button"
            onClick={() => setTipe('Pengeluaran')}
            className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${tipe === 'Pengeluaran' ? 'bg-rose-100 text-rose-700 border-2 border-rose-500' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
          >
            Pengeluaran
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Nominal (Rp)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 font-medium">Rp</span>
          </div>
          <input 
            type="text" 
            required 
            placeholder="0"
            value={nominal}
            onChange={handleNominalChange}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800 text-lg font-bold"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-[#466651] hover:bg-[#3a5643] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#466651]/30 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <PlusCircle className="w-5 h-5" />
            Simpan Transaksi
          </>
        )}
      </button>

    </form>
  );
}

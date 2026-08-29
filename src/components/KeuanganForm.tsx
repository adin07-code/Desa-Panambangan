"use client";

import React, { useState } from 'react';
import { Loader2, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KeuanganForm() {
  const [tanggal, setTanggal] = useState('');
  const [siapaBeli, setSiapaBeli] = useState('');
  const [tipe, setTipe] = useState<'Pemasukan' | 'Pengeluaran'>('Pengeluaran');
  const [jenisKas, setJenisKas] = useState<'KKM' | 'Pribadi'>('KKM');
  
  const [items, setItems] = useState([{ id: Date.now(), namaBarang: '', pcs: '1', nominal: '' }]);
  
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

  const handleItemChange = (id: number, field: string, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'nominal') {
          return { ...item, [field]: formatRupiah(value) };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), namaBarang: '', pcs: '1', nominal: '' }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const calculateTotalKeseluruhan = () => {
    let total = 0;
    items.forEach(item => {
      const numValue = parseInt(item.nominal.replace(/\./g, ''), 10) || 0;
      if (tipe === 'Pemasukan') {
        total += numValue;
      } else {
        const pcsValue = parseInt(item.pcs, 10) || 1;
        total += (pcsValue * numValue);
      }
    });
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    if (!tanggal) {
      setStatus({ type: 'error', message: 'Tanggal harus dipilih' });
      setIsLoading(false);
      return;
    }

    // Validate items
    const invalidItem = items.find(item => !item.namaBarang || !item.nominal);
    if (invalidItem) {
      setStatus({ type: 'error', message: 'Ada barang yang belum diisi nama atau nominalnya' });
      setIsLoading(false);
      return;
    }

    const payloads = items.map(item => {
      const numValue = parseInt(item.nominal.replace(/\./g, ''), 10) || 0;
      const pcsValue = parseInt(item.pcs, 10) || 1;

      let payload: any = {
        tanggal,
        namaBarang: item.namaBarang,
        siapaBeli: siapaBeli || 'Sie Konsumsi',
      };

      if (tipe === 'Pemasukan') {
        payload.totalBarang = numValue;
        if (jenisKas === 'KKM') {
          payload.pemasukanKkm = numValue;
        } else {
          payload.pemasukanPribadi = numValue;
        }
      } else {
        // Pengeluaran
        const totalBarang = pcsValue * numValue;
        payload.pcs = pcsValue;
        payload.hargaSatuan = numValue;
        payload.totalBarang = totalBarang;
        
        if (jenisKas === 'KKM') {
          payload.pengeluaranKkm = totalBarang;
        } else {
          payload.pengeluaranPribadi = totalBarang;
        }
      }
      
      return payload;
    });

    try {
      const res = await fetch('/api/input-keuangan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloads),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `${items.length} Data berhasil disimpan ke Database!` });
        // Reset items to 1 empty item
        setItems([{ id: Date.now(), namaBarang: '', pcs: '1', nominal: '' }]);
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
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 mb-6 border border-emerald-100">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl flex items-center gap-3 mb-6 border border-rose-100">
          <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tanggal Transaksi</label>
            <input 
              type="date" 
              required 
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Siapa yang Beli / Kasir</label>
            <input 
              type="text" 
              placeholder="Kosongkan jika Sie Konsumsi"
              value={siapaBeli}
              onChange={(e) => setSiapaBeli(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800"
            />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tipe Transaksi</label>
            <div className="flex gap-2">
            <button
                type="button"
                onClick={() => setTipe('Pengeluaran')}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${tipe === 'Pengeluaran' ? 'bg-rose-100 text-rose-700 border-2 border-rose-500' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
                Pengeluaran
            </button>
            <button
                type="button"
                onClick={() => setTipe('Pemasukan')}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${tipe === 'Pemasukan' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
                Pemasukan
            </button>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Sumber / Tujuan Kas</label>
            <div className="flex gap-2">
            <button
                type="button"
                onClick={() => setJenisKas('KKM')}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${jenisKas === 'KKM' ? 'bg-[#466651] text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
                Kas KKM
            </button>
            <button
                type="button"
                onClick={() => setJenisKas('Pribadi')}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all ${jenisKas === 'Pribadi' ? 'bg-slate-700 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
            >
                Uang Pribadi
            </button>
            </div>
        </div>
      </div>
      
      <hr className="border-gray-100 my-4" />
      
      <div className="space-y-4">
          <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Daftar Barang / Transaksi</h3>
              <button 
                type="button" 
                onClick={addItem}
                className="text-sm font-bold text-[#466651] bg-[#466651]/10 px-3 py-1.5 rounded-lg hover:bg-[#466651]/20 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" /> Tambah Barang
              </button>
          </div>
          
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl relative">
                {items.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-3 -right-3 bg-white text-rose-500 border border-gray-200 hover:bg-rose-50 rounded-full p-1.5 shadow-sm transition-colors"
                      title="Hapus Barang"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="space-y-2 md:col-span-5">
                    <label className="text-xs font-semibold text-gray-600">Nama Barang / Uraian</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Contoh: Beli Sayuran..."
                      value={item.namaBarang}
                      onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800 text-sm"
                    />
                  </div>
                  
                  {tipe === 'Pengeluaran' && (
                      <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-semibold text-gray-600">Jumlah (Pcs)</label>
                          <input 
                              type="number" 
                              min="1"
                              required 
                              value={item.pcs}
                              onChange={(e) => handleItemChange(item.id, 'pcs', e.target.value)}
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800 font-bold text-center text-sm"
                          />
                      </div>
                  )}

                  <div className={`space-y-2 ${tipe === 'Pengeluaran' ? 'md:col-span-5' : 'md:col-span-7'}`}>
                      <label className="text-xs font-semibold text-gray-600">
                          {tipe === 'Pengeluaran' ? 'Harga Satuan (Rp)' : 'Nominal Pemasukan (Rp)'}
                      </label>
                      <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium text-sm">Rp</span>
                      </div>
                      <input 
                          type="text" 
                          required 
                          placeholder="0"
                          value={item.nominal}
                          onChange={(e) => handleItemChange(item.id, 'nominal', e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651] focus:border-transparent outline-none transition-all text-gray-800 font-bold text-sm"
                      />
                      </div>
                  </div>
                </div>
            </div>
          ))}
      </div>

      <div className="bg-[#b2d5bb]/20 p-4 md:p-5 rounded-2xl border border-[#b2d5bb]/40 flex flex-col md:flex-row justify-between items-center gap-2 mt-8">
          <span className="text-sm font-bold text-[#466651] uppercase tracking-wide">Total Keseluruhan:</span>
          <span className="text-2xl font-black text-[#466651]">
              Rp {formatRupiah(calculateTotalKeseluruhan().toString())}
          </span>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-[#466651] hover:bg-[#3a5643] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#466651]/30 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Menyimpan {items.length} Data...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Simpan {items.length} Transaksi Sekaligus
          </>
        )}
      </button>

    </form>
  );
}

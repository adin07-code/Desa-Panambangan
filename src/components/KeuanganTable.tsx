/* eslint-disable */
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Wallet, CheckCircle2, CheckSquare, Square, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { KeuanganItem } from '@/data/keuanganData';

interface KeuanganTableProps {
  data: KeuanganItem[];
}

export default function KeuanganTable({ data }: KeuanganTableProps) {
  const [localData, setLocalData] = useState<KeuanganItem[]>(data);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<KeuanganItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const toggleRembes = async (item: KeuanganItem) => {
    const newStatus = !item.is_rembes;
    
    let newKkm = item.pengeluaranKkm;
    let newPribadi = item.pengeluaranPribadi;

    if (newStatus) {
      if (item.pengeluaranPribadi) {
        newKkm = item.pengeluaranPribadi;
        newPribadi = null;
      }
    } else {
      if (item.pengeluaranKkm) {
         newPribadi = item.pengeluaranKkm;
         newKkm = null;
      }
    }

    const updatedItem = {
      ...item,
      is_rembes: newStatus,
      pengeluaranKkm: newKkm,
      pengeluaranPribadi: newPribadi
    };

    setLocalData(prev => prev.map(t => t.id === item.id ? updatedItem : t));

    try {
      const res = await fetch('/api/keuangan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: item.id, 
          is_rembes: newStatus,
          pengeluaranKkm: newKkm,
          pengeluaranPribadi: newPribadi
        })
      });
      if (!res.ok) throw new Error('Gagal update status');
    } catch (err) {
      console.error(err);
      setLocalData(prev => prev.map(t => t.id === item.id ? item : t));
      alert('Gagal mengubah status rembes. Coba lagi.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/keuangan?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal hapus data');
      setLocalData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/keuangan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });
      if (!res.ok) throw new Error('Gagal update data');
      
      setLocalData(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan perubahan.');
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate running balance and totals
  const { 
    processedData,
    dailyTotals,
    totalPemasukanKkm, 
    totalPengeluaranKkm, 
    saldoKkm,
    totalPemasukanPribadi,
    totalPengeluaranPribadi,
    saldoPribadi
  } = useMemo(() => {
    let currentSaldoKkm = 0;
    let tPemasukanKkm = 0;
    let tPengeluaranKkm = 0;

    let currentSaldoPribadi = 0;
    let tPemasukanPribadi = 0;
    let tPengeluaranPribadi = 0;

    let currentTotalKeseluruhan = 0;
    const dailyTotals: Record<string, { outKkm: number, outPribadi: number }> = {};

    const processed = localData.map((item, index, arr) => {
      // KKM
      if (item.pemasukanKkm) {
        currentSaldoKkm += item.pemasukanKkm;
        tPemasukanKkm += item.pemasukanKkm;
      }
      if (item.pengeluaranKkm) {
        currentSaldoKkm -= item.pengeluaranKkm;
        tPengeluaranKkm += item.pengeluaranKkm;
      }
      if (item.pemasukanPribadi) {
        currentSaldoPribadi += item.pemasukanPribadi;
        tPemasukanPribadi += item.pemasukanPribadi;
      }
      if (item.pengeluaranPribadi) {
        currentSaldoPribadi -= item.pengeluaranPribadi;
        tPengeluaranPribadi += item.pengeluaranPribadi;
      }

      // Daily totals calculation
      if (!dailyTotals[item.tanggal]) {
        dailyTotals[item.tanggal] = { outKkm: 0, outPribadi: 0 };
      }
      if (item.pengeluaranKkm) dailyTotals[item.tanggal].outKkm += item.pengeluaranKkm;
      if (item.pengeluaranPribadi) dailyTotals[item.tanggal].outPribadi += item.pengeluaranPribadi;

      // Total Keseluruhan (Saldo)
      currentTotalKeseluruhan = currentSaldoKkm + currentSaldoPribadi;

      // Calculate rowSpan for tanggal
      let rowSpan = 1;
      if (index > 0 && item.tanggal === arr[index - 1].tanggal) {
        rowSpan = 0; // Don't render td if same as previous
      } else {
        // Count how many subsequent rows have the same date
        for (let i = index + 1; i < arr.length; i++) {
          if (arr[i].tanggal === item.tanggal) {
            rowSpan++;
          } else {
            break;
          }
        }
      }

      return {
        ...item,
        saldo: currentTotalKeseluruhan,
        rowSpan
      };
    });

    return {
      processedData: processed,
      dailyTotals,
      totalPemasukanKkm: tPemasukanKkm,
      totalPengeluaranKkm: tPengeluaranKkm,
      saldoKkm: currentSaldoKkm,
      totalPemasukanPribadi: tPemasukanPribadi,
      totalPengeluaranPribadi: tPengeluaranPribadi,
      saldoPribadi: currentSaldoPribadi
    };
  }, [localData]);

  // Helper to format currency
  const formatRupiah = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '-';
    // Format according to Excel screenshot: Rp 38,000 or -Rp 38,000
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    
    if (absAmount === 0) return 'Rp -';

    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(absAmount);

    return isNegative ? `-${formatted}` : formatted;
  };

  return (
    <div className="w-full pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Summary Dashboard - matches the screenshot */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
          <Wallet className="w-6 h-6 text-[#466651]" /> 
          LAPORAN KEUANGAN KKM 14
        </h2>

        <div className="grid grid-cols-1 gap-8">
            {/* KKM Section */}
            <div className="space-y-4">
                <div className="bg-[#466651] text-white p-4 rounded-xl shadow-md">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-1 text-white/80">Total Kas KKM Tersisa</h3>
                    <p className="text-3xl font-extrabold">{formatRupiah(saldoKkm)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-800 uppercase mb-1">Total Pemasukan KKM</p>
                        <p className="text-lg font-bold text-emerald-600">{formatRupiah(totalPemasukanKkm)}</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                        <p className="text-xs font-bold text-rose-800 uppercase mb-1">Total Pengeluaran KKM</p>
                        <p className="text-lg font-bold text-rose-600">{formatRupiah(totalPengeluaranKkm)}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-[#b2d5bb]/30 p-2.5 rounded-2xl text-[#466651]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#466651] tracking-tight">Buku Kas & Stok (Sie Konsumsi)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#1b4332] text-xs font-semibold text-white uppercase tracking-wider border-b border-[#1b4332]">
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f]">Tanggal</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f]">Nama Barang / Uraian</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f]">Siapa yang Beli</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-center">Pcs</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-center">Barang yang Masih Ada</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Harga Satuan</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Total per Barang</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Pemasukkan Kas KKM (Bendahara)</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Pemasukan Pribadi</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Pengeluaran Kas KKM (Bendahara)</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-right">Pengeluaran Pribadi</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-center">Status Rembes</th>
                <th className="py-4 px-4 font-medium border-r border-[#2d6a4f] text-center">Aksi</th>
                <th className="py-4 px-4 font-medium text-right bg-[#081c15]">Total Keseluruhan (Saldo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {processedData.map((item, idx) => {
                const isLastOfDate = idx === processedData.length - 1 || processedData[idx + 1].tanggal !== item.tanggal;
                const dailyTotal = dailyTotals[item.tanggal];
                return (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50/50 transition-colors text-sm">
                    {item.rowSpan > 0 && (
                      <td 
                        rowSpan={item.rowSpan} 
                        className="py-3 px-4 border-r border-b border-gray-200 whitespace-nowrap font-medium text-gray-700 align-top bg-white"
                      >
                        {item.tanggal}
                      </td>
                    )}
                    <td className="py-3 px-4 border-r border-gray-100 font-medium text-gray-800">{item.namaBarang}</td>
                    <td className="py-3 px-4 border-r border-gray-100 text-gray-600">{item.siapaBeli}</td>
                    
                    <td className="py-3 px-4 border-r border-gray-100 text-center">{item.pcs || '-'}</td>
                    <td className="py-3 px-4 border-r border-gray-100 text-center">{item.sisaBarang || '-'}</td>
                    
                    <td className="py-3 px-4 border-r border-gray-100 text-right">{item.hargaSatuan ? formatRupiah(item.hargaSatuan) : '-'}</td>
                    <td className="py-3 px-4 border-r border-gray-100 text-right font-medium">{item.totalBarang ? formatRupiah(item.totalBarang) : '-'}</td>
                    
                    <td className="py-3 px-4 border-r border-gray-100 text-right text-emerald-700 bg-emerald-50/30">{item.pemasukanKkm ? formatRupiah(item.pemasukanKkm) : 'Rp -'}</td>
                    <td className="py-3 px-4 border-r border-gray-100 text-right text-emerald-700 bg-emerald-50/30">{item.pemasukanPribadi ? formatRupiah(item.pemasukanPribadi) : 'Rp -'}</td>
                    
                    <td className="py-3 px-4 border-r border-gray-100 text-right text-rose-700 bg-rose-50/30">{item.pengeluaranKkm ? formatRupiah(item.pengeluaranKkm) : 'Rp -'}</td>
                    <td className="py-3 px-4 border-r border-gray-100 text-right text-rose-700 bg-rose-50/30">{item.pengeluaranPribadi ? formatRupiah(item.pengeluaranPribadi) : 'Rp -'}</td>
                    
                    <td className="py-3 px-4 border-r border-gray-100 text-center">
                      {item.pengeluaranKkm && !item.is_rembes ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mx-auto w-max bg-rose-100 text-rose-700">
                          <Wallet className="w-3.5 h-3.5" />
                          Kas KKM
                        </div>
                      ) : (item.pengeluaranPribadi || item.is_rembes) ? (
                        <button 
                          onClick={() => toggleRembes(item)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mx-auto transition-colors ${
                            item.is_rembes 
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          {item.is_rembes ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                          {item.is_rembes ? 'Sudah' : 'Belum'}
                        </button>
                      ) : '-'}
                    </td>

                    <td className="py-3 px-4 border-r border-gray-100 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setEditingItem(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          disabled={isDeleting === item.id}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50" 
                          title="Hapus"
                        >
                          {isDeleting === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-extrabold text-slate-800 bg-slate-50/50">{formatRupiah(item.saldo)}</td>
                  </tr>
                  
                  {isLastOfDate && (dailyTotal.outKkm > 0 || dailyTotal.outPribadi > 0) && (
                    <tr className="bg-rose-50/40 font-semibold text-sm border-b-2 border-rose-100">
                      <td colSpan={10} className="py-2.5 px-4 border-r border-gray-200 text-right text-rose-900 tracking-wide uppercase text-xs">
                        Total Pengeluaran ({item.tanggal}):
                      </td>
                      <td className="py-2.5 px-4 border-r border-gray-200 text-right text-rose-800 bg-rose-100/50">
                        {dailyTotal.outKkm > 0 ? formatRupiah(dailyTotal.outKkm) : 'Rp -'}
                      </td>
                      <td className="py-2.5 px-4 border-r border-gray-200 text-right text-rose-800 bg-rose-100/50">
                        {dailyTotal.outPribadi > 0 ? formatRupiah(dailyTotal.outPribadi) : 'Rp -'}
                      </td>
                      <td className="py-2.5 px-4 border-r border-gray-200 bg-rose-100/50"></td>
                      <td className="py-2.5 px-4 text-right font-bold text-rose-900 bg-rose-100/80">
                         {formatRupiah(dailyTotal.outKkm + dailyTotal.outPribadi)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">Edit Transaksi</h2>
              <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Tanggal</label>
                  <input type="date" value={editingItem.tanggal} onChange={e => setEditingItem({...editingItem, tanggal: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Nama Barang</label>
                  <input type="text" value={editingItem.namaBarang} onChange={e => setEditingItem({...editingItem, namaBarang: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Siapa Beli</label>
                  <input type="text" value={editingItem.siapaBeli} onChange={e => setEditingItem({...editingItem, siapaBeli: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Pcs</label>
                  <input type="number" value={editingItem.pcs || ''} onChange={e => setEditingItem({...editingItem, pcs: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Harga Satuan (Rp)</label>
                  <input type="number" value={editingItem.hargaSatuan || ''} onChange={e => setEditingItem({...editingItem, hargaSatuan: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Total Barang (Rp)</label>
                  <input type="number" value={editingItem.totalBarang || ''} onChange={e => setEditingItem({...editingItem, totalBarang: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Pemasukan KKM</label>
                  <input type="number" value={editingItem.pemasukanKkm || ''} onChange={e => setEditingItem({...editingItem, pemasukanKkm: parseInt(e.target.value) || null})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Pengeluaran KKM</label>
                  <input type="number" value={editingItem.pengeluaranKkm || ''} onChange={e => setEditingItem({...editingItem, pengeluaranKkm: parseInt(e.target.value) || null})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Pemasukan Pribadi</label>
                  <input type="number" value={editingItem.pemasukanPribadi || ''} onChange={e => setEditingItem({...editingItem, pemasukanPribadi: parseInt(e.target.value) || null})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Pengeluaran Pribadi</label>
                  <input type="number" value={editingItem.pengeluaranPribadi || ''} onChange={e => setEditingItem({...editingItem, pengeluaranPribadi: parseInt(e.target.value) || null})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#466651]" />
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#466651] hover:bg-[#3a5643] transition-colors flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

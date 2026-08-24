"use client";

import { useState, useEffect } from "react";

type PiketSchedule = {
  day: string;
  date: string;
  masak: string[];
  kebersihan: string[];
};

type PiketCardProps = {
  data: PiketSchedule;
  isEditMode: boolean;
};

export default function PiketCard({ data, isEditMode }: PiketCardProps) {
  const [menu, setMenu] = useState({ pagi: "", siang: "", malam: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load menu from API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menu?date=${data.date}`);
        if (res.ok) {
          const result = await res.json();
          setMenu(result.data);
        }
      } catch (error) {
        console.error("Gagal load menu", error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchMenu();
  }, [data.date]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: data.date,
          ...menu,
        }),
      });
      alert(`Menu untuk ${data.day} berhasil disimpan!`);
    } catch {
      alert("Gagal menyimpan menu");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col gap-6 hover:bg-white/10 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
      {/* Header (Hari & Tanggal) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white tracking-wide">{data.day}</h3>
        <span className="text-xs font-semibold text-gray-300 bg-white/10 px-3 py-1.5 rounded-full tracking-wider uppercase">
          {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Petugas Section */}
      <div className="flex flex-col gap-4">
        {/* Kebersihan */}
        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-2 mb-3 text-blue-400">
            <i className="fa-solid fa-broom"></i>
            <h4 className="font-semibold text-sm tracking-wide">Tim Kebersihan</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            {data.kebersihan.map((name, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                <span className="leading-tight">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Masak */}
        <div className="bg-orange-900/20 p-4 rounded-xl border border-orange-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-2 mb-3 text-orange-400">
            <i className="fa-solid fa-fire-burner"></i>
            <h4 className="font-semibold text-sm tracking-wide">Tim Masak</h4>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            {data.masak.map((name, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></span>
                <span className="leading-tight">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu Makanan Section */}
      <div className="bg-emerald-900/20 p-5 rounded-xl border border-emerald-500/20 mt-auto relative overflow-hidden">
        <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-2 mb-4 text-emerald-400">
          <i className="fa-solid fa-utensils"></i>
          <h4 className="font-semibold text-sm tracking-wide">Menu Masakan</h4>
        </div>
        
        {!isLoaded ? (
          <div className="text-xs text-gray-500 animate-pulse">Memuat menu...</div>
        ) : isEditMode ? (
          <div className="space-y-3 relative z-10">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Pagi</label>
              <input 
                type="text" 
                value={menu.pagi} 
                onChange={(e) => setMenu({...menu, pagi: e.target.value})}
                placeholder="Contoh: Nasi Goreng" 
                className="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Siang</label>
              <input 
                type="text" 
                value={menu.siang} 
                onChange={(e) => setMenu({...menu, siang: e.target.value})}
                placeholder="Contoh: Ayam Geprek" 
                className="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Malam</label>
              <input 
                type="text" 
                value={menu.malam} 
                onChange={(e) => setMenu({...menu, malam: e.target.value})}
                placeholder="Contoh: Mie Rebus Telur" 
                className="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-500/20"
            >
              {isSaving ? "Menyimpan..." : "Simpan Menu"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pagi</span>
              <span className="text-sm font-medium text-gray-200 text-right">{menu.pagi || "-"}</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Siang</span>
              <span className="text-sm font-medium text-gray-200 text-right">{menu.siang || "-"}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Malam</span>
              <span className="text-sm font-medium text-gray-200 text-right">{menu.malam || "-"}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

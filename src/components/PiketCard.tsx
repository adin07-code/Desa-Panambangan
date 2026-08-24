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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5 hover:shadow-md transition-shadow">
      {/* Header (Hari & Tanggal) */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-gray-800">{data.day}</h3>
        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Petugas Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kebersihan */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-3 text-blue-700">
            <i className="fa-solid fa-broom"></i>
            <h4 className="font-semibold text-sm">Tim Kebersihan</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5">
            {data.kebersihan.map((name, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Masak */}
        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
          <div className="flex items-center gap-2 mb-3 text-orange-700">
            <i className="fa-solid fa-kitchen-set"></i>
            <h4 className="font-semibold text-sm">Tim Masak</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1.5">
            {data.masak.map((name, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu Makanan Section */}
      <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mt-auto">
        <div className="flex items-center gap-2 mb-3 text-emerald-700">
          <i className="fa-solid fa-utensils"></i>
          <h4 className="font-semibold text-sm">Menu Masakan</h4>
        </div>
        
        {!isLoaded ? (
          <div className="text-xs text-gray-400">Memuat menu...</div>
        ) : isEditMode ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Pagi</label>
              <input 
                type="text" 
                value={menu.pagi} 
                onChange={(e) => setMenu({...menu, pagi: e.target.value})}
                placeholder="Contoh: Nasi Goreng" 
                className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Siang</label>
              <input 
                type="text" 
                value={menu.siang} 
                onChange={(e) => setMenu({...menu, siang: e.target.value})}
                placeholder="Contoh: Ayam Geprek" 
                className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Malam</label>
              <input 
                type="text" 
                value={menu.malam} 
                onChange={(e) => setMenu({...menu, malam: e.target.value})}
                placeholder="Contoh: Mie Rebus Telur" 
                className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {isSaving ? "Menyimpan..." : "Simpan Menu"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2 rounded-lg border border-emerald-50">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pagi</span>
              <span className="text-sm font-medium text-gray-700">{menu.pagi || "-"}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-emerald-50">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Siang</span>
              <span className="text-sm font-medium text-gray-700">{menu.siang || "-"}</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-emerald-50">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Malam</span>
              <span className="text-sm font-medium text-gray-700">{menu.malam || "-"}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

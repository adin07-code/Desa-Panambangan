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
    <div className="bg-[#567a62] rounded-3xl p-5 flex flex-col gap-4 shadow-lg hover:-translate-y-1 transition-transform duration-300 relative">
      {/* Decorative Tapes */}
      <div className="absolute -top-3 -left-3 w-12 h-6 bg-[#d1a798]/80 -rotate-45 z-10"></div>
      <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-[#d1a798]/80 -rotate-45 z-10"></div>

      {/* Header (Hari & Tanggal) */}
      <div className="flex flex-col items-center justify-center text-center pb-2">
        <h3 className="text-3xl font-cute font-bold text-[#FDFBF5] tracking-widest uppercase uppercase">{data.day}</h3>
        <span className="text-xs font-bold text-[#a4c1ae] tracking-wider uppercase mt-1">
          {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Petugas Section */}
      <div className="bg-[#Fdfbf2] rounded-2xl p-4 flex flex-col gap-3 flex-grow shadow-inner">
        {/* Kebersihan & Masak */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-cute font-bold text-[#466651] text-xl border-b-2 border-[#567a62]/20 mb-2">Kebersihan</h4>
            <ol className="text-sm font-semibold text-[#567a62] space-y-1 ml-4 list-decimal marker:text-[#8ea596]">
              {data.kebersihan.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-cute font-bold text-[#466651] text-xl border-b-2 border-[#567a62]/20 mb-2">Masak</h4>
            <ol className="text-sm font-semibold text-[#567a62] space-y-1 ml-4 list-decimal marker:text-[#8ea596]">
              {data.masak.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Menu Makanan Section */}
      <div className="bg-[#466651] rounded-2xl p-4 shadow-inner mt-2">
        <h4 className="font-cute font-bold text-[#FDFBF5] text-xl mb-3 text-center tracking-wide">Menu Masakan</h4>
        
        {!isLoaded ? (
          <div className="text-xs text-center text-[#a4c1ae] animate-pulse">Memuat...</div>
        ) : isEditMode ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#a4c1ae] mb-1">Pagi</label>
              <input 
                type="text" 
                value={menu.pagi} 
                onChange={(e) => setMenu({...menu, pagi: e.target.value})}
                className="w-full text-sm px-3 py-2 bg-[#FDFBF5] border-2 border-[#567a62] text-[#466651] font-semibold rounded-lg focus:outline-none focus:border-[#d1a798]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#a4c1ae] mb-1">Siang</label>
              <input 
                type="text" 
                value={menu.siang} 
                onChange={(e) => setMenu({...menu, siang: e.target.value})}
                className="w-full text-sm px-3 py-2 bg-[#FDFBF5] border-2 border-[#567a62] text-[#466651] font-semibold rounded-lg focus:outline-none focus:border-[#d1a798]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#a4c1ae] mb-1">Malam</label>
              <input 
                type="text" 
                value={menu.malam} 
                onChange={(e) => setMenu({...menu, malam: e.target.value})}
                className="w-full text-sm px-3 py-2 bg-[#FDFBF5] border-2 border-[#567a62] text-[#466651] font-semibold rounded-lg focus:outline-none focus:border-[#d1a798]"
              />
            </div>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full mt-3 bg-[#d1a798] hover:bg-[#c09787] text-[#466651] text-sm font-bold py-2 rounded-lg transition-all"
            >
              {isSaving ? "Menyimpan..." : "Simpan Menu"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col border-b border-[#567a62] pb-1">
              <span className="text-[10px] font-bold text-[#a4c1ae] uppercase tracking-widest">Pagi</span>
              <span className="text-sm font-bold text-[#FDFBF5]">{menu.pagi || "-"}</span>
            </div>
            <div className="flex flex-col border-b border-[#567a62] pb-1">
              <span className="text-[10px] font-bold text-[#a4c1ae] uppercase tracking-widest">Siang</span>
              <span className="text-sm font-bold text-[#FDFBF5]">{menu.siang || "-"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#a4c1ae] uppercase tracking-widest">Malam</span>
              <span className="text-sm font-bold text-[#FDFBF5]">{menu.malam || "-"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

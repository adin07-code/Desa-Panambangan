"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PiketCard from "@/components/PiketCard";

type PiketSchedule = {
  day: string;
  date: string;
  masak: string[];
  kebersihan: string[];
  menuSiang: string;
  menuSore: string;
};

export default function PiketPage() {
  const [schedule, setSchedule] = useState<PiketSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fetch schedule from Google Sheets via API
    const fetchSchedule = async () => {
      try {
        const res = await fetch("/api/piket");
        if (res.ok) {
          const result = await res.json();
          setSchedule(result.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat jadwal piket", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSchedule();

    // Real-time clock interval
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-grid-paper text-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-8 relative">
          {/* Back Button */}
          <div className="mb-4 md:absolute md:top-2 md:-left-14">
            <Link href="/" className="inline-flex w-10 h-10 items-center justify-center bg-[#567a62] text-[#FDFBF5] rounded-full shadow-md hover:scale-105 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center text-center gap-3">
            <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl font-cute text-[#466651] tracking-wide uppercase drop-shadow-sm">Jadwal Piket KKM</h1>
            <h2 className="text-[1.6rem] sm:text-4xl md:text-5xl font-cute text-[#466651] tracking-wide uppercase mt-[-10px] whitespace-nowrap">Masak & Kebersihan</h2>
            
            <div className="flex items-center gap-2 bg-[#567a62] text-[#FDFBF5] px-4 py-1.5 rounded-full shadow-sm mt-2">
              <i className="fa-regular fa-clock"></i>
              <span className="text-sm font-bold tracking-widest w-20 text-center">
                {mounted ? currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "..."}
              </span>
            </div>
            
            <a 
              href="https://docs.google.com/spreadsheets/d/14tDYF-syuIyBvA2AcZA0wxTTiAokKl2g/edit?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-[#d89f4b] text-[#466651] hover:bg-[#c68e3e] px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
            >
              <i className="fa-solid fa-file-excel mr-2"></i> Buka Google Sheets
            </a>
          </div>
        </div>

        {/* Schedule Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#567a62]"></div>
          </div>
        ) : schedule.length === 0 ? (
          <div className="text-center py-20 text-[#466651] font-semibold">
            Belum ada jadwal piket yang tersedia di Google Sheets.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {schedule.map((dayData, idx) => (
              <PiketCard key={idx} data={dayData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

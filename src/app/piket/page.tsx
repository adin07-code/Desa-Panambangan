"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWeeklySchedule } from "@/utils/piket";
import PiketCard from "@/components/PiketCard";

export default function PiketPage() {
  const [schedule, setSchedule] = useState<ReturnType<typeof getWeeklySchedule>>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate schedule based on current date
    const currentSchedule = getWeeklySchedule(new Date());
    setSchedule(currentSchedule);

    // Real-time clock interval
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLoginKonsumsi = () => {
    if (showPasswordInput) {
      // Mock password untuk demo
      if (passwordInput === "konsumsi14") {
        setIsEditMode(true);
        setShowPasswordInput(false);
        setPasswordInput("");
      } else {
        alert("Password salah!");
      }
    } else {
      setShowPasswordInput(true);
    }
  };

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
            <h1 className="text-5xl md:text-6xl font-cute text-[#466651] tracking-wide uppercase drop-shadow-sm">Jadwal Piket KKM</h1>
            <h2 className="text-4xl md:text-5xl font-cute text-[#466651] tracking-wide uppercase mt-[-10px]">Masak dan Kebersihan</h2>
            
            <div className="flex items-center gap-2 bg-[#567a62] text-[#FDFBF5] px-4 py-1.5 rounded-full shadow-sm mt-2">
              <i className="fa-regular fa-clock"></i>
              <span className="text-sm font-bold tracking-widest w-20 text-center">
                {mounted ? currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "..."}
              </span>
            </div>
          </div>
          
          {/* Mode Konsumsi (Mini CMS Toggle) */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {!isEditMode ? (
              <div className="flex items-center gap-2">
                {showPasswordInput && (
                  <input
                    type="password"
                    placeholder="Password Konsumsi"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="text-sm px-4 py-2 rounded-xl bg-white border-2 border-[#466651] text-[#466651] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#567a62] w-44 transition-all font-semibold"
                  />
                )}
                <button 
                  onClick={handleLoginKonsumsi}
                  className="bg-[#567a62] text-[#FDFBF5] hover:bg-[#466651] px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <i className="fa-solid fa-lock"></i>
                  {showPasswordInput ? "Login" : "Edit Menu"}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditMode(false)}
                className="bg-red-500 text-white hover:bg-red-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <i className="fa-solid fa-lock-open"></i> Selesai Edit
              </button>
            )}
          </div>
        </div>

        {/* Schedule Grid - Dikurangi kolomnya agar card lebih lebar dan lega */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {schedule.map((dayData, idx) => (
            <PiketCard key={idx} data={dayData} isEditMode={isEditMode} />
          ))}
        </div>

      </div>
    </div>
  );
}

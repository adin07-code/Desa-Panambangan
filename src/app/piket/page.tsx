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

  useEffect(() => {
    // Generate schedule based on current date
    const currentSchedule = getWeeklySchedule(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSchedule(currentSchedule);
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
    <div className="min-h-screen bg-[#0c0c0c] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <Link href="/" className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all shrink-0">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">Jadwal Piket KKM</h1>
              <p className="text-gray-400 mt-1 text-sm md:text-base">Rotasi otomatis tugas Masak & Kebersihan Harian</p>
            </div>
          </div>
          
          {/* Mode Konsumsi (Mini CMS Toggle) */}
          <div className="flex items-center gap-2">
            {!isEditMode ? (
              <div className="flex items-center gap-2">
                {showPasswordInput && (
                  <input
                    type="password"
                    placeholder="Password Konsumsi"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="text-sm px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 backdrop-blur-sm transition-all"
                  />
                )}
                <button 
                  onClick={handleLoginKonsumsi}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-lock"></i>
                  {showPasswordInput ? "Login" : "Edit Menu"}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditMode(false)}
                className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
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

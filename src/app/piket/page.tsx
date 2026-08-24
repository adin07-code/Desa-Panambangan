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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors shrink-0">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Jadwal Piket KKM</h1>
              <p className="text-gray-500 mt-1">Rotasi otomatis tugas Masak & Kebersihan Harian</p>
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
                    className="text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-40"
                  />
                )}
                <button 
                  onClick={handleLoginKonsumsi}
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-lock"></i>
                  {showPasswordInput ? "Login" : "Edit Menu"}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditMode(false)}
                className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-lock-open"></i> Selesai Edit
              </button>
            )}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schedule.map((dayData, idx) => (
            <PiketCard key={idx} data={dayData} isEditMode={isEditMode} />
          ))}
        </div>

      </div>
    </div>
  );
}

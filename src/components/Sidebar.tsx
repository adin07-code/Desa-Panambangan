"use client";

import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 0);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const formatDay = (date: Date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()];
  };

  const formatMonth = (date: Date) => {
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return months[date.getMonth()];
  };

  const formattedDate = time ? `${formatDay(time)}, ${time.getDate()} ${formatMonth(time)} ${time.getFullYear()}` : "Memuat...";
  
  const pad = (num: number) => num.toString().padStart(2, "0");
  const formattedTime = time ? `${pad(time.getHours())} : ${pad(time.getMinutes())} : ${pad(time.getSeconds())}` : "-- : -- : --";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Date Widget */}
      <div className="bg-[#dc3545] text-white text-center py-3 font-bold shadow" suppressHydrationWarning>
        {formattedDate}<br/>
        {formattedTime}
      </div>

      {/* Kategori */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4">KATEGORI</h3>
        <ul className="flex flex-col space-y-2 text-sm text-gray-600">
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Berita Desa
          </li>
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Edukasi Lingkungan
          </li>
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Program Kerja KKM
          </li>
        </ul>
      </div>

      {/* Statistik Penduduk */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4 flex items-center">
          <span className="mr-2">📊</span> STATISTIK PENDUDUK
        </h3>
        <div className="border border-gray-200 p-4 shadow-sm relative bg-white">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-700">Jumlah Penduduk</span>
            <Menu className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* Fake Bar Chart */}
          <div className="flex justify-around items-end h-40 border-l border-b border-gray-300 pb-0 pl-1 mb-10">
            
            {/* Bar 1 */}
            <div className="flex flex-col justify-end items-center w-1/4 h-full relative">
              <div className="w-full bg-[#7cb5ec] relative group" style={{ height: "50%" }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">2.112</span>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 -rotate-45 whitespace-nowrap">LAKI-LAKI</span>
            </div>
            
            {/* Bar 2 */}
            <div className="flex flex-col justify-end items-center w-1/4 h-full relative">
              <div className="w-full bg-[#434348] relative group" style={{ height: "60%" }}>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">2.508</span>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 -rotate-45 whitespace-nowrap">PEREMPUAN</span>
            </div>

            {/* Bar 3 */}
            <div className="flex flex-col justify-end items-center w-1/4 h-full relative">
              <div className="w-full bg-[#90ed7d] relative group" style={{ height: "40%" }}>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">1.655</span>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 -rotate-45 whitespace-nowrap">KEPALA KEL.</span>
            </div>

            {/* Bar 4 */}
            <div className="flex flex-col justify-end items-center w-1/4 h-full relative">
              <div className="w-full bg-[#f7a35c] relative group" style={{ height: "100%" }}>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">4.171</span>
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 -rotate-45 whitespace-nowrap">TOTAL</span>
            </div>

          </div>
          
          {/* Y-Axis Labels Fake */}
          <div className="absolute left-1 top-12 flex flex-col justify-between h-32 text-[10px] text-gray-400">
            <span>6k</span>
            <span>4k</span>
            <span>2k</span>
            <span>0</span>
          </div>
          <div className="absolute left-[-15px] top-24 -rotate-90 text-[11px] text-gray-500">Jumlah</div>
          
          <div className="text-right mt-6 text-[9px] text-gray-400">Highcharts.com</div>
        </div>
      </div>

      {/* Agenda */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4 flex items-center">
          <span className="mr-2">📅</span> AGENDA
        </h3>
        <p className="text-sm text-gray-500 text-center py-4 border border-gray-100 bg-gray-50">Belum ada agenda terdekat.</p>
      </div>

    </div>
  );
}

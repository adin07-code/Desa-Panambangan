/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AbsensiData = {
  id: string;
  timestamp: string;
  nama_lengkap: string;
  nim: string;
  prodi: string;
  email: string;
  receivedAt: string;
};

export default function AbsensiPage() {
  const [data, setData] = useState<AbsensiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchAbsensi = async () => {
      try {
        const res = await fetch(`/api/absensi?t=${new Date().getTime()}`, { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          setData(result.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data absensi:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ambil data pertama kali
    fetchAbsensi();

    // Polling setiap 5 detik untuk mendapatkan data real-time
    const intervalData = setInterval(() => {
      fetchAbsensi();
    }, 5000);

    // Real-time clock interval
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalData);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF5] text-[#466651] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Glow Ornaments - Earthy Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#567a62]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#d89f4b]/10 blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
          <div className="flex items-start gap-5">
            <Link href="/" className="w-12 h-12 flex items-center justify-center bg-white/50 backdrop-blur-md border border-[#567a62]/20 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all shrink-0">
              <ArrowLeft className="w-5 h-5 text-[#466651]" />
            </Link>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#466651] tracking-tight">Live Absensi</h1>
                <div className="flex items-center gap-2 bg-white/60 border border-[#567a62]/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm w-max mt-2 md:mt-0">
                  <i className="fa-regular fa-clock text-[#d89f4b]"></i>
                  <span className="text-sm font-bold text-[#466651] tracking-widest w-20 text-center">
                    {mounted ? currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "..."}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[#567a62] text-sm md:text-base">
                <i className="fa-regular fa-calendar text-[#567a62]"></i>
                <span className="font-medium tracking-wide">
                  {mounted ? currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "..."}
                </span>
              </div>
              <p className="text-[#567a62]/80 mt-2 text-xs md:text-sm font-medium">Daftar mahasiswa yang sudah melakukan presensi hari ini.</p>
            </div>
          </div>
          
          {/* Tombol Tampilkan QR Absensi */}
          <button 
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 bg-[#567a62] hover:bg-[#466651] text-[#FDFBF5] border border-[#466651] px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <i className="fa-solid fa-qrcode"></i>
            Tampilkan QR Absensi
          </button>
        </div>

        {/* Modal QR Code */}
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="bg-[#FDFBF5] border-2 border-[#567a62] rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center relative text-center">
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#567a62]/10 hover:bg-[#567a62]/20 text-[#466651] transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <h3 className="text-xl font-extrabold text-[#466651] mb-2 mt-2">QR Code Absensi</h3>
              <p className="text-[#567a62] text-sm mb-6 font-medium">Scan QR ini untuk mengisi Google Form Absensi Harian KKM.</p>
              
              <div className="bg-white p-2 rounded-2xl w-64 h-64 mb-4 flex items-center justify-center border-2 border-[#567a62]/20 shadow-md">
                <div className="relative w-full h-full">
                  <img
                    src="/qr-absensi.png"
                    alt="QR Code Absensi"
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=QR+Absensi+Belum+Ada";
                    }}
                  />
                </div>
              </div>
              <p className="text-[#d89f4b] font-bold text-sm">Pastikan isi form dengan benar!</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-[#567a62]/20 overflow-hidden relative z-10">
          {loading && data.length === 0 ? (
            <div className="p-16 text-center">
               <div className="w-8 h-8 border-4 border-[#567a62] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-[#567a62] font-semibold tracking-wider text-sm">Menarik data dari server...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FDFBF5] border-2 border-[#567a62]/20 mb-5 shadow-inner">
                <i className="fa-regular fa-calendar-xmark text-3xl text-[#567a62]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#466651]">Belum ada absen hari ini</h3>
              <p className="text-[#567a62]/80 mt-2 max-w-md mx-auto text-sm font-medium">Data akan muncul secara real-time setelah mahasiswa melakukan scan QR dan mengisi form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#567a62] border-b border-[#466651]">
                    <th className="p-5 text-sm font-bold text-[#FDFBF5] tracking-wider">No</th>
                    <th className="p-5 text-sm font-bold text-[#FDFBF5] tracking-wider">Waktu</th>
                    <th className="p-5 text-sm font-bold text-[#FDFBF5] tracking-wider">Nama Lengkap</th>
                    <th className="p-5 text-sm font-bold text-[#FDFBF5] tracking-wider">NIM</th>
                    <th className="p-5 text-sm font-bold text-[#FDFBF5] tracking-wider">Program Studi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#567a62]/10 bg-white/40">
                  {data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-[#FDFBF5] transition-colors group">
                      <td className="p-5 text-sm text-[#567a62] font-bold group-hover:text-[#466651] transition-colors">{index + 1}</td>
                      <td className="p-5 text-sm font-extrabold text-[#466651]">
                        {new Date(item.receivedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-[#466651] tracking-wide">{item.nama_lengkap}</div>
                        <div className="text-xs font-semibold text-[#567a62]/70 mt-0.5">{item.email}</div>
                      </td>
                      <td className="p-5 text-sm text-[#567a62] font-bold">{item.nim}</td>
                      <td className="p-5 text-sm text-[#567a62] font-bold">{item.prodi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

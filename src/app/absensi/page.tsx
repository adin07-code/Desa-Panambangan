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
    <div className="min-h-screen bg-[#0c0c0c] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
          <div className="flex items-start gap-5">
            <Link href="/" className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all shrink-0">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">Live Absensi</h1>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg w-max mt-2 md:mt-0">
                  <i className="fa-regular fa-clock text-purple-400"></i>
                  <span className="text-sm font-bold text-white tracking-widest w-20 text-center">
                    {mounted ? currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "..."}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm md:text-base">
                <i className="fa-regular fa-calendar text-blue-400"></i>
                <span className="font-medium tracking-wide">
                  {mounted ? currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "..."}
                </span>
              </div>
              <p className="text-gray-500 mt-2 text-xs md:text-sm">Daftar mahasiswa yang sudah melakukan presensi hari ini.</p>
            </div>
          </div>
          
          {/* Tombol Tampilkan QR Absensi */}
          <button 
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <i className="fa-solid fa-qrcode"></i>
            Tampilkan QR Absensi
          </button>
        </div>

        {/* Modal QR Code */}
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center relative text-center">
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <h3 className="text-xl font-bold text-white mb-2 mt-2">QR Code Absensi</h3>
              <p className="text-gray-400 text-sm mb-6">Scan QR ini untuk mengisi Google Form Absensi Harian KKM.</p>
              
              <div className="bg-white p-2 rounded-2xl w-64 h-64 mb-4 flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
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
              <p className="text-purple-400 font-semibold text-sm">Pastikan isi form dengan benar!</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden relative z-10">
          {loading && data.length === 0 ? (
            <div className="p-16 text-center">
               <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
               <p className="text-gray-400 tracking-wider text-sm">Menarik data dari server...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <i className="fa-regular fa-calendar-xmark text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-200">Belum ada absen hari ini</h3>
              <p className="text-gray-400 mt-2 max-w-md mx-auto text-sm">Data akan muncul secara real-time setelah mahasiswa melakukan scan QR dan mengisi form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-5 text-sm font-semibold text-gray-400 tracking-wider">No</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 tracking-wider">Waktu</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 tracking-wider">Nama Lengkap</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 tracking-wider">NIM</th>
                    <th className="p-5 text-sm font-semibold text-gray-400 tracking-wider">Program Studi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5 text-sm text-gray-500 font-medium group-hover:text-gray-300 transition-colors">{index + 1}</td>
                      <td className="p-5 text-sm font-bold text-gray-200">
                        {new Date(item.receivedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-gray-200 tracking-wide">{item.nama_lengkap}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.email}</div>
                      </td>
                      <td className="p-5 text-sm text-gray-400 font-medium">{item.nim}</td>
                      <td className="p-5 text-sm text-gray-400 font-medium">{item.prodi}</td>
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

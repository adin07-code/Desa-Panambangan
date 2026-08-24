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

  useEffect(() => {
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
    const interval = setInterval(() => {
      fetchAbsensi();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Absensi KKM</h1>
              <p className="text-gray-500 mt-1">Daftar mahasiswa yang sudah melakukan presensi hari ini.</p>
            </div>
          </div>
          
          {/* Tombol Tampilkan QR Absensi */}
          <button 
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 bg-purple-100 text-purple-700 hover:bg-purple-200 px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <i className="fa-solid fa-qrcode"></i>
            Tampilkan QR Absensi
          </button>
        </div>

        {/* Modal QR Code */}
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center relative text-center">
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">QR Code Absensi</h3>
              <p className="text-gray-500 text-sm mb-6">Scan QR ini untuk mengisi Google Form Absensi Harian KKM.</p>
              
              <div className="bg-gray-50 p-2 rounded-2xl w-64 h-64 mb-4 flex items-center justify-center border border-gray-100">
                <div className="relative w-full h-full">
                  <img
                    src="/qr-absensi.png"
                    alt="QR Code Absensi"
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      // Fallback jika user belum memasukkan gambar qr-absensi.png
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=QR+Absensi+Belum+Ada";
                    }}
                  />
                </div>
              </div>
              <p className="text-purple-600 font-semibold text-sm">Pastikan isi form dengan benar!</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading && data.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Memuat data absensi...</div>
          ) : data.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <i className="fa-regular fa-calendar-xmark text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Belum ada absen hari ini</h3>
              <p className="text-gray-500 mt-1">Data akan muncul secara real-time setelah mahasiswa melakukan scan QR.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-sm font-semibold text-gray-600">No</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Waktu</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Nama Lengkap</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">NIM</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Program Studi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">
                        {new Date(item.receivedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{item.nama_lengkap}</div>
                        <div className="text-xs text-gray-500">{item.email}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{item.nim}</td>
                      <td className="p-4 text-sm text-gray-600">{item.prodi}</td>
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

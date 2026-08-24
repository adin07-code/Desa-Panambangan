"use client";

import { useState } from "react";
import Image from "next/image";

export default function QRButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol QR di pojok kanan atas */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
        title="Tampilkan QR Code"
      >
        <i className="fa-solid fa-qrcode text-xl"></i>
      </button>

      {/* Modal Popup QR */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[#111111] border border-white/20 rounded-3xl p-6 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center relative text-center">
            
            {/* Tombol Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <h3 className="text-xl font-bold text-white mb-2 mt-2">Scan QR Code</h3>
            <p className="text-gray-400 text-sm mb-6">Scan QR Code ini untuk mengunjungi Portal KKM 14 Desa Panambangan.</p>

            <div className="bg-white p-3 rounded-2xl w-64 h-64 mb-4 flex items-center justify-center">
              {/* Gambar QR Code - menggunakan /qr-utama.png */}
              <div className="relative w-full h-full">
                <Image
                  src="/qr-utama.png"
                  alt="QR Code KKM 14 Desa Panambangan"
                  fill
                  className="object-contain rounded-xl"
                  unoptimized
                />
              </div>
            </div>

            <p className="text-emerald-400 font-semibold text-sm">Panambangan Berkarya</p>
          </div>
        </div>
      )}
    </>
  );
}

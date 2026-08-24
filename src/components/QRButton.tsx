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
        className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/50 backdrop-blur-md border border-[#567a62]/20 rounded-full flex items-center justify-center text-[#466651] hover:bg-white hover:scale-110 transition-all shadow-md"
        title="Tampilkan QR Code"
      >
        <i className="fa-solid fa-qrcode text-xl"></i>
      </button>

      {/* Modal Popup QR */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-[#FDFBF5] border-2 border-[#567a62] rounded-3xl p-6 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center relative text-center">
            
            {/* Tombol Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#567a62]/10 hover:bg-[#567a62]/20 text-[#466651] transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <h3 className="text-xl font-extrabold text-[#466651] mb-2 mt-2">Scan QR Code</h3>
            <p className="text-[#567a62] text-sm mb-6 font-medium">Scan QR Code ini untuk mengunjungi Portal KKM 14 Desa Panambangan.</p>

            <div className="bg-white p-3 rounded-2xl w-64 h-64 mb-4 flex items-center justify-center border-2 border-[#567a62]/20 shadow-md">
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

            <p className="text-[#d89f4b] font-bold text-sm">Panambangan Berkarya</p>
          </div>
        </div>
      )}
    </>
  );
}

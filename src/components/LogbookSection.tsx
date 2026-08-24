import React from 'react';

// ==============================================
// OPSI 1: Logbook Card (Modern & Minimalis)
// Cocok dipasang di halaman portal atau dashboard
// ==============================================
export function LogbookCard() {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 max-w-sm w-full flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <i className="fa-solid fa-file-signature text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Pengumpulan Logbook</h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Upload logbook kegiatan harian Anda ke folder Google Drive resmi KKM 14.
      </p>
      <a 
        href="https://drive.google.com/drive/folders/1cEQ3LK5ovNZ0swVoM5X29TTWPeMj7Gyd" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
      >
        <span>Kumpulkan di Sini</span>
        <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
      </a>
    </div>
  );
}

// ==============================================
// OPSI 2: Logbook Embed (Iframe View)
// Cocok jika Anda ingin memperlihatkan isi folder secara langsung di halaman web
// ==============================================
export function LogbookEmbed() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      {/* Header Embed */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="fa-brands fa-google-drive text-[#0F9D58] text-xl"></i>
          <div>
            <h3 className="font-semibold text-gray-800">Folder Logbook KKM</h3>
            <p className="text-xs text-gray-500">Lihat atau upload file secara langsung</p>
          </div>
        </div>
        <a 
          href="https://drive.google.com/drive/folders/1cEQ3LK5ovNZ0swVoM5X29TTWPeMj7Gyd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Buka di Tab Baru <i className="fa-solid fa-chevron-right text-xs"></i>
        </a>
      </div>
      
      {/* Iframe Area */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-50">
        <iframe 
          // Format embed Google Drive: ganti URL /drive/folders/... dengan /embeddedfolderview?id=...
          src="https://drive.google.com/embeddedfolderview?id=1cEQ3LK5ovNZ0swVoM5X29TTWPeMj7Gyd#list" 
          className="absolute top-0 left-0 w-full h-full border-0"
          title="Folder Logbook Google Drive"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function PortalPage() {
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0c0c0c;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .bg-slider {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: -1;
            background-color: #0c0c0c;
            overflow: hidden;
        }
        .bg-slide {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            animation: slide-anim 24s infinite linear;
            transform: scale(1.05);
        }
        .bg-slide-1 {
            background-image: linear-gradient(to bottom, rgba(12, 12, 12, 0.6), rgba(12, 12, 12, 0.95)), url('/bg-desa.png');
            animation-delay: 0s;
        }
        .bg-slide-2 {
            background-image: linear-gradient(to bottom, rgba(12, 12, 12, 0.6), rgba(12, 12, 12, 0.95)), url('/bg-kembang-tahu.png');
            animation-delay: 8s;
        }
        .bg-slide-3 {
            background-image: linear-gradient(to bottom, rgba(12, 12, 12, 0.6), rgba(12, 12, 12, 0.95)), url('/bg-desa-2.png');
            animation-delay: 16s;
        }
        @keyframes slide-anim {
            0% { opacity: 0; transform: scale(1.05); }
            10% { opacity: 1; transform: scale(1.02); }
            33% { opacity: 1; transform: scale(1.0); }
            43% { opacity: 0; transform: scale(1.05); }
            100% { opacity: 0; transform: scale(1.05); }
        }
        .link-card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            border-left: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .link-card:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 0.4);
        }
        .icon-box {
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s ease;
        }
        .link-card:hover .icon-box {
            background: rgba(0, 0, 0, 0.4);
            transform: scale(1.1) rotate(5deg);
        }
        .profile-img {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
        }
      `}} />
      <div className="bg-slider">
          <div className="bg-slide bg-slide-1"></div>
          <div className="bg-slide bg-slide-2"></div>
          <div className="bg-slide bg-slide-3"></div>
      </div>
      <div className="flex flex-col items-center min-h-screen py-12 px-4 relative z-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-10 w-full max-w-md">
              <div className="profile-img w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 mb-5 bg-white flex items-center justify-center shadow-2xl relative p-2">
                  <img src="/logo.png" alt="Logo Desa Panambangan" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight text-center">KKM 14 DESA PANAMBANGAN</h1>
              <p className="text-gray-400 text-sm font-medium text-center">Pusat Informasi & Potensi Desa</p>
          </div>

          {/* Links Section */}
          <div className="w-full max-w-[480px] flex flex-col gap-4">
              
              {/* Button 1: Web Edukasi */}
              <Link href="/blog" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-emerald-400">
                          <i className="fa-solid fa-globe text-2xl"></i>
                      </div>
                      <span className="font-semibold text-gray-200 group-hover:text-white text-[15px]">Web Blog Edukasi</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-gray-600 group-hover:text-gray-400 transition-colors"></i>
              </Link>

              {/* Button 2: UMKM Kembang Tahu */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-yellow-400">
                          <i className="fa-solid fa-store text-2xl"></i>
                      </div>
                      <span className="font-semibold text-gray-200 group-hover:text-white text-[15px]">UMKM Kembang Tahu</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-gray-600 group-hover:text-gray-400 transition-colors"></i>
              </a>

              {/* Button 3: Mapping */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-400">
                          <i className="fa-solid fa-map-location-dot text-2xl"></i>
                      </div>
                      <span className="font-semibold text-gray-200 group-hover:text-white text-[15px]">Peta Pemetaan (Mapping)</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-gray-600 group-hover:text-gray-400 transition-colors"></i>
              </a>

              {/* Button 4: Pengelolaan Sampah */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-green-500">
                          <i className="fa-solid fa-recycle text-2xl"></i>
                      </div>
                      <span className="font-semibold text-gray-200 group-hover:text-white text-[15px]">Pengelolaan Sampah</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-gray-600 group-hover:text-gray-400 transition-colors"></i>
              </a>

          </div>

          {/* Footer */}
          <div className="mt-16 text-center flex flex-col items-center">
              <p className="text-gray-500 text-sm italic mb-4 tracking-wide">"Panambangan Berkarya"</p>
              
              {/* Social Media Links */}
              <div className="flex gap-5 mb-4">
                  <a href="https://www.instagram.com/kkmpanambangan14_umc?igsh=endneGxnNXZqNTJ5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110">
                      <i className="fa-brands fa-instagram text-2xl"></i>
                  </a>
                  <a href="https://www.tiktok.com/@kkm.panambangan_umc?_r=1&_t=ZS-98S89Bdo4of" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                      <i className="fa-brands fa-tiktok text-2xl"></i>
                  </a>
              </div>

              <p className="text-gray-600 text-xs font-medium">© KKM UMC 2026 - KKM 14</p>
          </div>
      </div>
    </>
  );
}

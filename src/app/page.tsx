import Link from 'next/link';
import Image from 'next/image';
import QRButton from '@/components/QRButton';
import { LogbookCard } from '@/components/LogbookSection';

export default function PortalPage() {
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #FDFBF5;
            color: #466651;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .bg-slider {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100vh;
            z-index: -1;
            background-color: #FDFBF5;
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
            background-image: linear-gradient(to bottom, rgba(253, 251, 245, 0.8), rgba(253, 251, 245, 1)), url('/bg-desa.png');
            animation-delay: 0s;
        }
        .bg-slide-2 {
            background-image: linear-gradient(to bottom, rgba(253, 251, 245, 0.8), rgba(253, 251, 245, 1)), url('/bg-kembang-tahu.png');
            animation-delay: 8s;
        }
        .bg-slide-3 {
            background-image: linear-gradient(to bottom, rgba(253, 251, 245, 0.8), rgba(253, 251, 245, 1)), url('/bg-desa-2.png');
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
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(86, 122, 98, 0.15);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 32px 0 rgba(86, 122, 98, 0.05);
        }
        .link-card:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(86, 122, 98, 0.3);
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 35px 0 rgba(86, 122, 98, 0.15);
        }
        .icon-box {
            background: rgba(86, 122, 98, 0.05);
            border: 1px solid rgba(86, 122, 98, 0.1);
            transition: all 0.4s ease;
        }
        .link-card:hover .icon-box {
            background: rgba(86, 122, 98, 0.15);
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
          <QRButton />
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-10 w-full max-w-md">
              <div className="profile-img w-28 h-28 rounded-full overflow-hidden border-4 border-[#567a62]/20 mb-5 bg-white flex items-center justify-center shadow-xl relative p-2">
                  <Image src="/logo.png" alt="Logo Desa Panambangan" width={96} height={96} className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold mb-2 tracking-tight text-center text-[#466651]">KKM 14 DESA PANAMBANGAN</h1>
              <p className="text-[#567a62] text-sm font-semibold text-center">Pusat Informasi & Potensi Desa</p>
          </div>

          {/* Links Section */}
          <div className="w-full max-w-[480px] flex flex-col gap-4">
              
              {/* Button 1: Web Edukasi */}
              <Link href="/blog" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-globe text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">Web Blog Edukasi</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </Link>

              {/* Button 2: UMKM Kembang Tahu */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-store text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">UMKM Kembang Tahu</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </a>

              {/* Button 3: Mapping */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-map-location-dot text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">Peta Pemetaan (Mapping)</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </a>

              {/* Button 4: Pengelolaan Sampah */}
              <a href="#" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-recycle text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">Pengelolaan Sampah</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </a>

              {/* Button 5: Jadwal Piket KKM */}
              <Link href="/piket" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-clipboard-list text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">Jadwal Piket KKM</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </Link>

              {/* Button 6: Live Absensi */}
              <Link href="/absensi" className="link-card flex items-center justify-between p-2 pr-4 rounded-2xl group cursor-pointer w-full text-left">
                  <div className="flex items-center gap-4">
                      <div className="icon-box w-14 h-14 rounded-xl flex items-center justify-center text-[#567a62] group-hover:text-[#d89f4b]">
                          <i className="fa-solid fa-calendar-check text-2xl"></i>
                      </div>
                      <span className="font-bold text-[#466651] group-hover:text-[#d89f4b] text-[15px] transition-colors">Live Absensi Harian</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-sm text-[#567a62]/50 group-hover:text-[#d89f4b] transition-colors"></i>
              </Link>

              {/* Pengumpulan Logbook Card */}
              <div className="mt-4 flex justify-center">
                  <LogbookCard />
              </div>

          </div>

          {/* Footer */}
          <div className="mt-16 text-center flex flex-col items-center relative z-10">
              <p className="text-[#567a62] font-semibold text-sm italic mb-4 tracking-wide">&ldquo;Panambangan Berkarya&rdquo;</p>
              
              {/* Social Media Links */}
              <div className="flex gap-5 mb-4">
                  <a href="https://www.instagram.com/kkmpanambangan14_umc?igsh=endneGxnNXZqNTJ5" target="_blank" rel="noopener noreferrer" className="text-[#567a62] hover:text-[#d89f4b] transition-colors transform hover:scale-110">
                      <i className="fa-brands fa-instagram text-2xl"></i>
                  </a>
                  <a href="https://www.tiktok.com/@kkm.panambangan_umc?_r=1&_t=ZS-98S89Bdo4of" target="_blank" rel="noopener noreferrer" className="text-[#567a62] hover:text-[#d89f4b] transition-colors transform hover:scale-110">
                      <i className="fa-brands fa-tiktok text-2xl"></i>
                  </a>
              </div>

              <p className="text-[#567a62]/70 text-xs font-bold tracking-wider">© KKM UMC 2026 - KKM 14</p>
          </div>
      </div>
    </>
  );
}

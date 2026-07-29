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
            background-image: radial-gradient(circle at 50% 0%, #1a201c 0%, #0c0c0c 50%);
        }
        .link-card {
            background-color: #171717;
            border: 1px solid #262626;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .link-card:hover {
            background-color: #202020;
            border-color: #3f3f3f;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -10px rgba(0,0,0,0.5);
        }
        .icon-box {
            background-color: #262626;
            transition: all 0.25s ease;
        }
        .link-card:hover .icon-box {
            background-color: #333333;
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
      <div className="flex flex-col items-center min-h-screen py-12 px-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-10 w-full max-w-md">
              <div className="profile-img w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 mb-5 bg-[#171717] flex items-center justify-center shadow-2xl relative">
                  <i className="fa-solid fa-leaf text-5xl text-emerald-500 absolute"></i>
              </div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight">Desa Panambangan</h1>
              <p className="text-gray-400 text-sm font-medium">Pusat Informasi & Potensi Desa</p>
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
          <div className="mt-16 text-center">
              <p className="text-gray-500 text-sm italic mb-2 tracking-wide">"Panambangan Berkarya"</p>
              <p className="text-gray-600 text-xs font-medium">© KKM UMC 2026 - Teknik Informatika</p>
          </div>
      </div>
    </>
  );
}

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#466651] text-[#FDFBF5] py-12 border-t border-[#385241]" id="kontak">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Image src="/logo.png" alt="Logo Desa" width={56} height={56} className="w-14 h-14 object-contain bg-white rounded-full p-1 shadow-lg mb-4" />
        <h4 className="text-xl font-bold mb-2 tracking-wide">Desa Panambangan</h4>
        <p className="text-[#a4c1ae] text-sm mb-6 text-center max-w-md font-medium">Menuju desa mandiri pangan dan ramah lingkungan melalui program edukasi dan pemberdayaan masyarakat terpadu.</p>
        
        {/* Social Media Links */}
        <div className="flex gap-5 mb-8">
            <a href="https://www.instagram.com/kkmpanambangan14_umc?igsh=endneGxnNXZqNTJ5" target="_blank" rel="noopener noreferrer" className="text-[#a4c1ae] hover:text-[#d89f4b] transition-colors transform hover:scale-110">
                <i className="fa-brands fa-instagram text-2xl"></i>
            </a>
            <a href="https://www.tiktok.com/@kkm.panambangan_umc?_r=1&_t=ZS-98S89Bdo4of" target="_blank" rel="noopener noreferrer" className="text-[#a4c1ae] hover:text-[#d89f4b] transition-colors transform hover:scale-110">
                <i className="fa-brands fa-tiktok text-2xl"></i>
            </a>
        </div>

        <div className="w-full border-t border-[#385241] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#a4c1ae]/80 text-sm mb-4 md:mb-0 font-semibold tracking-wider">Hak cipta &copy; KKM UMC 2026 - KKM 14</p>
          <div className="flex space-x-4">
            <a href="#" className="text-[#a4c1ae]/80 hover:text-[#d89f4b] transition font-medium">Privacy Policy</a>
            <a href="#" className="text-[#a4c1ae]/80 hover:text-[#d89f4b] transition font-medium">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800" id="kontak">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <img src="/logo.png" alt="Logo Desa" className="w-14 h-14 object-contain bg-white rounded-full p-1 shadow-lg mb-4" />
        <h4 className="text-xl font-bold mb-2">Desa Panambangan</h4>
        <p className="text-gray-400 text-sm mb-6 text-center max-w-md">Menuju desa mandiri pangan dan ramah lingkungan melalui program edukasi dan pemberdayaan masyarakat terpadu.</p>
        
        {/* Social Media Links */}
        <div className="flex gap-5 mb-8">
            <a href="https://www.instagram.com/kkmpanambangan14_umc?igsh=endneGxnNXZqNTJ5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110">
                <i className="fa-brands fa-instagram text-2xl"></i>
            </a>
            <a href="https://www.tiktok.com/@kkm.panambangan_umc?_r=1&_t=ZS-98S89Bdo4of" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <i className="fa-brands fa-tiktok text-2xl"></i>
            </a>
        </div>

        <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">Hak cipta &copy; KKM UMC 2026 - KKM 14</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

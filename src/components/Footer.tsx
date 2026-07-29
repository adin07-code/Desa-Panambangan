export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800" id="kontak">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">DP</div>
        <h4 className="text-xl font-bold mb-2">Desa Panambangan Berkarya</h4>
        <p className="text-gray-400 text-sm mb-8 text-center max-w-md">Menuju desa mandiri pangan dan ramah lingkungan melalui program edukasi dan pemberdayaan masyarakat terpadu.</p>
        <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">Hak cipta &copy; KKM UMC 2026 - Kelompok 14</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

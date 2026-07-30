import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Date Widget */}
      <div className="bg-[#dc3545] text-white text-center py-3 font-bold shadow">
        Kamis, 30 Juli 2026<br/>
        08 : 30 : 34
      </div>

      {/* Kategori */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4">KATEGORI</h3>
        <ul className="flex flex-col space-y-2 text-sm text-gray-600">
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Berita Desa
          </li>
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Edukasi Lingkungan
          </li>
          <li className="flex items-center border-b border-gray-100 pb-2 hover:text-[#dc3545] cursor-pointer">
            <span className="text-gray-400 mr-2">»</span> Program Kerja KKM
          </li>
        </ul>
      </div>

      {/* Statistik Penduduk */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4 flex items-center">
          <span className="mr-2">📊</span> STATISTIK PENDUDUK
        </h3>
        <div className="border border-gray-200 p-4 shadow-sm relative bg-white">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-700">Jumlah Penduduk</span>
            <Menu className="w-4 h-4 text-gray-400" />
          </div>
          
          {/* Fake Bar Chart */}
          <div className="flex justify-around items-end h-40 border-l border-b border-gray-300 pb-1 pl-1">
            
            {/* Bar 1 */}
            <div className="flex flex-col items-center w-1/4">
              <div className="w-full bg-[#7cb5ec] h-[35%] relative group">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">2112</span>
              </div>
              <span className="text-[9px] text-gray-500 mt-2 -rotate-45 origin-top-left translate-y-2 translate-x-2">LAKI-LAKI</span>
            </div>
            
            {/* Bar 2 */}
            <div className="flex flex-col items-center w-1/4">
              <div className="w-full bg-[#434348] h-[35%] relative group">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">2059</span>
              </div>
              <span className="text-[9px] text-gray-500 mt-2 -rotate-45 origin-top-left translate-y-2 translate-x-2">PEREMPUAN</span>
            </div>

            {/* Bar 3 */}
            <div className="flex flex-col items-center w-1/4">
              <div className="w-full bg-[#90ed7d] h-[0%] relative"></div>
              <span className="text-[9px] text-gray-500 mt-2 -rotate-45 origin-top-left translate-y-2 translate-x-2">BELUM MENGISI</span>
            </div>

            {/* Bar 4 */}
            <div className="flex flex-col items-center w-1/4">
              <div className="w-full bg-[#f7a35c] h-[70%] relative group">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">4171</span>
              </div>
              <span className="text-[9px] text-gray-500 mt-2 -rotate-45 origin-top-left translate-y-2 translate-x-2">TOTAL</span>
            </div>

          </div>
          
          {/* Y-Axis Labels Fake */}
          <div className="absolute left-1 top-12 flex flex-col justify-between h-32 text-[10px] text-gray-400">
            <span>6k</span>
            <span>4k</span>
            <span>2k</span>
            <span>0</span>
          </div>
          <div className="absolute left-[-15px] top-24 -rotate-90 text-[11px] text-gray-500">Jumlah</div>
          
          <div className="text-right mt-6 text-[9px] text-gray-400">Highcharts.com</div>
        </div>
      </div>

      {/* Agenda */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b-2 border-[#dc3545] pb-2 mb-4 flex items-center">
          <span className="mr-2">📅</span> AGENDA
        </h3>
        <p className="text-sm text-gray-500 text-center py-4 border border-gray-100 bg-gray-50">Belum ada agenda terdekat.</p>
      </div>

    </div>
  );
}

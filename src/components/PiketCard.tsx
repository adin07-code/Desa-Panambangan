"use client";

type PiketSchedule = {
  day: string;
  date: string;
  masak: string[];
  kebersihan: string[];
  menuSiang: string;
  menuSore: string;
};

type PiketCardProps = {
  data: PiketSchedule;
};

export default function PiketCard({ data }: PiketCardProps) {
  // Parsing tanggal jika formatnya bukan YYYY-MM-DD
  // Di CSV formatnya "24 Agu 2026", kita tampilkan langsung saja
  const displayDate = data.date;

  const permanentKebersihan: Record<string, string[]> = {
    'Senin': ['Ais', 'Faqih', 'Puspa'],
    'Selasa': ['Putri', 'Maisya', 'Ulin'],
    'Rabu': ['Nabila', 'Rikeu', 'Iki'],
    'Kamis': ['Faisal', 'Anisa', 'Alin'],
    'Jumat': ['Robi', 'Dea', 'Dini'],
    'Sabtu': ['Fauzy', 'Adin', 'Indah'],
    'Minggu': ['Libur / Bersama']
  };

  const dayName = data.day ? data.day.charAt(0).toUpperCase() + data.day.slice(1).toLowerCase() : '';
  const isKebersihanEmpty = !data.kebersihan || data.kebersihan.length === 0 || data.kebersihan[0] === "" || data.kebersihan[0] === "-";
  
  const kebersihanNames = isKebersihanEmpty 
    ? (permanentKebersihan[dayName] || ['-'])
    : data.kebersihan;

  return (
    <div className="bg-[#567a62] rounded-3xl p-5 flex flex-col gap-4 shadow-lg hover:-translate-y-1 transition-transform duration-300 relative">
      {/* Decorative Tapes */}
      <div className="absolute -top-3 -left-3 w-12 h-6 bg-[#d89f4b]/80 -rotate-45 z-10"></div>
      <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-[#d89f4b]/80 -rotate-45 z-10"></div>

      {/* Header (Hari & Tanggal) */}
      <div className="flex flex-col items-center justify-center text-center pb-2">
        <h3 className="text-3xl font-cute font-bold text-[#FDFBF5] tracking-widest uppercase uppercase">{data.day}</h3>
        <span className="text-xs font-bold text-[#a4c1ae] tracking-wider uppercase mt-1">
          {displayDate}
        </span>
      </div>

      {/* Petugas Section */}
      <div className="bg-[#FDFBF5] rounded-2xl p-4 flex flex-col gap-3 flex-grow shadow-inner">
        {/* Kebersihan & Masak */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-cute font-bold text-[#466651] text-xl border-b-2 border-[#567a62]/20 mb-2">Kebersihan</h4>
            <ol className="text-sm font-semibold text-[#567a62] space-y-1 ml-4 list-decimal marker:text-[#8ea596]">
              {kebersihanNames.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-cute font-bold text-[#466651] text-xl border-b-2 border-[#567a62]/20 mb-2">Masak</h4>
            <ol className="text-sm font-semibold text-[#567a62] space-y-1 ml-4 list-decimal marker:text-[#8ea596]">
              {data.masak.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Menu Makanan Section */}
      <div className="bg-[#466651] rounded-2xl p-4 shadow-inner mt-2">
        <h4 className="font-cute font-bold text-[#FDFBF5] text-xl mb-3 text-center tracking-wide">Menu Masakan</h4>
        
        <div className="flex flex-col gap-2">
          <div className="flex flex-col border-b border-[#567a62] pb-1">
            <span className="text-[10px] font-bold text-[#a4c1ae] uppercase tracking-widest">Siang</span>
            <span className="text-sm font-bold text-[#FDFBF5]">{data.menuSiang}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#a4c1ae] uppercase tracking-widest">Sore</span>
            <span className="text-sm font-bold text-[#FDFBF5]">{data.menuSore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

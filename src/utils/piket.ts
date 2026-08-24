export type PiketMember = {
  name: string;
  gender: 'L' | 'P';
  isKaryawan: boolean;
};

export const allMembers: PiketMember[] = [
  { name: "Alin Lantria (Sekretaris)", gender: "P", isKaryawan: false },
  { name: "Rikeu Nirmala Dewi (Bendahara)", gender: "P", isKaryawan: false },
  { name: "Aisyah Wulan Sari (Konsumsi)", gender: "P", isKaryawan: false },
  { name: "Akhmad Ulin Nuha (Dokumentasi)", gender: "L", isKaryawan: false },
  { name: "Indah Amalia", gender: "P", isKaryawan: false },
  { name: "Muhamad Fauziy Sudrajat (Ketua)", gender: "L", isKaryawan: false },
  { name: "Anisya Septriyani (Acara)", gender: "P", isKaryawan: false },
  { name: "Nabila Puspitarani", gender: "P", isKaryawan: false },
  { name: "Akhmad Faisal (Acara)", gender: "L", isKaryawan: false },
  { name: "Dini Fitriani (Dokumentasi)", gender: "P", isKaryawan: false },
  { name: "Ramadhan Faqih (Humas)", gender: "L", isKaryawan: false },
  { name: "Dea Salsabilla (Peralatan)", gender: "P", isKaryawan: false },
  { name: "Putri Sekar Thaji (Wakil)", gender: "P", isKaryawan: false },
  { name: "Maisya Siti Fatimiah (Konsumsi)", gender: "P", isKaryawan: false },
  { name: "Adin Nugraha (Acara)", gender: "L", isKaryawan: false },
  { name: "Fauzan Rizky Alifian (Peralatan)", gender: "L", isKaryawan: false },
  { name: "Robbie andreas alfaro (Humas)", gender: "L", isKaryawan: false },
  { name: "Puspa Sekar Agustin (Dokumentasi)", gender: "P", isKaryawan: false },
  { name: "Firman (Karyawan)", gender: "L", isKaryawan: true },
  { name: "Iin Nur Cahyani (Karyawan)", gender: "P", isKaryawan: true },
];

export function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getWeeklySchedule(baseDate: Date) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  
  // Hardcoded jadwal kebersihan sesuai gambar
  const kebersihanSchedule: Record<string, string[]> = {
    "Senin": ["Aisyah Wulan Sari", "Ramadhan Faqih", "Puspa Sekar Agustin"],
    "Selasa": ["Putri Sekar Thaji", "Maisya Siti Fatimiah", "Akhmad Ulin Nuha"],
    "Rabu": ["Nabila Puspitarani", "Rikeu Nirmala Dewi", "Fauzan Rizky Alifian"],
    "Kamis": ["Akhmad Faisal", "Anisya Septriyani", "Alin Lantria"],
    "Jumat": ["Robbie andreas alfaro", "Dea Salsabilla", "Dini Fitriani"],
    "Sabtu": ["Muhamad Fauziy Sudrajat", "Adin Nugraha", "Indah Amalia"],
    "Minggu": ["Piket Bersama (Seluruh Anggota KKM)"]
  };

  // Hardcoded jadwal masak (Pagi & Malam) sesuai gambar
  const masakSchedule: Record<string, string[]> = {
    "Senin": ["Siang: Robbie & Rikeu", "Sore: Adin & Anisya"],
    "Selasa": ["Siang: Ulin & Indah", "Sore: Faisal & Dini"],
    "Rabu": ["Siang: Putri & Faqih", "Sore: Rikeu & Fauziy"],
    "Kamis": ["Siang: Alin & Fauzan", "Sore: Anisya & Robbie"],
    "Jumat": ["Siang: Adin & Indah", "Sore: Ulin & Dini"],
    "Sabtu": ["Siang: Faisal & Dea", "Sore: Faqih & Puspa"],
    "Minggu": ["Siang: Fauziy & Nabila", "Sore: Fauzan & Putri"]
  };

  const schedule = days.map((day, index) => {
    // Mendapatkan tanggal aktual minggu ini
    const dayDate = new Date(baseDate);
    const dayOffset = index - (baseDate.getDay() === 0 ? 6 : baseDate.getDay() - 1);
    dayDate.setDate(baseDate.getDate() + dayOffset);
    const dateStr = dayDate.toISOString().split('T')[0];

    return {
      day,
      date: dateStr,
      masak: masakSchedule[day] || [],
      kebersihan: kebersihanSchedule[day] || [],
    };
  });

  return schedule;
}

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

const kkmMembers = [
  { full: "Aisyah Wulan Sari", short: "Aisyah" },
  { full: "Ramadhan Faqih", short: "Faqih" },
  { full: "Puspa Sekar Agustin", short: "Puspa" },
  { full: "Putri Sekar Thaji", short: "Putri" },
  { full: "Maisya Siti Fatimiah", short: "Maisya" },
  { full: "Akhmad Ulin Nuha", short: "Ulin" },
  { full: "Nabila Puspitarani", short: "Nabila" },
  { full: "Rikeu Nirmala Dewi", short: "Rikeu" },
  { full: "Fauzan Rizky Alifian", short: "Fauzan" },
  { full: "Akhmad Faisal", short: "Faisal" },
  { full: "Anisya Septriyani", short: "Anisya" },
  { full: "Alin Lantria", short: "Alin" },
  { full: "Robbie andreas alfaro", short: "Robbie" },
  { full: "Dea Salsabilla", short: "Dea" },
  { full: "Dini Fitriani", short: "Dini" },
  { full: "Muhamad Fauziy Sudrajat", short: "Fauziy" },
  { full: "Adin Nugraha", short: "Adin" },
  { full: "Indah Amalia", short: "Indah" },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffle<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let m = arr.length, t, i;
  let currentSeed = seed;
  while (m) {
    i = Math.floor(seededRandom(currentSeed++) * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

export function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function generateKebersihanSchedule(weekNum: number) {
  const shuffled = shuffle(kkmMembers, weekNum * 20);
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const schedule: Record<string, string[]> = {};
  
  let index = 0;
  for (const day of days) {
    schedule[day] = [
      shuffled[index++].full,
      shuffled[index++].full,
      shuffled[index++].full
    ];
  }
  schedule["Minggu"] = ["Piket Bersama (Seluruh Anggota KKM)"];
  
  return schedule;
}

function generateMasakSchedule(weekNum: number) {
  const round1 = shuffle(kkmMembers, weekNum * 10);
  const round2 = shuffle(kkmMembers, weekNum * 10 + 1);
  const total28 = [...round1, ...round2.slice(0, 10)];
  
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const schedule: Record<string, string[]> = {};
  
  let index = 0;
  for (const day of days) {
    const siang1 = total28[index++].short;
    const siang2 = total28[index++].short;
    const sore1 = total28[index++].short;
    const sore2 = total28[index++].short;
    
    schedule[day] = [
      `Siang: ${siang1} & ${siang2}`,
      `Sore: ${sore1} & ${sore2}`
    ];
  }
  return schedule;
}

export function getWeeklySchedule(baseDate: Date) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const weekNum = getWeekNumber(baseDate);
  const year = baseDate.getFullYear();
  
  // Create a unique seed per year+week to ensure it shifts consistently
  const uniqueWeekId = year * 100 + weekNum; 
  
  const kebersihanSchedule = generateKebersihanSchedule(uniqueWeekId);
  const masakSchedule = generateMasakSchedule(uniqueWeekId);

  const schedule = days.map((day, index) => {
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

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
  const weekNum = getWeekNumber(baseDate);
  
  const regularMen = allMembers.filter(m => m.gender === 'L' && !m.isKaryawan);
  const regularWomen = allMembers.filter(m => m.gender === 'P' && !m.isKaryawan);
  const karyawanMen = allMembers.filter(m => m.gender === 'L' && m.isKaryawan);
  const karyawanWomen = allMembers.filter(m => m.gender === 'P' && m.isKaryawan);

  // Fungsi rotasi agar jadwal adil tiap minggunya
  const rotateArray = (arr: PiketMember[], offset: number) => {
    const shift = offset % arr.length;
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  };

  const currentMen = rotateArray(regularMen, weekNum);
  const currentWomen = rotateArray(regularWomen, weekNum);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  
  const schedule = days.map((day, index) => {
    // Masak: 1 Laki-laki, 2 Perempuan
    const masakMenIdx = (index * 2) % currentMen.length;
    const masakWomenIdx = (index * 2) % currentWomen.length;
    
    // Kebersihan: 1 Laki-laki, 2 Perempuan
    const bersihMenIdx = (index * 2 + 1) % currentMen.length;
    const bersihWomenIdx = (index * 2 + 2) % currentWomen.length; // offset beda agar tidak sama dengan masak

    const masakTeam = [
      currentMen[masakMenIdx],
      currentWomen[masakWomenIdx],
      currentWomen[(masakWomenIdx + 1) % currentWomen.length]
    ];

    const kebersihanTeam = [
      currentMen[bersihMenIdx],
      currentWomen[bersihWomenIdx],
      currentWomen[(bersihWomenIdx + 1) % currentWomen.length]
    ];

    // Khusus weekend, Karyawan masuk jadwal
    if (day === "Sabtu") {
       masakTeam.push(karyawanWomen[0]);
    }
    if (day === "Minggu") {
       kebersihanTeam.push(karyawanMen[0]);
    }

    // Mendapatkan tanggal aktual minggu ini
    const dayDate = new Date(baseDate);
    const dayOffset = index - (baseDate.getDay() === 0 ? 6 : baseDate.getDay() - 1);
    dayDate.setDate(baseDate.getDate() + dayOffset);
    const dateStr = dayDate.toISOString().split('T')[0];

    return {
      day,
      date: dateStr,
      masak: masakTeam.map(m => m.name),
      kebersihan: kebersihanTeam.map(m => m.name),
    };
  });

  return schedule;
}

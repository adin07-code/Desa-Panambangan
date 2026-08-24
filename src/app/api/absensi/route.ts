import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// [PERHATIAN]: Di lingkungan Vercel (Serverless), variabel global ini 
// akan mereset setiap kali "Cold Start" terjadi. 
// Ini hanya untuk simulasi saat development.
// Saran: Gunakan Vercel KV (Redis), Supabase, atau Firebase untuk database sungguhan.
const mockDatabase: Record<string, string>[] = [
  {
    id: "1",
    timestamp: "8/24/2026 7:38:11",
    nama_lengkap: "Aisyah Wulan Sari",
    nim: "230741005",
    prodi: "Ilmu Gizi",
    email: "aisyahwulan23@gmail.com",
    receivedAt: new Date("2026-08-24T07:38:11.000+07:00").toISOString(),
  },
  {
    id: "2",
    timestamp: "8/24/2026 8:30:17",
    nama_lengkap: "Akhmad faisal",
    nim: "230111098",
    prodi: "Manajemen",
    email: "akhmadfaisal858@gmail.com",
    receivedAt: new Date("2026-08-24T08:30:17.000+07:00").toISOString(),
  },
  {
    id: "3",
    timestamp: "8/24/2026 8:30:26",
    nama_lengkap: "Robbie andreas alfaro",
    nim: "230511135",
    prodi: "Teknik Informatika",
    email: "robbiealfaro467@gmail.com",
    receivedAt: new Date("2026-08-24T08:30:26.000+07:00").toISOString(),
  },
  {
    id: "4",
    timestamp: "8/24/2026 8:30:40",
    nama_lengkap: "Maisya Siti Fatimiah",
    nim: "230911016",
    prodi: "Tasawuf dan Psikoterap",
    email: "maisyastf@gmail.com",
    receivedAt: new Date("2026-08-24T08:30:40.000+07:00").toISOString(),
  },
  {
    id: "5",
    timestamp: "8/24/2026 8:30:40",
    nama_lengkap: "MUHAMAD FAUZIY SUDRAJAT",
    nim: "230221010",
    prodi: "Ilmu Pemerintahan",
    email: "fauziysudrajat526@gmail.com",
    receivedAt: new Date("2026-08-24T08:30:40.000+07:00").toISOString(),
  },
  {
    id: "6",
    timestamp: "8/24/2026 8:52:01",
    nama_lengkap: "Putri Sekar Thaji",
    nim: "230641068",
    prodi: "PGSD",
    email: "putrisekarthaji06@gmail.com",
    receivedAt: new Date("2026-08-24T08:52:01.000+07:00").toISOString(),
  },
  {
    id: "7",
    timestamp: "8/24/2026 9:37:47",
    nama_lengkap: "dea salsabila",
    nim: "230641155",
    prodi: "PGSD",
    email: "dea.salsabila8899@gmail.com",
    receivedAt: new Date("2026-08-24T09:37:47.000+07:00").toISOString(),
  },
  {
    id: "8",
    timestamp: "8/24/2026 10:57:52",
    nama_lengkap: "INDAH AMALIA",
    nim: "230211086",
    prodi: "Ilmu Komunikasi",
    email: "amaliaindah038@gmail.com",
    receivedAt: new Date("2026-08-24T10:57:52.000+07:00").toISOString(),
  }
];

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validasi payload sederhana
    if (!data.nim || !data.nama_lengkap) {
      return NextResponse.json(
        { error: "NIM dan Nama Lengkap wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah sudah absen hari ini
    const today = new Date().toISOString().split("T")[0]; // Ambil tanggal hari ini (YYYY-MM-DD)
    const isDuplicate = mockDatabase.some((entry) => {
      // Periksa apakah NIM sama dan tanggal (dari receivedAt) sama
      const entryDate = new Date(entry.receivedAt).toISOString().split("T")[0];
      return entry.nim === data.nim && entryDate === today;
    });

    if (isDuplicate) {
      return NextResponse.json(
        { error: "Mahasiswa ini sudah melakukan absensi hari ini" },
        { status: 409 }
      );
    }

    // Tambahkan ke "database" simulasi kita
    mockDatabase.push({
      ...data,
      id: Date.now().toString(),
      receivedAt: new Date().toISOString(),
    });

    // Urutkan dari yang terbaru (opsional)
    mockDatabase.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());

    return NextResponse.json(
      { message: "Data absensi berhasil diterima", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses webhook" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Endpoint ini untuk mengambil data absensi yang sudah tersimpan
  // Nantinya frontend akan memanggil endpoint ini
  return NextResponse.json({ data: mockDatabase, success: true });
}

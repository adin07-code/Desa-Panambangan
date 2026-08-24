import { NextResponse } from "next/server";

// [PERHATIAN]: Di lingkungan Vercel (Serverless), variabel global ini 
// akan mereset setiap kali "Cold Start" terjadi. 
// Ini hanya untuk simulasi saat development.
// Saran: Gunakan Vercel KV (Redis), Supabase, atau Firebase untuk database sungguhan.
const mockDatabase: Record<string, string>[] = [
  {
    id: "1",
    timestamp: "8/24/2026 07:15:00",
    nama_lengkap: "AKHMAD FAISAL",
    nim: "230111098",
    prodi: "Manajemen",
    email: "akhmadfaisal@example.com",
    receivedAt: new Date("2026-08-24T00:15:00.000Z").toISOString(),
  },
  {
    id: "2",
    timestamp: "8/24/2026 07:20:00",
    nama_lengkap: "Aisyah Wulan Sari",
    nim: "230741005",
    prodi: "Ilmu Gizi",
    email: "aisyah@example.com",
    receivedAt: new Date("2026-08-24T00:20:00.000Z").toISOString(),
  },
  {
    id: "3",
    timestamp: "8/24/2026 07:30:00",
    nama_lengkap: "INDAH AMALIA",
    nim: "230211086",
    prodi: "Ilmu Komunikasi",
    email: "indah@example.com",
    receivedAt: new Date("2026-08-24T00:30:00.000Z").toISOString(),
  },
  {
    id: "4",
    timestamp: "8/24/2026 07:35:00",
    nama_lengkap: "MUHAMAD FAUZIY SUDRAJAT",
    nim: "230221010",
    prodi: "Ilmu Pemerintahan",
    email: "fauziy@example.com",
    receivedAt: new Date("2026-08-24T00:35:00.000Z").toISOString(),
  },
  {
    id: "5",
    timestamp: "8/24/2026 07:40:00",
    nama_lengkap: "Robbie andreas alfaro",
    nim: "230511135",
    prodi: "Teknik Informatika",
    email: "robbie@example.com",
    receivedAt: new Date("2026-08-24T00:40:00.000Z").toISOString(),
  },
  {
    id: "6",
    timestamp: "8/24/2026 07:45:00",
    nama_lengkap: "Dea salsabila",
    nim: "230641155",
    prodi: "PGSD",
    email: "dea@example.com",
    receivedAt: new Date("2026-08-24T00:45:00.000Z").toISOString(),
  },
  {
    id: "7",
    timestamp: "8/24/2026 07:50:00",
    nama_lengkap: "PUTRI SEKAR THAJI",
    nim: "230641068",
    prodi: "PGSD",
    email: "putri@example.com",
    receivedAt: new Date("2026-08-24T00:50:00.000Z").toISOString(),
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

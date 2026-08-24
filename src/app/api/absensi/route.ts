import { NextResponse } from "next/server";

// [PERHATIAN]: Di lingkungan Vercel (Serverless), variabel global ini 
// akan mereset setiap kali "Cold Start" terjadi. 
// Ini hanya untuk simulasi saat development.
// Saran: Gunakan Vercel KV (Redis), Supabase, atau Firebase untuk database sungguhan.
const mockDatabase: Record<string, string>[] = [];

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

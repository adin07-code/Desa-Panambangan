import { NextResponse } from "next/server";

// Simpanan memori sementara untuk Menu Masakan
// Format: { "2026-08-24": { pagi: "Nasi Goreng", siang: "Ayam Penyet", malam: "Mie Tek-tek" } }
// Sekali lagi, di Vercel ini akan keriset saat cold start.
const menuDatabase: Record<string, { pagi: string; siang: string; malam: string }> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (date) {
    return NextResponse.json({ data: menuDatabase[date] || { pagi: "", siang: "", malam: "" } });
  }

  return NextResponse.json({ data: menuDatabase });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { date, pagi, siang, malam } = data;

    if (!date) {
      return NextResponse.json({ error: "Tanggal (date) wajib diisi" }, { status: 400 });
    }

    menuDatabase[date] = {
      pagi: pagi || "",
      siang: siang || "",
      malam: malam || "",
    };

    return NextResponse.json({ message: "Menu berhasil disimpan", success: true });
  } catch (error) {
    console.error("Gagal menyimpan menu:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
  }
}

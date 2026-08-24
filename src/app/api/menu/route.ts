import { NextResponse } from "next/server";

// Simpanan memori sementara untuk Menu Masakan
// Format: { "2026-08-24": { siang: "Ayam Penyet", sore: "Mie Tek-tek" } }
// Sekali lagi, di Vercel ini akan keriset saat cold start.
const menuDatabase: Record<string, { siang: string; sore: string }> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (date) {
    return NextResponse.json({ data: menuDatabase[date] || { siang: "", sore: "" } });
  }

  return NextResponse.json({ data: menuDatabase });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { date, siang, sore } = data;

    if (!date) {
      return NextResponse.json({ error: "Tanggal (date) wajib diisi" }, { status: 400 });
    }

    menuDatabase[date] = {
      siang: siang || "",
      sore: sore || "",
    };

    return NextResponse.json({ message: "Menu berhasil disimpan", success: true });
  } catch (error) {
    console.error("Gagal menyimpan menu:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
  }
}

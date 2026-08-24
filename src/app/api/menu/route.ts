import { NextResponse } from "next/server";

// Simpanan memori sementara untuk Menu Masakan
// Format: { "2026-08-24": { siang: "Ayam Penyet", sore: "Mie Tek-tek" } }
// Sekali lagi, di Vercel ini akan keriset saat cold start.
const menuDatabase: Record<string, { siang: string; sore: string }> = {
  "2026-08-19": {
    siang: "Nasi Kuning, Oreg Tempe Kering, Telur Dadar, Sambal",
    sore: "Nasi Putih, Telur Kari Kuning, Tempe Goreng, Kerupuk",
  },
  "2026-08-20": {
    siang: "Nasi Lengko, Kerupuk",
    sore: "Nasi, Urap Sayur, Tempe Goreng, Telur Dadar",
  },
  "2026-08-21": {
    siang: "Nasi, Tumis Kangkung, Tempe Mendoan, Terong Goreng",
    sore: "Nasi, Ayam Goreng Lengkuas, Sambal, Tumis Toge",
  },
  "2026-08-22": {
    siang: "Nasi, Sayur Bayam, Tempe Goreng, Telur Dadar",
    sore: "Nasi Goreng + Sosis, Timun, Kerupuk",
  },
  "2026-08-23": {
    siang: "Nasi Uduk, Oreg Tempe, Dadar, Bihun",
    sore: "Nasi Daun Jeruk, Sambal, Tempe Goreng Ketumbar, Telur Dadar",
  },
  "2026-08-24": {
    siang: "Nasi, Tumis Sayur Pelangi, Martabak Tahu, Kerupuk",
    sore: "Nasi, Sayur Bening Bayam, Tempe Goreng Ketumbar, Orak Arik Telur Cabe Garam",
  },
  "2026-08-25": {
    siang: "Nasi, Tumis Labu Siam, Tahu Cabe Garam, Gyeran Mari",
    sore: "Nasi Liwet, Tahu Tempe Goreng, Ayam Goreng Bawang Putih, Cah Kangkung",
  }
};

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

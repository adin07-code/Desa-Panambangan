/* eslint-disable */
import { NextResponse } from "next/server";
import Papa from "papaparse";

export const dynamic = 'force-dynamic';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1qP5OP7Yh3XwIcQiXaym4MNS4n1_VxPRV0zx2yVVppR0/export?format=csv&gid=23931130";

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch from Google Sheets");
    }
    const csvText = await res.text();
    
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // Mendapatkan tanggal hari ini di zona waktu WIB (Jakarta)
    // Format yang dihasilkan biasanya "M/D/YYYY" seperti "8/24/2026"
    const todayStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta' }).format(new Date());

    const absensiList = data.map((row: any, index: number) => {
      const ts = row["Timestamp"] || "";
      const datePart = ts.split(" ")[0]; // "8/24/2026"
      
      let nama = row["Nama Lengkap"] || "";
      nama = nama.trim().toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      return {
        id: index.toString(),
        timestamp: ts,
        datePart: datePart,
        nama_lengkap: nama,
        nim: row["NIM"] || "",
        prodi: row["Prodi"] || "",
        email: row["Email"] || "",
        receivedAt: ts, // Akan di-parse oleh frontend
      };
    });

    // Filter hanya absensi HARI INI
    const todaysAbsensi = absensiList.filter((item) => item.datePart === todayStr);

    // Hapus duplikat berdasarkan NIM (hanya ambil yang pertama kali absen hari itu)
    const seen = new Set();
    const uniqueAbsensi = [];
    
    for (const item of todaysAbsensi) {
      if (!seen.has(item.nim)) {
        seen.add(item.nim);
        uniqueAbsensi.push(item);
      }
    }

    return NextResponse.json({ data: uniqueAbsensi, success: true });
    
  } catch (error) {
    console.error("Error fetching absensi dari Google Sheets:", error);
    return NextResponse.json({ data: [], error: "Gagal mengambil data", success: false });
  }
}

// POST endpoint tetap dipertahankan agar Webhook Apps Script tidak error,
// tetapi kita tidak menyimpannya ke memori lagi karena GET sudah mengambil langsung dari Google Sheets.
export async function POST(request: Request) {
  return NextResponse.json(
    { message: "Webhook diterima (Data live sekarang ditarik langsung dari GSheets)", success: true },
    { status: 200 }
  );
}

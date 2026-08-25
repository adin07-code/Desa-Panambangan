import { NextResponse } from "next/server";
import Papa from "papaparse";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable cache

const PIKET_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1ZIM8Eq3lQUfnK7kAUK90A-QwQvhCyA4lPbzxlT5j2Uo/export?format=csv";

export async function GET() {
  try {
    const res = await fetch(PIKET_SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch from Google Sheets");
    }
    const csvText = await res.text();
    
    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const scheduleList = data.map((row: any) => {
      // Split kebersihan comma-separated string into array
      const kebersihanStr = row["Tim Kebersihan"] || "";
      const kebersihan = kebersihanStr.split(",").map((s: string) => s.trim()).filter(Boolean);

      const masakSiang = row["Masak Siang"] || "-";
      const masakSore = row["Masak Sore"] || "-";
      
      const masak = [];
      if (masakSiang !== "-") masak.push(`Siang: ${masakSiang}`);
      if (masakSore !== "-") masak.push(`Sore: ${masakSore}`);

      return {
        day: row["Hari"] || "",
        date: row["Tanggal"] || "",
        kebersihan: kebersihan,
        masak: masak,
        menuSiang: row["Menu Siang"] || "-",
        menuSore: row["Menu Sore"] || "-",
      };
    });

    return NextResponse.json({ data: scheduleList, success: true });
    
  } catch (error) {
    console.error("Error fetching jadwal piket dari Google Sheets:", error);
    return NextResponse.json({ data: [], error: "Gagal mengambil jadwal piket", success: false });
  }
}

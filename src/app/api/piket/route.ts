/* eslint-disable */
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
      transformHeader: (header) => header.trim().toUpperCase()
    });

    const scheduleList = data.map((row: any) => {
      // Split kebersihan comma-separated string into array
      const kebersihanStr = row["TIM KEBERSIHAN"] || "";
      const kebersihan = kebersihanStr.split(",").map((s: string) => s.trim()).filter(Boolean);

      const masakSiang = row["TIM KONSUMSI SIANG"] || "-";
      const masakSore = row["TIM KONSUMSI MALAM"] || "-";
      
      const masak = [];
      if (masakSiang !== "-") masak.push(`Siang: ${masakSiang}`);
      if (masakSore !== "-") masak.push(`Sore: ${masakSore}`);

      return {
        day: row["HARI"] || "",
        date: row["TANGGAL"] || "",
        kebersihan: kebersihan,
        masak: masak,
        menuSiang: row["MENU SIANG HARI"] || "-",
        menuSore: row["MENU MALAM HARI"] || "-",
      };
    });

    return NextResponse.json({ data: scheduleList, success: true });
    
  } catch (error) {
    console.error("Error fetching jadwal piket dari Google Sheets:", error);
    return NextResponse.json({ data: [], error: "Gagal mengambil jadwal piket", success: false });
  }
}

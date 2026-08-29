import { NextResponse } from "next/server";
import { keuanganData } from "@/data/keuanganData";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // For now, we are bypassing Google Sheets because the format has changed to "Sie Konsumsi"
    // and we don't have the new Google Sheets URL yet.
    // Returning the mock data directly.
    return NextResponse.json({ data: keuanganData, success: true, message: "Using static data for Sie Konsumsi format" });
    
  } catch (error) {
    console.error("Error fetching Keuangan:", error);
    return NextResponse.json({ data: keuanganData, error: "Gagal mengambil data", success: false });
  }
}

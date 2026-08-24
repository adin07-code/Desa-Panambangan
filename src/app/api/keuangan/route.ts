import { NextResponse } from "next/server";
import Papa from "papaparse";
import { keuanganData } from "@/data/keuanganData";

export const dynamic = 'force-dynamic';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/12NBhmmkQ5HdBYiLS5EyzGOOlY8CJtf6wm9-KobjmSYs/export?format=csv&gid=1527735025";

export async function GET() {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch from Google Sheets");
    }
    const csvText = await res.text();
    
    // The CSV might have title rows before the actual header. 
    // We will find the row that has 'TANGGAL' and use that as header.
    const rows = Papa.parse(csvText, { skipEmptyLines: true }).data as string[][];
    let headerRowIndex = -1;
    
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].includes('TANGGAL') || rows[i].includes('TANGGAL ') || rows[i].includes(' TANGGAL ')) {
            headerRowIndex = i;
            break;
        }
    }
    
    // If we didn't find the header (e.g. Google returns the RAB tab instead of Laporan Keuangan),
    // we use the static fallback data so the website doesn't show Rp 0.
    if (headerRowIndex === -1) {
        return NextResponse.json({ data: keuanganData, success: true, message: "Using static fallback due to missing header in CSV" });
    }

    // Extract actual data using the found header
    const { data } = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true,
    });
    
    const headers = (data[headerRowIndex] as string[]).map(h => h.trim().toUpperCase());
    const dateIdx = headers.indexOf('TANGGAL');
    const dayIdx = headers.indexOf('HARI');
    const descIdx = headers.indexOf('KETERANGAN');
    const inIdx = headers.indexOf('PEMASUKAN');
    const outIdx = headers.indexOf('PENGELUARAN');
    
    const parsedData = [];
    
    // Parse the rows below header
    for (let i = headerRowIndex + 1; i < data.length; i++) {
        const row = data[i] as string[];
        
        // helper to parse currency
        const parseCurrency = (val: string) => {
            if (!val || val.trim() === '') return 0;
            // Remove 'Rp', dots, spaces
            let numStr = val.replace(/Rp/gi, '').replace(/\./g, '').trim();
            // Handle decimal comma
            if (numStr.includes(',')) {
              numStr = numStr.split(',')[0]; 
            }
            return parseInt(numStr, 10) || 0;
        };

        const tanggal = row[dateIdx] || "";
        const keterangan = row[descIdx] || "";
        
        if (!tanggal && !keterangan) continue; // Skip empty rows
        
        const pemasukan = parseCurrency(row[inIdx]);
        const pengeluaran = parseCurrency(row[outIdx]);
        
        let tipe = 'Pengeluaran';
        let jumlah = pengeluaran;
        
        if (pemasukan > 0) {
            tipe = 'Pemasukan';
            jumlah = pemasukan;
        }
        
        parsedData.push({
            id: i.toString(),
            tanggal: tanggal,
            hari: row[dayIdx] || "",
            keterangan: keterangan,
            tipe: tipe,
            jumlah: jumlah
        });
    }
    
    if (parsedData.length === 0) {
        return NextResponse.json({ data: keuanganData, success: true, message: "Using static fallback due to empty parsed data" });
    }

    return NextResponse.json({ data: parsedData, success: true });
    
  } catch (error) {
    console.error("Error fetching Keuangan dari Google Sheets:", error);
    return NextResponse.json({ data: keuanganData, error: "Gagal mengambil data, menggunakan fallback", success: false });
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('keuangan_konsumsi')
      .select('*')
      .order('tanggal', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Gagal mengambil data dari Supabase", success: false }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
    
  } catch (error) {
    console.error("Error fetching Keuangan:", error);
    return NextResponse.json({ error: "Gagal mengambil data", success: false }, { status: 500 });
  }
}

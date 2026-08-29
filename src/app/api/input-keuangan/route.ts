import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      tanggal, 
      namaBarang, 
      siapaBeli, 
      pcs, 
      hargaSatuan, 
      totalBarang,
      pemasukanKkm,
      pemasukanPribadi,
      pengeluaranKkm,
      pengeluaranPribadi
    } = body;

    // Validasi sederhana
    if (!tanggal || !namaBarang) {
      return NextResponse.json(
        { status: 'error', message: 'Tanggal dan Nama Barang/Uraian harus diisi' },
        { status: 400 }
      );
    }

    const payload = {
      tanggal,
      namaBarang,
      siapaBeli: siapaBeli || 'Sie Konsumsi',
      pcs: pcs || null,
      sisaBarang: '-',
      hargaSatuan: hargaSatuan || null,
      totalBarang: totalBarang || null,
      pemasukanKkm: pemasukanKkm || null,
      pemasukanPribadi: pemasukanPribadi || null,
      pengeluaranKkm: pengeluaranKkm || null,
      pengeluaranPribadi: pengeluaranPribadi || null,
    };

    const { error } = await supabase
      .from('keuangan_konsumsi')
      .insert([payload]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { status: 'error', message: 'Gagal menyimpan ke Supabase' },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success', message: 'Data berhasil disimpan' });

  } catch (error) {
    console.error('API /input-keuangan error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

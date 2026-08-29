import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let payloads = [];

    if (Array.isArray(body)) {
      payloads = body.map((item: any) => ({
        tanggal: item.tanggal,
        namaBarang: item.namaBarang,
        siapaBeli: item.siapaBeli || 'Sie Konsumsi',
        pcs: item.pcs || null,
        sisaBarang: '-',
        hargaSatuan: item.hargaSatuan || null,
        totalBarang: item.totalBarang || null,
        pemasukanKkm: item.pemasukanKkm || null,
        pemasukanPribadi: item.pemasukanPribadi || null,
        pengeluaranKkm: item.pengeluaranKkm || null,
        pengeluaranPribadi: item.pengeluaranPribadi || null,
      }));
    } else {
      payloads = [{
        tanggal: body.tanggal,
        namaBarang: body.namaBarang,
        siapaBeli: body.siapaBeli || 'Sie Konsumsi',
        pcs: body.pcs || null,
        sisaBarang: '-',
        hargaSatuan: body.hargaSatuan || null,
        totalBarang: body.totalBarang || null,
        pemasukanKkm: body.pemasukanKkm || null,
        pemasukanPribadi: body.pemasukanPribadi || null,
        pengeluaranKkm: body.pengeluaranKkm || null,
        pengeluaranPribadi: body.pengeluaranPribadi || null,
      }];
    }

    // Validasi sederhana
    if (payloads.length === 0 || !payloads[0].tanggal || !payloads[0].namaBarang) {
      return NextResponse.json(
        { status: 'error', message: 'Data tidak lengkap (Tanggal dan Nama Barang wajib)' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('keuangan_konsumsi')
      .insert(payloads);

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

import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyw2NQMoDJ1BVfHTp0T5Yh9l5feT5xb6xvultE-KPwqhKUvsO4TBQsNCY9JJ0RvpahM/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tanggal, keterangan, pemasukan, pengeluaran } = body;

    // Validasi sederhana
    if (!tanggal || !keterangan) {
      return NextResponse.json(
        { status: 'error', message: 'Tanggal dan keterangan harus diisi' },
        { status: 400 }
      );
    }

    const payload = {
      tanggal,
      keterangan,
      pemasukan: pemasukan || 0,
      pengeluaran: pengeluaran || 0,
    };

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.status === 'success') {
      return NextResponse.json({ status: 'success', message: 'Data berhasil disimpan' });
    } else {
      return NextResponse.json(
        { status: 'error', message: result.message || 'Gagal menyimpan ke spreadsheet' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API /input-keuangan error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

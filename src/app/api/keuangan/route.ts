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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, is_rembes } = body;

    if (!id) {
      return NextResponse.json({ error: "ID dibutuhkan", success: false }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('keuangan_konsumsi')
      .update({ is_rembes })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Supabase Error (Update):", error);
      return NextResponse.json({ error: "Gagal update data", success: false }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error updating Keuangan:", error);
    return NextResponse.json({ error: "Terjadi kesalahan", success: false }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID dibutuhkan", success: false }, { status: 400 });
    }

    const { error } = await supabase
      .from('keuangan_konsumsi')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Supabase Error (Delete):", error);
      return NextResponse.json({ error: "Gagal menghapus data", success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting Keuangan:", error);
    return NextResponse.json({ error: "Terjadi kesalahan", success: false }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID dibutuhkan", success: false }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('keuangan_konsumsi')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error("Supabase Error (PUT):", error);
      return NextResponse.json({ error: "Gagal memperbarui data", success: false }, { status: 500 });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error updating Keuangan (PUT):", error);
    return NextResponse.json({ error: "Terjadi kesalahan", success: false }, { status: 500 });
  }
}

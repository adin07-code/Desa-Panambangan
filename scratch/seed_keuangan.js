require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const keuanganData = [
    {
        tanggal: "2026-08-20",
        nama_barang: "Saldo Awal / Dana KKM (Contoh)",
        siapa_beli: "Bendahara",
        pcs: null,
        sisa_barang: "-",
        harga_satuan: null,
        total_barang: null,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: null,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-22",
        nama_barang: "Pembelian Sayuran",
        siapa_beli: "Sie Konsumsi",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 38000,
        total_barang: 38000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 38000,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-22",
        nama_barang: "Tepung Sasa (1 renceng)",
        siapa_beli: "Sie Konsumsi",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 29000,
        total_barang: 29000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 29000,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-22",
        nama_barang: "Sosis (1 pack)",
        siapa_beli: "Sie Konsumsi",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 33000,
        total_barang: 33000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 33000,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-23",
        nama_barang: "Minyak 2L",
        siapa_beli: "Adin",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 43000,
        total_barang: 43000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 43000,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-23",
        nama_barang: "Sayuran",
        siapa_beli: "Cahya",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 49000,
        total_barang: 49000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 49000,
        pengeluaran_pribadi: null
    },
    {
        tanggal: "2026-08-24",
        nama_barang: "Pembelian Sayuran",
        siapa_beli: "Rikeu dan Putri",
        pcs: 1,
        sisa_barang: "-",
        harga_satuan: 83000,
        total_barang: 83000,
        pemasukan_kkm: null,
        pemasukan_pribadi: null,
        pengeluaran_kkm: 83000,
        pengeluaran_pribadi: null
    }
];

async function seed() {
    console.log("Seeding data...");
    for (const item of keuanganData) {
        const { error } = await supabase.from('keuangan_konsumsi').insert([item]);
        if (error) {
            console.error("Error inserting:", item.nama_barang, error);
        } else {
            console.log("Inserted:", item.nama_barang);
        }
    }
    console.log("Done seeding.");
}

seed();

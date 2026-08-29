export interface KeuanganItem {
    id: string;
    tanggal: string;
    namaBarang: string;
    siapaBeli: string;
    pcs: number | null;
    sisaBarang: string;
    hargaSatuan: number | null;
    totalBarang: number | null;
    pemasukanKkm: number | null;
    pemasukanPribadi: number | null;
    pengeluaranKkm: number | null;
    pengeluaranPribadi: number | null;
}

export const keuanganData: KeuanganItem[] = [
    {
        id: "1",
        tanggal: "2026-08-20",
        namaBarang: "Saldo Awal / Dana KKM (Contoh)",
        siapaBeli: "Bendahara",
        pcs: null,
        sisaBarang: "-",
        hargaSatuan: null,
        totalBarang: null,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: null,
        pengeluaranPribadi: null
    },
    {
        id: "2",
        tanggal: "2026-08-22",
        namaBarang: "Pembelian Sayuran",
        siapaBeli: "Sie Konsumsi",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 38000,
        totalBarang: 38000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 38000,
        pengeluaranPribadi: null
    },
    {
        id: "3",
        tanggal: "2026-08-22",
        namaBarang: "Tepung Sasa (1 renceng)",
        siapaBeli: "Sie Konsumsi",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 29000,
        totalBarang: 29000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 29000,
        pengeluaranPribadi: null
    },
    {
        id: "4",
        tanggal: "2026-08-22",
        namaBarang: "Sosis (1 pack)",
        siapaBeli: "Sie Konsumsi",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 33000,
        totalBarang: 33000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 33000,
        pengeluaranPribadi: null
    },
    {
        id: "5",
        tanggal: "2026-08-23",
        namaBarang: "Minyak 2L",
        siapaBeli: "Adin",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 43000,
        totalBarang: 43000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 43000,
        pengeluaranPribadi: null
    },
    {
        id: "6",
        tanggal: "2026-08-23",
        namaBarang: "Sayuran",
        siapaBeli: "Cahya",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 49000,
        totalBarang: 49000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 49000,
        pengeluaranPribadi: null
    },
    {
        id: "7",
        tanggal: "2026-08-24",
        namaBarang: "Pembelian Sayuran",
        siapaBeli: "Rikeu dan Putri",
        pcs: 1,
        sisaBarang: "-",
        hargaSatuan: 83000,
        totalBarang: 83000,
        pemasukanKkm: null,
        pemasukanPribadi: null,
        pengeluaranKkm: 83000,
        pengeluaranPribadi: null
    }
];

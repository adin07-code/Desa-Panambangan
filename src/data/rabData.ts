export interface RabItem {
    id: string;
    kategori: string;
    nama_barang: string;
    jumlah: number;
    satuan: string;
    harga_satuan: number;
    total: number;
    keterangan: string;
}

export const rabData: RabItem[] = [
    // SEKRETARIS
    { id: "s1", kategori: "Sekretaris", nama_barang: "ATK", jumlah: 2, satuan: "Pcs", harga_satuan: 5000, total: 10000, keterangan: "" },
    { id: "s2", kategori: "Sekretaris", nama_barang: "MAP", jumlah: 2, satuan: "Pcs", harga_satuan: 5000, total: 10000, keterangan: "" },
    { id: "s3", kategori: "Sekretaris", nama_barang: "Amplop", jumlah: 1, satuan: "Pack", harga_satuan: 25000, total: 25000, keterangan: "" },

    // BENDAHARA
    { id: "b1", kategori: "Bendahara", nama_barang: "NOTA", jumlah: 1, satuan: "Pcs", harga_satuan: 10000, total: 10000, keterangan: "" },

    // PDD
    { id: "p1", kategori: "PDD", nama_barang: "Capcut premium", jumlah: 35, satuan: "Hari", harga_satuan: 1428, total: 50000, keterangan: "Total Rp50.000" },
    { id: "p2", kategori: "PDD", nama_barang: "Canva Premium", jumlah: 35, satuan: "Hari", harga_satuan: 571, total: 20000, keterangan: "Total Rp20.000" },
    { id: "p3", kategori: "PDD", nama_barang: "Google Drive Premium", jumlah: 35, satuan: "Hari", harga_satuan: 714, total: 25000, keterangan: "Total Rp25.000" },
    { id: "p4", kategori: "PDD", nama_barang: "Tripod", jumlah: 1, satuan: "Pcs", harga_satuan: 50000, total: 50000, keterangan: "" },
    { id: "p5", kategori: "PDD", nama_barang: "Id Card + Lanyard", jumlah: 20, satuan: "Set", harga_satuan: 1250, total: 25000, keterangan: "Harga total paket 20 set" },
    { id: "p6", kategori: "PDD", nama_barang: "Banner Posko", jumlah: 1, satuan: "2x1", harga_satuan: 80000, total: 80000, keterangan: "" },
    { id: "p7", kategori: "PDD", nama_barang: "Lakban Hitam", jumlah: 1, satuan: "Pcs", harga_satuan: 20000, total: 20000, keterangan: "" },
    { id: "p8", kategori: "PDD", nama_barang: "Kuota", jumlah: 150, satuan: "GB", harga_satuan: 1000, total: 150000, keterangan: "Total Rp150.000" },

    // PERALATAN
    { id: "e1", kategori: "Peralatan", nama_barang: "Panci Sayur", jumlah: 1, satuan: "Buah", harga_satuan: 120000, total: 120000, keterangan: "" },
    { id: "e2", kategori: "Peralatan", nama_barang: "Panci Mie", jumlah: 2, satuan: "Buah", harga_satuan: 30000, total: 60000, keterangan: "" },
    { id: "e3", kategori: "Peralatan", nama_barang: "Wajan Besar", jumlah: 2, satuan: "Buah", harga_satuan: 80000, total: 160000, keterangan: "" },
    { id: "e4", kategori: "Peralatan", nama_barang: "Teflon", jumlah: 2, satuan: "Buah", harga_satuan: 100000, total: 200000, keterangan: "" },
    { id: "e5", kategori: "Peralatan", nama_barang: "Rice Cooker 2L", jumlah: 1, satuan: "Unit", harga_satuan: 480000, total: 480000, keterangan: "" },
    { id: "e6", kategori: "Peralatan", nama_barang: "Centong Nasi", jumlah: 2, satuan: "Buah", harga_satuan: 5000, total: 10000, keterangan: "" },
    { id: "e7", kategori: "Peralatan", nama_barang: "Ulekan", jumlah: 1, satuan: "Set", harga_satuan: 50000, total: 50000, keterangan: "" },
    { id: "e8", kategori: "Peralatan", nama_barang: "Talenan", jumlah: 2, satuan: "Buah", harga_satuan: 16000, total: 32000, keterangan: "" },
    { id: "e9", kategori: "Peralatan", nama_barang: "Pisau Dapur", jumlah: 5, satuan: "Buah", harga_satuan: 20000, total: 100000, keterangan: "" },
    { id: "e10", kategori: "Peralatan", nama_barang: "Gunting", jumlah: 2, satuan: "Buah", harga_satuan: 9000, total: 18000, keterangan: "" },
    { id: "e11", kategori: "Peralatan", nama_barang: "Spatula", jumlah: 2, satuan: "Buah", harga_satuan: 17000, total: 34000, keterangan: "" },
    { id: "e12", kategori: "Peralatan", nama_barang: "Blender + chooper bumbu", jumlah: 1, satuan: "Set", harga_satuan: 192000, total: 192000, keterangan: "Han River" },
    { id: "e13", kategori: "Peralatan", nama_barang: "Serok Gorengan", jumlah: 1, satuan: "Buah", harga_satuan: 19000, total: 19000, keterangan: "" },
    { id: "e14", kategori: "Peralatan", nama_barang: "Saringan Kecil", jumlah: 1, satuan: "Buah", harga_satuan: 10000, total: 10000, keterangan: "" },
    { id: "e15", kategori: "Peralatan", nama_barang: "Teko", jumlah: 2, satuan: "Buah", harga_satuan: 41000, total: 82000, keterangan: "" },
    { id: "e16", kategori: "Peralatan", nama_barang: "Baskom Saringan Cuci 2 lapis", jumlah: 3, satuan: "Buah", harga_satuan: 12000, total: 36000, keterangan: "" },
    { id: "e17", kategori: "Peralatan", nama_barang: "Nampan Stainless", jumlah: 3, satuan: "Buah", harga_satuan: 19000, total: 57000, keterangan: "" },
    { id: "e18", kategori: "Peralatan", nama_barang: "Penjepit Makanan", jumlah: 1, satuan: "Buah", harga_satuan: 13000, total: 13000, keterangan: "" },
    { id: "e19", kategori: "Peralatan", nama_barang: "Parutan Menara Set", jumlah: 1, satuan: "Buah", harga_satuan: 34000, total: 34000, keterangan: "" },
    { id: "e20", kategori: "Peralatan", nama_barang: "Sendok Sayur", jumlah: 2, satuan: "Buah", harga_satuan: 10000, total: 20000, keterangan: "" },
    { id: "e21", kategori: "Peralatan", nama_barang: "Peeler", jumlah: 2, satuan: "Buah", harga_satuan: 10000, total: 20000, keterangan: "" },

    // BAHAN KONSUMSI
    { id: "k1", kategori: "Bahan Konsumsi", nama_barang: "Beras", jumlah: 1, satuan: "Karung (25kg)", harga_satuan: 360000, total: 360000, keterangan: "" },
    { id: "k2", kategori: "Bahan Konsumsi", nama_barang: "Minyak Goreng Tropical 2L", jumlah: 1, satuan: "Liter", harga_satuan: 55000, total: 55000, keterangan: "" },
    { id: "k3", kategori: "Bahan Konsumsi", nama_barang: "Mie Sedap Goreng", jumlah: 0.5, satuan: "Kardus", harga_satuan: 136000, total: 68000, keterangan: "" },
    { id: "k4", kategori: "Bahan Konsumsi", nama_barang: "Mie Indomie Rebus", jumlah: 0.5, satuan: "Kardus", harga_satuan: 140000, total: 70000, keterangan: "Kaldu Ayam" },
    { id: "k5", kategori: "Bahan Konsumsi", nama_barang: "Teh", jumlah: 1, satuan: "Kotak", harga_satuan: 40000, total: 40000, keterangan: "" },
    { id: "k6", kategori: "Bahan Konsumsi", nama_barang: "Susu SKM Putih", jumlah: 2, satuan: "Renceng", harga_satuan: 11000, total: 22000, keterangan: "" },
    { id: "k7", kategori: "Bahan Konsumsi", nama_barang: "Susu SKM Cokelat", jumlah: 2, satuan: "Renceng", harga_satuan: 11000, total: 22000, keterangan: "" },
    { id: "k8", kategori: "Bahan Konsumsi", nama_barang: "Kopi Good Day Freeze", jumlah: 1, satuan: "Renceng", harga_satuan: 30000, total: 30000, keterangan: "" },
    { id: "k9", kategori: "Bahan Konsumsi", nama_barang: "Kopi Good Day Merah", jumlah: 1, satuan: "Renceng", harga_satuan: 22000, total: 22000, keterangan: "" },
    { id: "k10", kategori: "Bahan Konsumsi", nama_barang: "Penyedap rasa", jumlah: 1, satuan: "Renceng", harga_satuan: 8000, total: 8000, keterangan: "Masako/Royko" },
    { id: "k11", kategori: "Bahan Konsumsi", nama_barang: "Kaldu Jamur", jumlah: 1, satuan: "Bungkus", harga_satuan: 14500, total: 14500, keterangan: "" },
    { id: "k12", kategori: "Bahan Konsumsi", nama_barang: "Micin (MSG)", jumlah: 1, satuan: "Bungkus", harga_satuan: 10000, total: 10000, keterangan: "" },
    { id: "k13", kategori: "Bahan Konsumsi", nama_barang: "Garam", jumlah: 1, satuan: "Bungkus", harga_satuan: 10500, total: 10500, keterangan: "" },
    { id: "k14", kategori: "Bahan Konsumsi", nama_barang: "Gula Pasir", jumlah: 1, satuan: "Kg", harga_satuan: 26500, total: 26500, keterangan: "" },
    { id: "k15", kategori: "Bahan Konsumsi", nama_barang: "Lada Bubuk", jumlah: 1, satuan: "Renceng", harga_satuan: 15000, total: 15000, keterangan: "" },
    { id: "k16", kategori: "Bahan Konsumsi", nama_barang: "Bawang Putih Bubuk", jumlah: 1, satuan: "Renceng", harga_satuan: 17500, total: 17500, keterangan: "" },
    { id: "k17", kategori: "Bahan Konsumsi", nama_barang: "Bumbu Racik Nasi Goreng", jumlah: 1, satuan: "Renceng", harga_satuan: 20000, total: 20000, keterangan: "" },
    { id: "k18", kategori: "Bahan Konsumsi", nama_barang: "Bumbu Racik Ayam Goreng", jumlah: 1, satuan: "Renceng", harga_satuan: 25500, total: 25500, keterangan: "" },
    { id: "k19", kategori: "Bahan Konsumsi", nama_barang: "Bumbu Racik Sayur Sop", jumlah: 1, satuan: "Renceng", harga_satuan: 23500, total: 23500, keterangan: "" },
    { id: "k20", kategori: "Bahan Konsumsi", nama_barang: "Bumbu Racik Sayur Asem", jumlah: 1, satuan: "Renceng", harga_satuan: 27000, total: 27000, keterangan: "" },
    { id: "k21", kategori: "Bahan Konsumsi", nama_barang: "Bumbu Racik Sayur Lodeh", jumlah: 1, satuan: "Renceng", harga_satuan: 25500, total: 25500, keterangan: "" },
    { id: "k22", kategori: "Bahan Konsumsi", nama_barang: "Tepung Bumbu serbaguna", jumlah: 5, satuan: "Bungkus", harga_satuan: 11000, total: 55000, keterangan: "" },
    { id: "k23", kategori: "Bahan Konsumsi", nama_barang: "Kecap Manis", jumlah: 1, satuan: "Botol", harga_satuan: 13500, total: 13500, keterangan: "" },
    { id: "k24", kategori: "Bahan Konsumsi", nama_barang: "Saus Sambal", jumlah: 1, satuan: "Botol", harga_satuan: 17000, total: 17000, keterangan: "" },
    { id: "k25", kategori: "Bahan Konsumsi", nama_barang: "Saus Tomat", jumlah: 1, satuan: "Botol", harga_satuan: 15000, total: 15000, keterangan: "" },
    { id: "k26", kategori: "Bahan Konsumsi", nama_barang: "Saus Tiram", jumlah: 1, satuan: "Renceng", harga_satuan: 37000, total: 37000, keterangan: "" },
    { id: "k27", kategori: "Bahan Konsumsi", nama_barang: "Telur", jumlah: 1, satuan: "Tray (30 butir)", harga_satuan: 65000, total: 65000, keterangan: "" },
    { id: "k28", kategori: "Bahan Konsumsi", nama_barang: "Santan Instan", jumlah: 5, satuan: "Bungkus", harga_satuan: 6000, total: 30000, keterangan: "" },
    { id: "k29", kategori: "Bahan Konsumsi", nama_barang: "Cuka", jumlah: 1, satuan: "Botol", harga_satuan: 6500, total: 6500, keterangan: "" }
];

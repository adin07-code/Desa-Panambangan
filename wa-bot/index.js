/* eslint-disable */
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Menggunakan koneksi Supabase dari .env.local website (bisa disesuaikan jika perlu)
const supabaseUrl = 'https://ezpeubdupglrvoauwooh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6cGV1YmR1cGdscnZvYXV3b29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTY0MjcsImV4cCI6MjEwMzMzMjQyN30.0D0QfRlTsSwSi3bZTO9HGFYyXDOk474S6L4yEfH3YKQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const absensiFile = path.join(__dirname, 'data_absensi.json');
const usersFile = path.join(__dirname, 'data_users.json');

// Session untuk menyimpan nomor WA yang sudah login sebagai Sie Konsumsi
const loggedInKonsumsi = new Set();
const loggedInBendahara = new Set();

// Detect if running on Android (Termux)

const isAndroid = os.platform() === 'android';

const puppeteerConfig = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};

// If in Termux, point to the native chromium package
if (isAndroid) {
    puppeteerConfig.executablePath = '/data/data/com.termux/files/usr/bin/chromium-browser';
}

// Initialize the client with LocalAuth so the session is saved and you don't need to scan the QR code every time
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerConfig
});

// Generate and display the QR code in the terminal
client.on('qr', (qr) => {
    console.log('\n--- SCAN QR CODE INI MENGGUNAKAN WHATSAPP ANDA ---');
    qrcode.generate(qr, { small: true });
    console.log('---------------------------------------------------\n');
});

// Triggered when the client is successfully authenticated and ready
client.on('ready', () => {
    console.log('✅ Bot WhatsApp KKM 14 Berhasil Aktif dan Siap Digunakan!');
});

// Triggered when a message is received
client.on('message', async (message) => {
    // Convert message to lowercase to make it case-insensitive
    const text = message.body.toLowerCase();

    // Command: !ping
    if (text === '!ping' || text === 'ping') {
        await message.reply('Pong! 🏓 Bot KKM 14 aktif.');
    }

    // Command: !bantuan or !help
    else if (text === '!bantuan' || text === '!help' || text === 'help') {
        const helpText = `*🤖 BANTUAN BOT KKM 14*

Berikut adalah beberapa perintah yang bisa Anda gunakan:
1. *!ping* - Mengecek status bot
2. *!bantuan* - Menampilkan menu ini
3. *!jadwal* - Menampilkan link ke website jadwal piket
4. *!absensi* - Menampilkan menu absensi & rekapan kehadiran hari ini
5. *!logbook* - Menampilkan link ke pengisian logbook harian
6. *!rundown* - Menampilkan rundown kegiatan 1 bulan
7. *!mandi* - Menampilkan urutan mandi harian
8. *!keuangan* - Menampilkan ringkasan laporan keuangan
9. *!pengeluaran* - Menginput data pengeluaran baru (Untuk Semua)

*Khusus Pengurus:*
9. *!siekonsumsi* - Menu khusus Edit Jadwal Piket & Menu (Terkunci 🔒)
10. *!bendahara* - Menu khusus Edit Laporan Keuangan (Terkunci 🔒)

_Ketik perintah di atas untuk menggunakan fitur bot._`;
        await message.reply(helpText);
    }

    // Command: !jadwal
    else if (text === '!jadwal' || text === 'jadwal') {
        await message.reply('⏳ Sedang menarik jadwal dari website...');
        try {
            const res = await fetch(`https://desa-panambangan.vercel.app/api/piket?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('Gagal memuat API');
            
            const result = await res.json();
            const scheduleData = result.data || [];
            
            // Dapatkan tanggal hari ini di zona waktu WIB
            const today = new Date();
            const wibTime = new Date(today.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
            const d = wibTime.getDate();
            const y = wibTime.getFullYear();
            const m = wibTime.getMonth();
            
            const monthsShort = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "agu", "sep", "okt", "nov", "des"];
            const monthsLong = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];

            // Cari jadwal yang cocok dengan hari ini
            const todaySchedule = scheduleData.find(item => {
                const dateStr = (item.date || '').toLowerCase();
                // Beberapa penulisan mungkin "26", "26 ", "026" (typo) - kita cek awalan
                const dayMatch = dateStr.startsWith(d.toString() + ' ') || dateStr.startsWith('0' + d.toString() + ' ');
                const monthMatch = dateStr.includes(monthsShort[m]) || 
                                   dateStr.includes(monthsLong[m]) ||
                                   (m === 7 && dateStr.includes('aug')); // Special case untuk Agustus di sheet
                const yearMatch = dateStr.includes(y.toString());
                return dayMatch && monthMatch && yearMatch;
            });

            if (!todaySchedule) {
                await message.reply(`📅 *Jadwal Piket KKM 14*\n\nBelum ada jadwal untuk hari ini di sistem.\nCek selengkapnya di: https://desa-panambangan.vercel.app/piket`);
                return;
            }

            let reply = `📅 *Jadwal Piket Hari Ini*\n*${todaySchedule.day}, ${todaySchedule.date}*\n\n`;
            
            reply += `🧹 *TIM KEBERSIHAN:*\n`;
            if (todaySchedule.kebersihan && todaySchedule.kebersihan.length > 0) {
                todaySchedule.kebersihan.forEach(p => reply += `- ${p}\n`);
            } else {
                reply += `- (Kosong)\n`;
            }
            
            reply += `\n🍳 *TIM MEMASAK:*\n`;
            if (todaySchedule.masak && todaySchedule.masak.length > 0) {
                todaySchedule.masak.forEach(p => reply += `- ${p}\n`);
            } else {
                reply += `- (Kosong)\n`;
            }

            reply += `\n🍽️ *MENU HARI INI:*\n`;
            reply += `- Siang: ${todaySchedule.menuSiang || '-'}\n`;
            reply += `- Malam: ${todaySchedule.menuSore || '-'}\n`;
            
            reply += `\n_Cek selengkapnya: https://desa-panambangan.vercel.app/piket_`;
            
            await message.reply(reply);
        } catch (e) {
            await message.reply('❌ Terjadi kesalahan saat menarik jadwal dari website.\n\nSilakan cek manual: https://desa-panambangan.vercel.app/piket');
            console.error(e);
        }
    }

    // Command: !absensi
    else if (text === '!absensi' || text === 'absensi') {
        await message.reply('⏳ Sedang memuat data absensi hari ini...');
        try {
            const res = await fetch(`https://desa-panambangan.vercel.app/api/absensi?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('Gagal memuat API');
            
            const result = await res.json();
            const absensiData = result.data || [];
            
            let reply = '📝 *SISTEM ABSENSI KKM 14*\n\n';
            reply += '📋 *Rekapan Kehadiran Hari Ini:*\n';
            
            if (absensiData.length === 0) {
                reply += '_Belum ada yang absen hari ini._\n';
            } else {
                absensiData.forEach((item, index) => {
                    const time = new Date(item.receivedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                    const namaBersih = item.nama_lengkap.trim().toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    reply += `${index + 1}. *${namaBersih}* - _${time}_\n`;
                });
            }

            reply += '\n---\n💡 *CARA MENGISI ABSENSI:*\n';
            reply += '1️⃣ Jika belum terdaftar, daftar dulu dengan perintah:\n';
            reply += '*!daftar [Email] - [Nama] - [NIM] - [Prodi]*\n';
            reply += '_(Contoh: !daftar budi@gmail.com - Budi - 12345 - Teknik Informatika)_\n\n';
            reply += '2️⃣ Jika sudah terdaftar, ketik perintah:\n';
            reply += '*!hadir*\n\n';
            reply += '_Isi absen manual:_ https://desa-panambangan.vercel.app/absensi';

            await message.reply(reply);
        } catch (e) {
            await message.reply('❌ Terjadi kesalahan saat menarik data.\n\n_Isi absen manual melalui website:_ https://desa-panambangan.vercel.app/absensi');
            console.error(e);
        }
    }

    // Command: !logbook
    else if (text === '!logbook' || text === 'logbook') {
        await message.reply('📖 *Logbook Harian KKM 14*\n\nJangan lupa isi logbook harian Anda melalui link berikut:\nhttps://drive.google.com/drive/folders/1cEQ3LK5ovNZ0swVoM5X29TTWPeMj7Gyd');
    }

    // Command: !rundown
    else if (text === '!rundown' || text === 'rundown') {
        await message.reply('📄 *Rundown 1 Bulan KKM 14*\n\nSilakan cek detail rundown kegiatan kita selama 1 bulan penuh melalui link berikut:\nhttps://docs.google.com/document/d/1vO67-m_gBJYlS53Yn8OAhs6c5OheWpMsyWQm2kVuBfQ/edit?tab=t.0');
    }
    
    // Command: !keuangan
    else if (text === '!keuangan' || text === 'keuangan') {
        await message.reply('⏳ Sedang memuat rekapan laporan keuangan...');
        try {
            const res = await fetch(`https://desa-panambangan.vercel.app/api/keuangan?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('Gagal memuat API');
            
            const result = await res.json();
            const keuanganData = result.data || [];
            
            const wibTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
            const y = wibTime.getFullYear();
            const m = (wibTime.getMonth() + 1).toString().padStart(2, '0');
            const d = wibTime.getDate().toString().padStart(2, '0');
            const todayStr = `${y}-${m}-${d}`;

            let totalPemasukanKkm = 0;
            let totalPengeluaranKkm = 0;
            let totalPemasukanPribadi = 0;
            let totalPengeluaranPribadi = 0;

            const todayItems = [];
            let todayTotal = 0;

            keuanganData.forEach(item => {
                if (item.pemasukanKkm) totalPemasukanKkm += item.pemasukanKkm;
                if (item.pengeluaranKkm) totalPengeluaranKkm += item.pengeluaranKkm;
                if (item.pemasukanPribadi) totalPemasukanPribadi += item.pemasukanPribadi;
                if (item.pengeluaranPribadi) totalPengeluaranPribadi += item.pengeluaranPribadi;

                if (item.tanggal === todayStr && item.namaBarang && !item.namaBarang.toLowerCase().includes('saldo awal')) {
                    if (item.pengeluaranKkm || item.pengeluaranPribadi || item.totalBarang) {
                        todayItems.push(item);
                        todayTotal += (item.pengeluaranKkm || 0) + (item.pengeluaranPribadi || 0);
                    }
                }
            });

            const saldoKkm = totalPemasukanKkm - totalPengeluaranKkm;
            const saldoPribadi = totalPemasukanPribadi - totalPengeluaranPribadi;

            const formatRp = (angka) => {
                if (angka === 0) return 'Rp 0';
                const abs = Math.abs(angka);
                const str = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(abs);
                return angka < 0 ? `-${str}` : str;
            };

            let reply = `📊 *LAPORAN KEUANGAN (SIE KONSUMSI)*\n\n`;
            reply += `💰 *Sisa Kas KKM:* ${formatRp(saldoKkm)}\n`;
            reply += `💰 *Sisa Kas Pribadi:* ${formatRp(saldoPribadi)}\n\n`;

            reply += `🛒 *PENGELUARAN HARI INI (${d}/${m}/${y}):*\n`;
            if (todayItems.length > 0) {
                todayItems.forEach((item, idx) => {
                    const itemName = item.namaBarang;
                    const pcs = item.pcs || '1';
                    const hargaSatuan = item.hargaSatuan ? formatRp(item.hargaSatuan) : '-';
                    const totalItem = formatRp((item.pengeluaranKkm || 0) + (item.pengeluaranPribadi || 0));
                    
                    reply += `${idx + 1}. *${itemName}*\n`;
                    reply += `   └ ${pcs} pcs x ${hargaSatuan} = ${totalItem}\n`;
                });
                reply += `\n*Total Hari Ini:* ${formatRp(todayTotal)}\n\n`;
            } else {
                reply += `_Belum ada data pengeluaran hari ini._\n\n`;
            }
            
            reply += `_Cek rincian buku kas selengkapnya:_\nhttps://desa-panambangan.vercel.app/laporan-keuangan`;
            
            await message.reply(reply);
        } catch (e) {
            await message.reply('❌ Terjadi kesalahan saat menarik data keuangan.\n\n_Cek manual di website:_ https://desa-panambangan.vercel.app/laporan-keuangan');
            console.error(e);
        }
    }
    
    // Command: !mandi
    else if (text === '!mandi' || text === 'mandi') {
        const reply = `🚿 *Jadwal Urutan Mandi (Mulai 05.00)* 🚿

1. Ulin 05.00
2. Anis 05.10
3. Indah 05.20
4. Alin 05.30
5. Rikeu 05.40
6. Dini 05.50
7. Nabila & Dea 06.00
8. Faisal 06.10
9. Puspa 06.20
10. Adin 06.30
11. Robi 06.40
12. Putri 06.50
13. Faqih 07.00
14. Aisy 07.10
15. Iky 07.20
16. Maisya 07.30
17. Fauzi 07.40`;
        await message.reply(reply);
    }

    // Command: !siekonsumsi (Terkunci dengan password)
    else if (text.startsWith('!siekonsumsi')) {
        const input = text.split(' ');
        if (input.length < 2) {
            await message.reply('🔒 *Menu Terkunci!*\n\nIni adalah menu khusus Sie Konsumsi. Silakan masukkan password untuk mengaksesnya.\n\nFormat:\n*!siekonsumsi [password]*');
            return;
        }

        const password = input[1];
        if (password === 'konsumsi14') {
            const phone = message.author || message.from;
            loggedInKonsumsi.add(phone);
            
            await message.reply('🔓 *Akses Diberikan!*\n\n📝 *Link Edit Jadwal Piket & Menu (Khusus Konsumsi)*\n\nSilakan buka link Google Sheets berikut untuk mengubah jadwal secara manual:\nhttps://docs.google.com/spreadsheets/d/1ZIM8Eq3lQUfnK7kAUK90A-QwQvhCyA4lPbzxlT5j2Uo/edit?usp=sharing\n\nAtau kamu juga bisa mengubahnya langsung dari chat ini dengan mengetik perintah:\n*!update*');
        } else {
            await message.reply('❌ *Password Salah!* Akses ditolak.');
        }
    }

    // Command: !bendahara
    else if (text.startsWith('!bendahara')) {
        const input = text.split(' ');
        if (input.length < 2) {
            await message.reply('🔒 *Menu Terkunci!*\n\nIni adalah menu khusus Bendahara. Silakan masukkan password untuk mengaksesnya.\n\nFormat:\n*!bendahara [password]*');
            return;
        }

        const password = input[1];
        if (password === 'bendahara14') {
            const phone = message.author || message.from;
            loggedInBendahara.add(phone);
            
            await message.reply('🔓 *Akses Diberikan!*\n\nHalo Bendahara! Kamu sekarang bisa memasukkan Pemasukan atau Pengeluaran kapan saja dengan mengirimkan format berikut:\n\n*INPUT KEUANGAN*\n`!inputkeuangan`\n`Tanggal : `\n`Keterangan : `\n`Pemasukan : `\n`Pengeluaran : `\n\nContoh:\n`!inputkeuangan`\n`Tanggal : 25 Agu 2026`\n`Keterangan : Kas Masuk dari Desa`\n`Pemasukan : 500000`\n`Pengeluaran : 0`');
        } else {
            await message.reply('❌ *Password Salah!* Akses ditolak.');
        }
    }
    
    // Command: !update
    else if (text === '!update' || text === 'update') {
        const phone = message.author || message.from;
        
        if (!loggedInKonsumsi.has(phone)) {
            await message.reply('🔒 *Akses Ditolak!*\n\nKamu harus login terlebih dahulu menggunakan perintah:\n*!siekonsumsi [password]*');
            return;
        }

        const template = `Pilih data yang ingin diubah dengan membalas (copy-paste & isi) salah satu format di bawah ini. Kosongkan baris yang tidak ingin diubah.

*1. UPDATE MENU*
!updatemenu
Tanggal : 
Siang : 
Sore : 

*2. UPDATE KEBERSIHAN*
!updatekebersihan
Tanggal : 
Nama : 

*3. UPDATE YANG MEMASAK*
!updatemasak
Tanggal : 
Siang : 
Sore : 

*4. INPUT PENGELUARAN (KONSUMSI)*
!pengeluaran
Tanggal : (YYYY-MM-DD, cth: 2026-08-29)
Nama Barang : 
Siapa Beli : 
Pcs : 
Harga Satuan : 
Kas : (KKM / Pribadi)

*(Pastikan mengetik Tanggal dengan format YYYY-MM-DD)*`;

        await message.reply(template);
    }

    // Command: !updatemenu, !updatekebersihan, !updatemasak (Bisa Digabung)
    else if (text.includes('!updatemenu') || text.includes('!updatekebersihan') || text.includes('!updatemasak')) {
        const phone = message.author || message.from;
        
        if (!loggedInKonsumsi.has(phone)) {
            await message.reply('🔒 *Akses Ditolak!*\n\nKamu harus login terlebih dahulu menggunakan perintah:\n*!siekonsumsi [password]*');
            return;
        }

        // Split pesan berdasarkan kata !update
        const blocks = message.body.split(/(?=!update)/i).map(b => b.trim()).filter(b => b.length > 0);
        
        let replyMsg = '';
        let successCount = 0;
        let failCount = 0;

        await message.reply(`⏳ Sedang memproses ${blocks.length} perintah update...`);

        for (const block of blocks) {
            const lines = block.split('\n');
            const cmd = lines[0].toLowerCase().trim();
            
            if (!cmd.startsWith('!updatemenu') && !cmd.startsWith('!updatekebersihan') && !cmd.startsWith('!updatemasak')) {
                continue;
            }

            const getValue = (key) => {
                const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase()));
                return line ? line.substring(line.indexOf(':') + 1).trim() : '';
            };

            let tanggal = getValue('Tanggal');
            if (!tanggal) {
                replyMsg += `❌ *Gagal (${cmd}):* Baris "Tanggal :" tidak ditemukan.\n`;
                failCount++;
                continue;
            }

            // Normalisasi format bulan agar persis seperti di Google Sheets
            tanggal = tanggal
                .replace(/\bSep\b/gi, 'September')
                .replace(/\bOkt\b/gi, 'Oktober')
                .replace(/\bNov\b/gi, 'November')
                .replace(/\bDes\b/gi, 'Desember')
                .replace(/\bJan\b/gi, 'Januari')
                .replace(/\bFeb\b/gi, 'Februari')
                .replace(/\bMar\b/gi, 'Maret')
                .replace(/\bApr\b/gi, 'April')
                .replace(/\bAgu\b/gi, 'Aug'); // Sheet menggunakan "Aug"

            const payload = { tanggal: tanggal };
            let tipeUpdate = '';

            if (cmd.startsWith('!updatemenu')) {
                tipeUpdate = 'Menu Makanan';
                payload.menuSiang = getValue('Siang');
                payload.menuSore = getValue('Sore');
            } 
            else if (cmd.startsWith('!updatekebersihan')) {
                tipeUpdate = 'Petugas Kebersihan';
                payload.kebersihan = getValue('Nama');
            }
            else if (cmd.startsWith('!updatemasak')) {
                tipeUpdate = 'Yang Memasak';
                payload.masakSiang = getValue('Siang');
                payload.masakSore = getValue('Sore');
            }

            const webhookUrl = 'https://script.google.com/macros/s/AKfycbxBPIIDHLGoYUvxONI1m0re8dpgMggBNXiABW2bnecTq2j-IVviCG91ZRBsla-dUtD1Kg/exec';
            
            try {
                const res = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await res.json();

                if (result.status === 'success') {
                    replyMsg += `✅ *Sukses:* ${tipeUpdate} (${tanggal})\n`;
                    successCount++;
                } else {
                    replyMsg += `❌ *Gagal:* ${tipeUpdate} (${tanggal}) - ${result.message}\n`;
                    failCount++;
                }
            } catch (error) {
                replyMsg += `❌ *Error Server:* ${tipeUpdate} (${tanggal})\n`;
                failCount++;
            }
        }

        if (successCount > 0 || failCount > 0) {
            await message.reply(`*Hasil Update:*\n\n${replyMsg}`);
        }
    }

    // Command: !pengeluaran
    else if (text.startsWith('!pengeluaran')) {
        const blocks = message.body.split(/(?=!pengeluaran)/i).map(b => b.trim()).filter(b => b.length > 0);
        
        // Jika hanya memanggil !pengeluaran tanpa argumen, kirimkan template
        if (blocks.length === 1) {
            const lines = blocks[0].split('\n');
            if (lines.length === 1) {
                const template = `🛒 *INPUT PENGELUARAN*\nSilakan copy-paste pesan ini, isi, lalu kirimkan kembali:\n*(Bisa di-copy-paste beberapa kali dalam satu pesan jika ada banyak barang)*\n\n!pengeluaran\nTanggal : (YYYY-MM-DD, cth: 2026-08-29)\nNama Barang : \nSiapa Beli : \nPcs : \nHarga Satuan : \nKas : (KKM / Pribadi)`;
                await message.reply(template);
                return;
            }
        }

        let successCount = 0;
        let failCount = 0;
        let replyMsg = '';
        const insertPromises = [];

        for (const block of blocks) {
            const lines = block.split('\n');
            const getValue = (key) => {
                const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase()));
                return line ? line.substring(line.indexOf(':') + 1).trim() : '';
            };

            let tanggal = getValue('Tanggal');
            const namaBarang = getValue('Nama Barang');
            const siapaBeli = getValue('Siapa Beli');
            let pcsStr = getValue('Pcs');
            let hargaSatuanStr = getValue('Harga Satuan');
            const kas = getValue('Kas');
            
            // Coba parsing tanggal jika format DD MMM YYYY
            if (tanggal && !tanggal.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const dMatch = tanggal.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
                if (dMatch) {
                    const dd = dMatch[1].padStart(2, '0');
                    const mmm = dMatch[2].toLowerCase();
                    const yyyy = dMatch[3];
                    const months = {jan:'01',feb:'02',mar:'03',apr:'04',mei:'05',jun:'06',jul:'07',agu:'08',sep:'09',okt:'10',nov:'11',des:'12'};
                    const mm = months[mmm.substring(0,3)] || '01';
                    tanggal = `${yyyy}-${mm}-${dd}`;
                }
            }
            
            if (!tanggal || !namaBarang || !kas || !hargaSatuanStr) {
                replyMsg += `❌ *Gagal:* Format tidak lengkap untuk barang "${namaBarang || 'Tanpa Nama'}".\n`;
                failCount++;
                continue;
            }

            const pcs = pcsStr ? parseInt(pcsStr.replace(/[^0-9]/g, '')) || 1 : 1;
            const hargaSatuan = parseInt(hargaSatuanStr.replace(/[^0-9]/g, '')) || 0;
            const totalBarang = pcs * hargaSatuan;
            
            const isKkm = kas.toLowerCase().includes('kkm');
            const pengeluaranKkm = isKkm ? totalBarang : null;
            const pengeluaranPribadi = !isKkm ? totalBarang : null;

            insertPromises.push(
                supabase.from('keuangan_konsumsi').insert({
                    tanggal, namaBarang, siapaBeli: siapaBeli || 'Sie Konsumsi', pcs, hargaSatuan, totalBarang, pengeluaranKkm, pengeluaranPribadi, sisaBarang: '-'
                }).then(({error}) => {
                    if (error) {
                        replyMsg += `❌ *Gagal DB:* ${namaBarang}\n`;
                        failCount++;
                    } else {
                        replyMsg += `✅ *Sukses:* ${namaBarang} (Rp ${totalBarang})\n`;
                        successCount++;
                    }
                })
            );
        }

        if (insertPromises.length > 0) {
            await message.reply(`⏳ Sedang menyimpan ${insertPromises.length} item pengeluaran...`);
            await Promise.all(insertPromises);
            await message.reply(`*Hasil Input Pengeluaran:*\n\n${replyMsg}`);
        } else if (failCount > 0) {
            await message.reply(`*Hasil Input Pengeluaran:*\n\n${replyMsg}`);
        }
    }

    // Command: !inputkeuangan (Bendahara)
    else if (text.startsWith('!inputkeuangan')) {
        const phone = message.author || message.from;
        if (!loggedInBendahara.has(phone)) {
            await message.reply('🔒 *Akses Ditolak!*\n\nKamu harus login terlebih dahulu menggunakan perintah:\n*!bendahara [password]*');
            return;
        }

        const lines = message.body.split('\n');
        const getValue = (key) => {
            const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase()));
            return line ? line.substring(line.indexOf(':') + 1).trim() : '';
        };

        let tanggal = getValue('Tanggal');
        const keterangan = getValue('Keterangan');
        let pemasukan = getValue('Pemasukan');
        let pengeluaran = getValue('Pengeluaran');
        
        // Normalisasi format bulan agar persis seperti di Google Sheets
        if (tanggal) {
            tanggal = tanggal
                .replace(/\bSep\b/gi, 'September')
                .replace(/\bOkt\b/gi, 'Oktober')
                .replace(/\bNov\b/gi, 'November')
                .replace(/\bDes\b/gi, 'Desember')
                .replace(/\bJan\b/gi, 'Januari')
                .replace(/\bFeb\b/gi, 'Februari')
                .replace(/\bMar\b/gi, 'Maret')
                .replace(/\bApr\b/gi, 'April')
                .replace(/\bAgu\b/gi, 'Aug');
        }
        
        if (!tanggal || !keterangan) {
            await message.reply('❌ *Gagal:* Pastikan Tanggal dan Keterangan sudah diisi semua.');
            return;
        }
        
        pemasukan = pemasukan ? pemasukan.replace(/[^0-9]/g, '') : "0";
        pengeluaran = pengeluaran ? pengeluaran.replace(/[^0-9]/g, '') : "0";

        await message.reply(`⏳ Sedang merekap data Keuangan untuk tanggal *${tanggal}*...`);

        const webhookKeuangan = 'https://script.google.com/macros/s/AKfycbyw2NQMoDJ1BVfHTp0T5Yh9l5feT5xb6xvultE-KPwqhKUvsO4TBQsNCY9JJ0RvpahM/exec';
        if (webhookKeuangan === 'INSERT_WEBHOOK_KEUANGAN_HERE') {
            await message.reply('⚠️ *Sistem Belum Siap*\nWebhook URL Keuangan belum dikonfigurasi.');
            return;
        }

        try {
            const payload = {
                tanggal: tanggal,
                keterangan: keterangan,
                pemasukan: pemasukan,
                pengeluaran: pengeluaran
            };

            const res = await fetch(webhookKeuangan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            if (result.status === 'success') {
                await message.reply(`✅ *Berhasil Disimpan!*\n\nData Keuangan untuk tanggal *${tanggal}* telah ditambahkan ke Laporan Keuangan di Website.`);
            } else {
                await message.reply(`❌ *Gagal:* ${result.message}`);
            }
        } catch (error) {
            console.error('Gagal mengirim keuangan:', error);
            await message.reply('❌ Terjadi kesalahan saat menghubungi server Google Sheets Keuangan.');
        }
    }

    // Command: halo
    else if (text === 'halo' || text === 'halo bot') {
        await message.reply('Halo! 👋 Saya adalah Bot Asisten KKM 14 Desa Panambangan. Ketik *!bantuan* untuk melihat apa saja yang bisa saya lakukan.');
    }

    // Command: !daftar
    else if (text.startsWith('!daftar')) {
        const input = message.body.substring(7).trim();
        if (!input) {
            await message.reply('❌ *Format salah!*\n\nGunakan format:\n*!daftar [Email] - [Nama] - [NIM] - [Prodi]*\n\nContoh:\n*!daftar budi@gmail.com - Budi Santoso - 123456 - Teknik Informatika*');
            return;
        }

        const parts = input.split('-');
        if (parts.length < 4) {
            await message.reply('❌ *Data kurang lengkap!* Pastikan ada Email, Nama, NIM, dan Prodi yang dipisahkan dengan tanda hubung (-).');
            return;
        }

        const email = parts[0].replace(/[\[\]]/g, '').trim();
        const nama = parts[1].replace(/[\[\]]/g, '').trim();
        const nim = parts[2].replace(/[\[\]]/g, '').trim();
        let prodi = parts[3].replace(/[\[\]]/g, '').trim();
        
        // Perbaiki kapitalisasi prodi agar cocok dengan pilihan di Google Form
        const validProdi = [
            'Teknik Informatika', 'Ilmu Gizi', 'Manajemen', 'Ilmu Komunikasi',
            'Akuntansi', 'Ilmu Keperawatan', 'PGSD', 'Ilmu Hukum',
            'Tasawuf dan Psikoterapi', 'Pend. Bahasa Inggris', 'Ilmu Pemerintahan', 'Peternakan'
        ];
        
        const searchProdi = prodi.toLowerCase().replace(/&/g, 'dan').replace(/pendidikan/g, 'pend.');
        let matchedProdi = validProdi.find(p => p.toLowerCase() === searchProdi || searchProdi.includes(p.toLowerCase()));
        
        if (matchedProdi) {
            prodi = matchedProdi;
        } else if (prodi.toLowerCase() === 'pgsd') {
            prodi = 'PGSD';
        } else {
            prodi = prodi.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        
        // Gunakan message.author jika di grup, atau message.from jika di DM
        const phone = message.author || message.from;

        try {
            const { error } = await supabase
                .from('wa_users')
                .upsert({ phone, email, nama, nim, prodi }, { onConflict: 'phone' });
            
            if (error) {
                console.error("Supabase Error:", error);
                await message.reply('❌ Terjadi kesalahan saat menyimpan data ke database. Pastikan tabel `wa_users` sudah dibuat di Supabase.');
                return;
            }

            await message.reply(`✅ *Pendaftaran Berhasil!*\n\nNomor WA kamu sudah terhubung dengan data:\n*Nama:* ${nama}\n*NIM:* ${nim}\n*Prodi:* ${prodi}\n\nSekarang kamu cukup ketik *!hadir* setiap hari untuk absen otomatis!`);
        } catch (e) {
            console.error(e);
            await message.reply('❌ Terjadi kesalahan internal saat mencoba menyimpan pendaftaran.');
        }
    }

    // Command: !hadir
    else if (text === '!hadir' || text === 'hadir') {
        // Gunakan message.author jika di grup, atau message.from jika di DM
        const phone = message.author || message.from;
        
        let user;
        try {
            const { data, error } = await supabase
                .from('wa_users')
                .select('*')
                .eq('phone', phone)
                .single();
                
            if (error || !data) {
                await message.reply('❌ *Nomor WA belum terdaftar!*\nSilakan daftar dulu dengan perintah:\n*!daftar [Email] - [Nama] - [NIM] - [Prodi]*\n\n_(Jika sudah daftar namun muncul pesan ini, admin perlu mengecek tabel `wa_users` di Supabase)_');
                return;
            }
            user = data;
        } catch (e) {
            console.error(e);
            await message.reply('❌ Gagal memeriksa database pendaftaran.');
            return;
        }

        try {
            await message.reply('⏳ Sedang mengecek status absensi...');
            
            // Cek apakah sudah absen hari ini
            const checkRes = await fetch(`https://desa-panambangan.vercel.app/api/absensi?t=${new Date().getTime()}`);
            if (checkRes.ok) {
                const checkResult = await checkRes.json();
                const absensiData = checkResult.data || [];
                
                // Cari apakah NIM user sudah ada di data absensi hari ini
                const sudahAbsen = absensiData.find(item => item.nim === user.nim);
                if (sudahAbsen) {
                    await message.reply(`✅ *Anda sudah hadir hari ini!*\n\nData absensi atas nama *${user.nama}* sudah tercatat pada sistem.`);
                    return; // Stop eksekusi agar tidak mengirim form lagi
                }
            }
        } catch (err) {
            console.error("Gagal mengecek status absensi:", err);
            // Abaikan error pengecekan dan lanjut submit form saja jika API error
        }

        await message.reply('⏳ Sedang mengirim data absensi ke Google Form...');

        // Kirim HTTP POST ke Google Form
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScHnzihnFInc5wbDFMk3uevPsb2UgymqNFOtWWiIGIxvFv9-w/formResponse';
        
        const cleanEmail = user.email.replace(/[\[\]]/g, '').trim();
        const cleanNama = user.nama.replace(/[\[\]]/g, '').trim();
        const cleanNim = user.nim.replace(/[\[\]]/g, '').trim();
        let cleanProdi = user.prodi.replace(/[\[\]]/g, '').trim();
        
        const validProdi = [
            'Teknik Informatika', 'Ilmu Gizi', 'Manajemen', 'Ilmu Komunikasi',
            'Akuntansi', 'Ilmu Keperawatan', 'PGSD', 'Ilmu Hukum',
            'Tasawuf dan Psikoterapi', 'Pend. Bahasa Inggris', 'Ilmu Pemerintahan', 'Peternakan'
        ];
        
        const searchProdi = cleanProdi.toLowerCase().replace(/&/g, 'dan').replace(/pendidikan/g, 'pend.');
        let matchedProdi = validProdi.find(p => p.toLowerCase() === searchProdi || searchProdi.includes(p.toLowerCase()));
        
        if (matchedProdi) {
            cleanProdi = matchedProdi;
        } else if (cleanProdi.toLowerCase() === 'pgsd') {
            cleanProdi = 'PGSD';
        } else {
            cleanProdi = cleanProdi.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        
        const params = new URLSearchParams();
        params.append('entry.1673244097', cleanEmail);
        params.append('entry.250831635', cleanNama);
        params.append('entry.1035893054', cleanNim);
        params.append('entry.2015941125', cleanProdi);

        try {
            const res = await fetch(formUrl, {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            if (!res.ok) {
                throw new Error(`Google Form menolak data (Status ${res.status}). Kemungkinan ada format data yang salah (misal email typo).`);
            }
            
            // Google form redirects on success or returns 200
            await message.reply(`✅ *Absensi Sukses!*\n\nTerima kasih *${user.nama}*, absensi kamu telah berhasil masuk ke sistem web/Google Sheet.`);
        } catch (error) {
            console.error('Fetch error:', error);
            await message.reply(`❌ *Gagal mengirim absensi.*\n${error.message}\nSilakan *!daftar* ulang dengan data yang benar, atau absen manual di web.`);
        }
    }

    // Note: !rekapan has been merged into !absensi
});

// Start the client
console.log('⏳ Memulai Bot WhatsApp...');
client.initialize();

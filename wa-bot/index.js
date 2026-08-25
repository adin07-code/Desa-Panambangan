const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const os = require('os');
const fs = require('fs');
const path = require('path');

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
4. *!absensi* - Menampilkan link ke website absensi harian
5. *!logbook* - Menampilkan link ke pengisian logbook harian
6. *!rundown* - Menampilkan rundown kegiatan 1 bulan

*Fitur Input WA:*
7. *!daftar [Email] - [Nama] - [NIM] - [Prodi]* (Contoh: !daftar budi@gmail.com - Budi - 12345 - Teknik Informatika)
8. *!hadir* - Mengisi absensi otomatis jika sudah terdaftar
9. *!rekapan* - Melihat daftar rekapan absensi yang sudah diinput

*Khusus Pengurus:*
10. *!siekonsumsi* - Menu khusus Edit Jadwal Piket & Menu (Terkunci 🔒)
11. *!bendahara* - Menu khusus Edit Laporan Keuangan (Terkunci 🔒)

_Ketik perintah di atas untuk menggunakan fitur bot._`;
        await message.reply(helpText);
    }

    // Command: !jadwal
    else if (text === '!jadwal' || text === 'jadwal') {
        await message.reply('📅 *Jadwal Piket KKM 14*\n\nSilakan cek jadwal piket (Kebersihan & Masak) hari ini melalui link berikut:\nhttps://desa-panambangan.vercel.app/piket');
    }

    // Command: !absensi
    else if (text === '!absensi' || text === 'absensi') {
        await message.reply('📝 *Absensi Harian KKM 14*\n\nJangan lupa isi absensi harian Anda melalui link berikut:\nhttps://desa-panambangan.vercel.app/absensi');
    }

    // Command: !logbook
    else if (text === '!logbook' || text === 'logbook') {
        await message.reply('📖 *Logbook Harian KKM 14*\n\nJangan lupa isi logbook harian Anda melalui link berikut:\nhttps://drive.google.com/drive/folders/1cEQ3LK5ovNZ0swVoM5X29TTWPeMj7Gyd');
    }

    // Command: !rundown
    else if (text === '!rundown' || text === 'rundown') {
        await message.reply('📄 *Rundown 1 Bulan KKM 14*\n\nSilakan cek detail rundown kegiatan kita selama 1 bulan penuh melalui link berikut:\nhttps://docs.google.com/document/d/1vO67-m_gBJYlS53Yn8OAhs6c5OheWpMsyWQm2kVuBfQ/edit?tab=t.0');
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
Tanggal : 
Barang : 
Total Harga : 

*(Format Tanggal contoh: 25 Agu 2026)*`;

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
        const phone = message.author || message.from;
        if (!loggedInKonsumsi.has(phone)) {
            await message.reply('🔒 *Akses Ditolak!*\n\nKamu harus login terlebih dahulu menggunakan perintah:\n*!siekonsumsi [password]*');
            return;
        }

        const lines = message.body.split('\n');
        const getValue = (key) => {
            const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase()));
            return line ? line.substring(line.indexOf(':') + 1).trim() : '';
        };

        let tanggal = getValue('Tanggal');
        const barang = getValue('Barang');
        let totalHarga = getValue('Total Harga');
        
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
        
        if (!tanggal || !barang || !totalHarga) {
            await message.reply('❌ *Gagal:* Pastikan Tanggal, Barang, dan Total Harga sudah diisi semua.');
            return;
        }
        
        // Hapus titik atau koma dari totalHarga agar jadi angka murni
        totalHarga = totalHarga.replace(/[^0-9]/g, '');

        await message.reply(`⏳ Sedang menyimpan Pengeluaran sebesar Rp ${totalHarga} untuk tanggal *${tanggal}*...`);

        // TODO: Minta URL Webhook Keuangan ke User
        const webhookKeuangan = 'https://script.google.com/macros/s/AKfycbyw2NQMoDJ1BVfHTp0T5Yh9l5feT5xb6xvultE-KPwqhKUvsO4TBQsNCY9JJ0RvpahM/exec';
        if (webhookKeuangan === 'INSERT_WEBHOOK_KEUANGAN_HERE') {
            await message.reply('⚠️ *Sistem Belum Siap*\nWebhook URL Keuangan belum dikonfigurasi.');
            return;
        }

        try {
            const payload = {
                tanggal: tanggal,
                keterangan: barang,
                pemasukan: 0,
                pengeluaran: totalHarga
            };

            const res = await fetch(webhookKeuangan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            if (result.status === 'success') {
                await message.reply(`✅ *Berhasil Disimpan!*\n\nPengeluaran Konsumsi untuk tanggal *${tanggal}* telah dimasukkan ke Laporan Keuangan di Website.`);
            } else {
                await message.reply(`❌ *Gagal:* ${result.message}`);
            }
        } catch (error) {
            console.error('Gagal mengirim pengeluaran:', error);
            await message.reply('❌ Terjadi kesalahan saat menghubungi server Google Sheets Keuangan.');
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
        if (prodi.toLowerCase() === 'pgsd') {
            prodi = 'PGSD';
        } else {
            prodi = prodi.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        
        // Gunakan message.author jika di grup, atau message.from jika di DM
        const phone = message.author || message.from;

        let usersData = {};
        if (fs.existsSync(usersFile)) {
            try { usersData = JSON.parse(fs.readFileSync(usersFile, 'utf8')); } catch (e) {}
        }
        
        usersData[phone] = { email, nama, nim, prodi };
        fs.writeFileSync(usersFile, JSON.stringify(usersData, null, 2));

        await message.reply(`✅ *Pendaftaran Berhasil!*\n\nNomor WA kamu sudah terhubung dengan data:\n*Nama:* ${nama}\n*NIM:* ${nim}\n*Prodi:* ${prodi}\n\nSekarang kamu cukup ketik *!hadir* setiap hari untuk absen otomatis!`);
    }

    // Command: !hadir
    else if (text === '!hadir' || text === 'hadir') {
        // Gunakan message.author jika di grup, atau message.from jika di DM
        const phone = message.author || message.from;
        let usersData = {};
        if (fs.existsSync(usersFile)) {
            try { usersData = JSON.parse(fs.readFileSync(usersFile, 'utf8')); } catch (e) {}
        }

        const user = usersData[phone];
        if (!user) {
            await message.reply('❌ *Nomor WA belum terdaftar!*\nSilakan daftar dulu dengan perintah:\n*!daftar [Email] - [Nama] - [NIM] - [Prodi]*');
            return;
        }

        await message.reply('⏳ Sedang mengirim data absensi ke Google Form...');

        // Kirim HTTP POST ke Google Form
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScHnzihnFInc5wbDFMk3uevPsb2UgymqNFOtWWiIGIxvFv9-w/formResponse';
        
        const cleanEmail = user.email.replace(/[\[\]]/g, '').trim();
        const cleanNama = user.nama.replace(/[\[\]]/g, '').trim();
        const cleanNim = user.nim.replace(/[\[\]]/g, '').trim();
        let cleanProdi = user.prodi.replace(/[\[\]]/g, '').trim();
        
        if (cleanProdi.toLowerCase() === 'pgsd') {
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
            
            // Google form redirects on success or returns 200
            await message.reply(`✅ *Absensi Sukses!*\n\nTerima kasih *${user.nama}*, absensi kamu telah berhasil masuk ke sistem web/Google Sheet.`);
        } catch (error) {
            console.error(error);
            await message.reply('❌ *Gagal mengirim absensi.* Coba lagi nanti atau gunakan QR code di web.');
        }
    }

    // Command: !rekapan
    else if (text === '!rekapan' || text === 'rekapan') {
        await message.reply('⏳ Sedang menarik data dari website...');
        try {
            const res = await fetch(`https://desa-panambangan.vercel.app/api/absensi?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('Gagal memuat API');
            
            const result = await res.json();
            const absensiData = result.data || [];
            
            if (absensiData.length === 0) {
                await message.reply('Belum ada data absensi hari ini di website.');
                return;
            }

            let reply = '*📋 Rekapan Absensi (Live dari Web)*\n\n';
            absensiData.forEach((item, index) => {
                const time = new Date(item.receivedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                
                // Bersihkan spasi berlebih dan ubah ke Title Case (Awal Kata Kapital)
                const namaBersih = item.nama_lengkap
                    .trim()
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                    
                reply += `${index + 1}. *${namaBersih}* - _${time}_\n`;
            });
            
            await message.reply(reply);
        } catch (e) {
            await message.reply('❌ Terjadi kesalahan saat menarik data dari website.');
            console.error(e);
        }
    }
});

// Start the client
console.log('⏳ Memulai Bot WhatsApp...');
client.initialize();

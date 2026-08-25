const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const os = require('os');
const fs = require('fs');
const path = require('path');

const absensiFile = path.join(__dirname, 'data_absensi.json');
const usersFile = path.join(__dirname, 'data_users.json');

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
    
    // Command: !editpiket (Rahasia untuk Divisi Konsumsi)
    else if (text === '!editpiket' || text === 'editpiket') {
        await message.reply('📝 *Link Edit Jadwal Piket & Menu (Khusus Konsumsi)*\n\nSilakan buka link Google Sheets berikut untuk mengubah jadwal dan menu. Website akan otomatis terupdate:\n\nhttps://docs.google.com/spreadsheets/d/14tDYF-syuIyBvA2AcZA0wxTTiAokKl2g/edit?usp=sharing');
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

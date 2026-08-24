const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const os = require('os');

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
    
    // Command: halo
    else if (text === 'halo' || text === 'halo bot') {
        await message.reply('Halo! 👋 Saya adalah Bot Asisten KKM 14 Desa Panambangan. Ketik *!bantuan* untuk melihat apa saja yang bisa saya lakukan.');
    }
});

// Start the client
console.log('⏳ Memulai Bot WhatsApp...');
client.initialize();

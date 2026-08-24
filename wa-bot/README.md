# 🤖 Bot WhatsApp KKM 14

Ini adalah script Node.js sederhana untuk menjalankan Bot WhatsApp secara lokal di laptop Anda.

## 📌 Prasyarat

Pastikan laptop Anda sudah terinstall **Node.js**. Jika belum, silakan download dan install dari [nodejs.org](https://nodejs.org/).

## 🚀 Cara Menjalankan Bot

1. Buka **Terminal** atau **Command Prompt (CMD)** di laptop Anda.
2. Arahkan ke folder ini (tempat file `index.js` berada).
3. Jalankan perintah berikut untuk menginstall *package* yang dibutuhkan (hanya perlu dilakukan sekali):
   ```bash
   npm install
   ```
4. Jalankan bot dengan perintah:
   ```bash
   node index.js
   ```
5. Tunggu beberapa detik hingga **QR Code** muncul di Terminal.
6. Buka aplikasi WhatsApp di HP (sebaiknya gunakan nomor khusus untuk bot), masuk ke menu **Tautkan Perangkat** (Linked Devices), lalu scan QR Code yang ada di layar laptop Anda.
7. Jika berhasil, di terminal akan muncul pesan `✅ Bot WhatsApp KKM 14 Berhasil Aktif dan Siap Digunakan!`.

## ⚙️ Fitur Saat Ini

Bot sudah dilengkapi dengan fitur auto-reply sederhana. Coba kirim pesan berikut ke nomor bot:
- `!ping` : Mengecek apakah bot aktif
- `!bantuan` atau `help` : Menampilkan daftar perintah
- `!jadwal` : Memberikan link ke halaman Jadwal Piket
- `!absensi` : Memberikan link ke halaman Absensi

## ⚠️ Catatan Penting
- **Laptop dan Terminal harus tetap terbuka** agar bot bisa terus merespons pesan. Jika terminal ditutup atau laptop dimatikan, bot akan mati.
- Karena script ini menggunakan mode `LocalAuth`, sesi login WhatsApp Anda akan tersimpan di dalam folder `.wwebjs_auth`. Jadi, saat Anda menjalankan bot lagi keesokan harinya, Anda tidak perlu *scan* QR code berulang kali (kecuali Anda me-logout perangkat dari HP).
- Jika ada *error* saat *scan* pertama kali, matikan script dengan menekan `Ctrl + C` di terminal, lalu jalankan `node index.js` lagi.

# FinTrack Personal (versi aplikasi / PWA)

Isi paket ini (semua harus diunggah dengan susunan yang sama):

    index.html
    manifest.webmanifest
    sw.js
    icons/
      icon-192.png
      icon-512.png
      icon-maskable-512.png
      apple-touch-icon.png
      favicon-32.png
      favicon-64.png

## Pasang lewat GitHub Pages
1. Buat repository baru di GitHub (Public), misalnya `fintrack`.
2. Unggah semua file di atas ke repository, termasuk folder `icons`.
3. Buka Settings > Pages > Branch: `main` / folder `/ (root)` > Save.
4. Tunggu 1-2 menit, buka alamat `https://NAMAKAMU.github.io/fintrack/`.
5. Buka sekali saat online. Setelah itu tombol Pasang muncul dan web bisa dipakai offline.

## Catatan
- Harus dibuka lewat alamat https (bukan file dari WhatsApp), kalau tidak, mode offline dan tombol pasang tidak aktif.
- Data tersimpan di perangkat masing-masing (localStorage + salinan otomatis IndexedDB). HP dan laptop tidak saling sinkron.
- Jangan hapus data situs / data browser, karena data ikut terhapus. Tetap unduh cadangan dari menu Kategori secara berkala.
- Setiap kali index.html diubah, naikkan angka VERSI di sw.js (misalnya fintrack-v2) agar perangkat mengambil versi baru.

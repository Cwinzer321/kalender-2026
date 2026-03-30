# 🌌 Kalender Akademik 2026 (Hyper-Glassmorphism Edition)

Sebuah aplikasi web kalender akademik 2026 modern, responsif, dan sangat estetik yang dibangun dengan teknologi *Vanilla HTML, CSS, dan JavaScript*. Dibangun dengan filosofi desain **Hyper-Realistic Neumorphic Frost Glass**, kalender ini menawarkan antarmuka UI/UX premium yang terinspirasi dari estetika OS futuristik seperti Apple Vision Pro.

---

## ✨ Fitur Utama

- 🖌️ **Tema Hyper-Glassmorphism:** Latar belakang aurora animasi 3D, filter *grain/noise* SVG, perpaduan warna gradien Deep Violet & Vibrant Cyan, serta sistem pergerakan bayangan reflektif fisik pada kartu kaca.
- 📱 **Responsif Sepenuhnya:** Layout responsif dari Desktop 12-bulan meluas dan otomatis terfokus menjadi 100% *width viewport* saat dibuka di layar *mobile*.
- 🎯 **Fokus Otomatis Waktu-Nyata:** Kalender secara cerdas membaca waktu lokal perangkat pengguna dan otomatis memfokuskan antarmuka ke bulan berjalannya.
- ⚙️ **Event Manager (Manajer Acara Tanpa-Kode):** Dilengkapi dengan modal GUI untuk menambah, mewarnai, dan menghapus rentang acara (contoh: masa UTS, UAS, Liburan). Garis indikator akan otomatis tersambung di atas *grid* kalender!
- 📝 **Agenda Note Personal (Local Storage):** Klik hari mana saja untuk memasukkan catatan atau agenda. Kalender akan menyimpannya ke *Local Storage browser* pengguna, ditandai dengan lampu indikator *cyan* bersinar.
- 🔴 **Penanda Hari Libur Nasional & Minggu:** Hari Minggu dan daftar hari libur Nasional 2026 sudah terprogram dan tersorot indah dengan warna kontras *pink-red*.

---

## 🚀 Cara Menjalankan (Instalasi)

Proyek ini **tidak** membutuhkan *node modules*, *framework*, atau peladen basis data eksternal. Semua berjalan murni di sisi Klien.

1. Lakukan *Clone Repository* ini:
   ```bash
   git clone https://github.com/Cwinzer321/kalender-2026.git
   ```
2. Buka folder `Kalender 2026`.
3. Buka fail `index.html` dengan *Browser* favorit Anda (disarankan Google Chrome, Microsoft Edge, atau Safari) atau jalankan melalui *Live Server* dari VSCode.
4. Nikmati antarmuka kalendernya!

---

## 🛠️ Struktur Fail

- `index.html` : Struktur dasar aplikasi dan modul-modul *pop-up* (Modal).
- `style.css` : Sentral estetika desain, variabel warna, CSS Grid, efek *frosted glass*, UI manajer acara, dan animasi *keyframes*.
- `script.js` : Logika DOM rendering 365 hari secara dinamis, konfigurasi hari libur lokal, algoritma penyambungan garis acara, serta penanganan CRUD sinkronisasi `localStorage`.

---

## 🎨 Modifikasi Pengaturan *Event Range* bawaan
Jika Anda ingin menyiapkan pengaturan acara khusus tambahan secara bawaan untuk orang lain, Anda bisa membuka `script.js` dan menyesuaikan rujukan data *array* `defaultRanges`. Pengguna juga bebas menimpanya dari tombol **"⚙️ Atur Acara"** di antarmuka Web!

---

*Desain visual diracik khusus untuk memberikan pengalaman menatap masa depan untuk jadwal harian Anda.*

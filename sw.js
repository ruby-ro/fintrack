/* FinTrack Personal - service worker (mode offline)
   Naikkan angka VERSI setiap kali index.html diubah agar perangkat mengambil versi terbaru. */
const VERSI = 'fintrack-v1';
const INTI = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-64.png'
];
const HOST_FONT = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(INTI)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const sama = u.origin === self.location.origin;
  if (!sama && !HOST_FONT.includes(u.hostname)) return;
  e.respondWith(r.mode === 'navigate' ? halaman(e) : segarkan(e));
});

/* Halaman: tampilkan salinan tersimpan dulu, perbarui di latar belakang. */
async function halaman(e) {
  const cache = await caches.open(VERSI);
  const simpan = (await cache.match('./index.html')) || (await cache.match('./'));
  const jaringan = fetch(e.request)
    .then(res => { if (res && res.ok) cache.put('./index.html', res.clone()); return res; })
    .catch(() => null);
  if (simpan) { e.waitUntil(jaringan); return simpan; }
  const res = await jaringan;
  return res || new Response('Offline dan belum ada salinan tersimpan. Buka sekali saat online.', {
    status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

/* Ikon, manifest, font: pakai salinan tersimpan, perbarui diam-diam. */
async function segarkan(e) {
  const cache = await caches.open(VERSI);
  const hit = await cache.match(e.request);
  const jaringan = fetch(e.request)
    .then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone()); return res; })
    .catch(() => null);
  if (hit) { e.waitUntil(jaringan); return hit; }
  const res = await jaringan;
  return res || Response.error();
}

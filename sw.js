// Service worker: deixa o jogo funcionando offline depois da primeira visita.
const VERSAO = "missoes-v1";
const SQLJS = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";
const PRECACHE = [
  "./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  SQLJS + "sql-wasm.js", SQLJS + "sql-wasm.wasm"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => Promise.all(
    PRECACHE.map(u => c.add(new Request(u, {mode: u.startsWith("http") ? "cors" : "same-origin"})).catch(() => {}))
  )).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const mesmoSite = url.origin === self.location.origin;
  const biblioteca = url.href.startsWith(SQLJS) || url.href.startsWith("https://cdn.jsdelivr.net/pyodide/");

  if(mesmoSite){
    // página do jogo: tenta a rede (pega atualizações) e cai no cache se estiver offline
    e.respondWith(fetch(req).then(r => {
      const copia = r.clone();
      caches.open(VERSAO).then(c => c.put(req, copia));
      return r;
    }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
  } else if(biblioteca){
    // SQL e Python: arquivos grandes que não mudam — usa o cache primeiro
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if(r.ok){ const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
      return r;
    })));
  }
});

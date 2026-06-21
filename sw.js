const CACHE="ersa-personel-v36";
const ASSETS=["./","index.html","config.js","manifest.webmanifest"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.protocol==="chrome-extension:")return;if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp).catch(()=>{}));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));});

/**
 * Service Worker 模板 —— 由 tools/web/postbuild.py 填入版本号和预缓存清单后写进构建产物。
 * 策略：安装时把整个构建产物缓存下来（装到主屏幕后断网也能玩）；
 *       页面导航走「先网络后缓存」，这样重新部署后一联网就能拿到新版本。
 */
const VERSION = '434c2f4857';
const CACHE = 'cybermerit-' + VERSION;
const PRECACHE = [
    "./",
    "./application.js",
    "./assets/internal/config.json",
    "./assets/internal/import/0b/0b2bbb7a0.json",
    "./assets/internal/index.js",
    "./assets/main/config.json",
    "./assets/main/import/06/0699aaa4c.json",
    "./assets/main/import/0b/0b759c0fe.json",
    "./assets/main/import/fd/fd8ec536-a354-4a17-9c74-4f3883c378c8.json",
    "./assets/main/index.js",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@40c10.png",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@74afd.png",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@7d38f.png",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@8fd34.png",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@bb97f.png",
    "./assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@e9a6d.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@40c10.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@74afd.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@7d38f.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@8fd34.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@bb97f.png",
    "./assets/main/native/d0/d032ac98-05e1-4090-88bb-eb640dcb5fc1@b47c0@e9a6d.png",
    "./cocos-js/_virtual_cc-0634f6ce.js",
    "./cocos-js/assets/bullet.release.wasm-10f8cbd4.wasm",
    "./cocos-js/assets/meshopt_decoder.wasm-12c0a404.wasm",
    "./cocos-js/assets/spine-59f406dc.wasm",
    "./cocos-js/assets/spine.js.mem-90a4faeb.bin",
    "./cocos-js/bullet.release.asm-1134e469.js",
    "./cocos-js/bullet.release.wasm-e702f478.js",
    "./cocos-js/bullet.release.wasm-f1379ff8.js",
    "./cocos-js/cc.js",
    "./cocos-js/meshopt_decoder.asm-519d1632.js",
    "./cocos-js/meshopt_decoder.wasm-43855155.js",
    "./cocos-js/meshopt_decoder.wasm-ebbcb6df.js",
    "./cocos-js/spine-9a8528df.js",
    "./cocos-js/spine.asm-8c7702b2.js",
    "./cocos-js/spine.js-6d0b02e3.js",
    "./cocos-js/spine.wasm-4838152b.js",
    "./icon-180.png",
    "./icon-192.png",
    "./icon-512.png",
    "./icon-maskable-512.png",
    "./index.html",
    "./index.js",
    "./manifest.webmanifest",
    "./src/chunks/bundle.js",
    "./src/import-map.json",
    "./src/polyfills.bundle.js",
    "./src/settings.json",
    "./src/system.bundle.js",
    "./style.css"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim()),
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

    // 打开页面：先取网络（能拿到新版本），失败再用缓存
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request).then((hit) => hit || caches.match('./index.html'))),
        );
        return;
    }

    // 其余资源：先缓存，miss 了再取网络并存起来
    event.respondWith(
        caches.match(request).then(
            (hit) =>
                hit ||
                fetch(request).then((response) => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE).then((cache) => cache.put(request, copy));
                    }
                    return response;
                }),
        ),
    );
});

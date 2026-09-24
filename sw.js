/**
 * Service Worker 模板 —— 由 tools/web/postbuild.py 填入版本号和预缓存清单后写进构建产物。
 * 策略：安装时把整个构建产物缓存下来（装到主屏幕后断网也能玩）；
 *       页面导航走「先网络后缓存」，这样重新部署后一联网就能拿到新版本。
 */
const VERSION = 'd6aabf90ab';
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
    "./assets/resources/config.json",
    "./assets/resources/import/05/05065b05-bdbb-4c9a-8d48-05b8998b4e3a.json",
    "./assets/resources/import/08/082d412da.json",
    "./assets/resources/import/0d/0da07888-bcc3-4c0e-9b6d-739708281d7d.json",
    "./assets/resources/import/15/151452f6-616e-4008-845d-8785e7f1a9a7.json",
    "./assets/resources/import/1a/1abde388-f690-4bd5-be1e-54005424a526.json",
    "./assets/resources/import/2c/2c7dae7a-be28-43e0-827f-c63a0d7ea007.json",
    "./assets/resources/import/35/3510ca72-a437-4427-b11b-b7a7cbfbcefc.json",
    "./assets/resources/import/47/4734228b-508c-443a-85df-afaa09901c03.json",
    "./assets/resources/import/47/47d21eb4-a3c6-4398-846a-1e957e9a4ae2.json",
    "./assets/resources/import/48/4844f9cc-776b-493b-b527-e7a7e48a6aaa.json",
    "./assets/resources/import/52/5279fd77-e26e-4606-be59-60efb1ceebd9.json",
    "./assets/resources/import/65/65eb9582-914d-45df-aacd-0fbf2c3cadfa.json",
    "./assets/resources/import/6d/6d2a0ef3-c1a5-40de-8c26-9acbb2248d2f.json",
    "./assets/resources/import/71/71ca32b7-0f2f-4c10-888e-b7519771c702.json",
    "./assets/resources/import/77/77277f83-fdd4-43ae-b5bf-ed185c0b7471.json",
    "./assets/resources/import/88/88d0917b-f031-4a9d-94b5-046267b914b5.json",
    "./assets/resources/import/8a/8abc6254-9022-4c7a-95cb-1325dd2943b1.json",
    "./assets/resources/import/8b/8bcbe8af-76f3-4a8e-ae61-812fc1dc419b.json",
    "./assets/resources/import/90/9017262f-d620-4a78-af12-5d176c9e8439.json",
    "./assets/resources/import/91/91813616-89d7-40c2-be96-482b7e83a3e4.json",
    "./assets/resources/import/9a/9a120494-14bf-4853-8c33-58aea48cb6cd.json",
    "./assets/resources/import/9e/9edcca5e-90b8-47d8-aa59-cca07a3c8f5c.json",
    "./assets/resources/import/9f/9f4f7692-c3be-4522-bdcc-d20e07c186e1.json",
    "./assets/resources/import/a6/a6cc2667-a927-4f07-bbad-583f42431f22.json",
    "./assets/resources/import/b3/b3312627-653e-4bf4-858e-7668e004985b.json",
    "./assets/resources/import/bf/bf6aa058-6880-4775-9be1-7217fbb9c8a6.json",
    "./assets/resources/import/bf/bff58145-3541-4877-9b3d-186f7f84663c.json",
    "./assets/resources/import/c4/c44659e9-8bcf-434a-a74c-23c96e0954fa.json",
    "./assets/resources/import/de/de2d6e85-1c5e-437f-9d2c-c932e7062b23.json",
    "./assets/resources/import/e3/e3c714fa-49ca-47a8-8498-78a444306fdd.json",
    "./assets/resources/import/f5/f5412576-80a5-47d3-aa61-4668f860cded.json",
    "./assets/resources/index.js",
    "./assets/resources/native/05/05065b05-bdbb-4c9a-8d48-05b8998b4e3a.mp3",
    "./assets/resources/native/0d/0da07888-bcc3-4c0e-9b6d-739708281d7d.mp3",
    "./assets/resources/native/15/151452f6-616e-4008-845d-8785e7f1a9a7.mp3",
    "./assets/resources/native/1a/1abde388-f690-4bd5-be1e-54005424a526.mp3",
    "./assets/resources/native/2c/2c7dae7a-be28-43e0-827f-c63a0d7ea007.mp3",
    "./assets/resources/native/35/3510ca72-a437-4427-b11b-b7a7cbfbcefc.mp3",
    "./assets/resources/native/47/4734228b-508c-443a-85df-afaa09901c03.mp3",
    "./assets/resources/native/47/47d21eb4-a3c6-4398-846a-1e957e9a4ae2/NotoSansSC-Medium.ttf",
    "./assets/resources/native/48/4844f9cc-776b-493b-b527-e7a7e48a6aaa.mp3",
    "./assets/resources/native/52/5279fd77-e26e-4606-be59-60efb1ceebd9.png",
    "./assets/resources/native/65/65eb9582-914d-45df-aacd-0fbf2c3cadfa.mp3",
    "./assets/resources/native/6d/6d2a0ef3-c1a5-40de-8c26-9acbb2248d2f.mp3",
    "./assets/resources/native/71/71ca32b7-0f2f-4c10-888e-b7519771c702.mp3",
    "./assets/resources/native/77/77277f83-fdd4-43ae-b5bf-ed185c0b7471.mp3",
    "./assets/resources/native/88/88d0917b-f031-4a9d-94b5-046267b914b5.mp3",
    "./assets/resources/native/8a/8abc6254-9022-4c7a-95cb-1325dd2943b1.mp3",
    "./assets/resources/native/8b/8bcbe8af-76f3-4a8e-ae61-812fc1dc419b.mp3",
    "./assets/resources/native/90/9017262f-d620-4a78-af12-5d176c9e8439.mp3",
    "./assets/resources/native/91/91813616-89d7-40c2-be96-482b7e83a3e4.mp3",
    "./assets/resources/native/9a/9a120494-14bf-4853-8c33-58aea48cb6cd/NotoSansSC-Bold.ttf",
    "./assets/resources/native/9e/9edcca5e-90b8-47d8-aa59-cca07a3c8f5c.png",
    "./assets/resources/native/9f/9f4f7692-c3be-4522-bdcc-d20e07c186e1.mp3",
    "./assets/resources/native/a6/a6cc2667-a927-4f07-bbad-583f42431f22.mp3",
    "./assets/resources/native/b3/b3312627-653e-4bf4-858e-7668e004985b.mp3",
    "./assets/resources/native/bf/bf6aa058-6880-4775-9be1-7217fbb9c8a6.mp3",
    "./assets/resources/native/bf/bff58145-3541-4877-9b3d-186f7f84663c.mp3",
    "./assets/resources/native/c4/c44659e9-8bcf-434a-a74c-23c96e0954fa.mp3",
    "./assets/resources/native/de/de2d6e85-1c5e-437f-9d2c-c932e7062b23.mp3",
    "./assets/resources/native/e3/e3c714fa-49ca-47a8-8498-78a444306fdd.mp3",
    "./assets/resources/native/f5/f5412576-80a5-47d3-aa61-4668f860cded.mp3",
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

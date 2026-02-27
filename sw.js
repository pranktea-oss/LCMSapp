const CACHE_NAME = 'lcms-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdn.staticfile.net/vue/3.3.4/vue.global.prod.min.js',
    'https://cdn.staticfile.net/localforage/1.10.0/localforage.min.js',
    'https://cdn.staticfile.net/xlsx/0.18.5/xlsx.full.min.js'
];

// 安装时缓存所有必需的外部核心库
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// 断网时，拦截网络请求，直接从手机本地缓存中读取文件
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// 캐시 버전 관리를 위한 변수
const CACHE_VERSION = '1.0.0';
const CACHE_NAME = `t1-wms-cache-v${CACHE_VERSION}`;

// 캐시할 정적 리소스 목록
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Logo1.png',
  '/assets/*'
];

// 설치 이벤트
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 이벤트
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // 이전 캐시 삭제
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // 새로운 서비스 워커가 즉시 페이지 제어하도록 설정
      clients.claim()
    ])
  );
});

// 리소스 요청 처리 - 네트워크 우선 전략
self.addEventListener('fetch', event => {
  // HTML 요청 처리
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // API 요청 처리 - 캐시하지 않음
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 정적 리소스 처리
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 유효한 응답만 캐시
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 응답 복제 후 캐시 저장
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            // URL이 urlsToCache 목록에 있는 경우만 캐시
            if (urlsToCache.some(url => event.request.url.includes(url))) {
              cache.put(event.request, responseToCache);
            }
          });

        return response;
      })
      .catch(() => {
        // 네트워크 실패시 캐시된 응답 반환
        return caches.match(event.request);
      })
  );
});

// 메시지 이벤트 처리
self.addEventListener('message', event => {
  // 새로운 서비스 워커 대기 건너뛰기
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 주기적 캐시 정리
self.addEventListener('periodicsync', event => {
  if (event.tag === 'clear-cache') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});

// 에러 처리
self.addEventListener('error', event => {
  console.error('Service Worker 에러:', event.error);
});

// 오프라인 페이지 제공
self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || caches.match('/offline.html');
        })
    );
  }
});
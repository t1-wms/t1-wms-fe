import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@app/router'
import { register } from './serviceWorkerRegistration';
import './index.css'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      // 새로운 Service Worker 감지 및 업데이트 처리
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker?.addEventListener('statechange', () => {
          // 새로운 서비스 워커가 설치 완료되고 대기 중일 때만 확인
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // localStorage를 사용하여 업데이트 확인 상태 관리
            const lastUpdateCheck = localStorage.getItem('lastUpdateCheck');
            const now = Date.now();
            
            // 마지막 업데이트 확인으로부터 1시간 이상 지났거나 처음인 경우에만 확인
            if (!lastUpdateCheck || (now - parseInt(lastUpdateCheck)) > 3600000) {
              if (confirm('새로운 버전이 있습니다. 새로고침하시겠습니까?')) {
                localStorage.setItem('lastUpdateCheck', now.toString());
                window.location.reload();
              }
            }
          }
        });
      });

      console.log('Service Worker 등록 성공:', registration);
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

register();
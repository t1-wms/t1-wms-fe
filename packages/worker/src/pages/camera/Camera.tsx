import { useQRScanner } from '@/pages/camera/hooks/useQrScanner';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Camera = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { expectedCode, returnPath } = location.state || {};
  const [showToast, setShowToast] = useState(false);
  
  const {
    videoRef,
    canvasRef,
    cameraActive,
    qrData,
    startCamera,
    setQrData
  } = useQRScanner();
  

  useEffect(() => {
    startCamera();
  }, []);

  useEffect(() => {
    if (qrData) {
      if (qrData.data === expectedCode) {
        // 스캔 성공 시 바로 이전 페이지로 이동
        navigate(returnPath, { 
          state: { 
            scanSuccess: true,
            scannedCode: qrData.data 
          }
        });
      } else {
        // 스캔 실패 시 토스트 메시지 표시 및 카메라 재시작
        setShowToast(true);
        setQrData(null); // QR 데이터 초기화
        startCamera(); // 카메라 재시작
        
        // 3초 후 토스트 메시지 숨김
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  }, [qrData, expectedCode, navigate, returnPath]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* 카메라 뷰 */}
        <div
          style={{ display: cameraActive ? "block" : "none" }}
          className="relative w-70 h-70" 
        >
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            ref={videoRef}
            autoPlay
            playsInline
          />
          <div className="absolute inset-0">
            <div className="w-full h-full border-2 border-white rounded-md"></div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 토스트 메시지 */}
        {showToast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            일치하지 않는 코드입니다.
          </div>
        )}
      </div>
      
      <div className="text-white py-4 px-4 pb-20 text-center bg-opacity-50">
        <p>QR 코드를 스캔해주세요</p>
      </div>
    </div>
  );
};
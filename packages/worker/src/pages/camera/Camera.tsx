import { useQRScanner } from '@/pages/camera/hooks/useQrScanner';

export const Camera = () => {
  const {
    videoRef,
    canvasRef,
    cameraActive,
    qrData,
    startCamera,
    setQrData
  } = useQRScanner();

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* 헤더 */}
      <div className="bg-t1normal text-white py-4 px-4 text-center">
        <h1 className="text-lg font-bold">QR 스캐너</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {!cameraActive && !qrData && (
          <button
            onClick={startCamera}
            className="w-full bg-t1normal text-white py-6 rounded-2xl text-lg font-bold active:bg-t1dark shadow-lg"
          >
            QR 코드 스캔하기
          </button>
        )}
        
        {/* 카메라 뷰 */}
        <div
          style={{ display: cameraActive ? "block" : "none" }}
          className="relative w-90 h-90" 
        >
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            ref={videoRef}
            autoPlay
            playsInline
          />
          {/* 스캔 가이드 오버레이 */}
          <div className="absolute inset-0">
            <div className="w-full h-full border-2 border-white rounded-md"></div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {qrData && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">스캔 완료</h3>
            <p className="mb-4 p-4 bg-gray-50 rounded-lg break-all">
              {qrData.data}
            </p>
            <button
              onClick={() => {
                setQrData(null);
                startCamera();
              }}
              className="w-full bg-t1normal text-white py-4 rounded-xl text-lg font-bold active:bg-purple-800"
            >
              다시 스캔하기
            </button>
          </div>
        )}
      </div>

      {/* 안내 텍스트 */}
      {cameraActive && (
        <div className="text-white py-4 px-4 text-center bg-black bg-opacity-50">
          <p>QR 코드를 스캔 영역 안에 위치시켜 주세요</p>
        </div>
      )}
    </div>
  );
};
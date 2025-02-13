import { useRef, useState, useEffect } from 'react';
import jsQR from 'jsqr';
import { QRData } from '../types/camera';

export const useQRScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [qrData, setQrData] = useState<QRData | null>(null);

  const startCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('카메라 접근 실패:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const scanQRCode = (): void => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      // setQrData({ data: code.data });
      setQrData({ data: 'hello' });
      stopCamera();
    }
  };

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      const interval = setInterval(scanQRCode, 100);
      return () => clearInterval(interval);
    }
  }, [cameraActive]);

  return {
    videoRef,
    canvasRef,
    cameraActive,
    qrData,
    startCamera,
    stopCamera,
    setQrData
  };
};
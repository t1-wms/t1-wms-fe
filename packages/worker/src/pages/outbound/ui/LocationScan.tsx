import { LocationScanProps, Location } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

export const LocationScan = ({ 
  zone, 
  aisle,
  rack,  
  shelf,
  onLocationScan,
  isLocationScanned 
}: LocationScanProps) => {
  const navigate = useNavigate();
  const location = useLocation();  // useLocation 추가
  const [error, setError] = useState<string | null>(null);
  
  const expectedBinCode = `Z${zone}${aisle}${rack}${shelf}`;

  const LocationInfo = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="font-black text-2xl text-gray-900">{label}</span>
      <span className="font-black text-2xl text-gray-900">{value}</span>
    </div>
  );

    // location.state 변화 감지를 위한 useEffect 추가
    useEffect(() => {
      const state = location.state as { scanSuccess?: boolean };
      if (state?.scanSuccess) {
        onLocationScan();  // QR 스캔 성공 시 상위 컴포넌트의 핸들러 실행
      }
    }, [location.state, onLocationScan]);

  const BinCodeDisplay = ({ zone, aisle, rack, shelf }: Location) => (
    <div className="flex justify-center text-gray-50 p-2 items-center text-2xl font-bold">
      <span className="bg-purple-700 px-5 py-1 rounded-l-sm">Z{zone}</span>
      <span className="bg-gray-600 px-5 py-1">{aisle}</span>
      <span className="bg-gray-400 px-5 py-1">{rack}</span>
      <span className="bg-green-600 px-5 py-1 rounded-r-sm">{shelf}</span>
    </div>
  );

  const handleLocationScan = () => {
    navigate('/camera', { 
      state: { 
        expectedCode: 'hello',
        returnPath: '/outbound'
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex text-lg font-bold mb-2 justify-center items-center"> 
        <HiLocationMarker className="mr-1.5 text-red-500 text-xl" />
        다음 위치로 이동해주세요.
      </div>
      
      {/* 빈코드 표시 */}
      <div className="mb-4">
        <BinCodeDisplay zone={zone} aisle={aisle} rack={rack} shelf={shelf} />
      </div> 

      <div className="p-2">
        <div className="flex-col space-y-2">
          <LocationInfo label="구역" value={zone} />
          <LocationInfo label="통로" value={rack} />
          <LocationInfo label="진열대 번호" value={shelf} />
          <LocationInfo label="층" value={aisle || "01"} /> 
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center my-2 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div className="mt-auto">
        <ScanButton 
          onClick={handleLocationScan}
          isScanned={isLocationScanned}
          scanText="위치 바코드 스캔"
          completedText="위치 확인 완료"
          disabled={isLocationScanned}
        />
      </div>
    </div>
  );
};
import { LocationScanProps, Location } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';
import { HiLocationMarker } from 'react-icons/hi';

// ✨ 제거: useLocation, useState, useEffect import
// ✨ 제거: location.state 관련 로직

export const LocationScan = ({ 
  zone, 
  aisle,
  rack,  
  shelf,
  onLocationScan,  // ✨ 이 함수는 부모 컴포넌트에서 처리할 예정
  isLocationScanned 
}: LocationScanProps) => {
  // ✨ 제거: const location = useLocation();
  // ✨ 제거: const [error, setError] = useState<string | null>(null);
  
  const LocationInfo = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="font-black text-2xl text-gray-900">{label}</span>
      <span className="font-black text-2xl text-gray-900">{value}</span>
    </div>
  );

  // ✨ 제거: useEffect hook

  const BinCodeDisplay = ({ zone, aisle, rack, shelf }: Location) => (
    <div className="flex justify-center text-gray-50 px-2 py-4 items-center text-4xl font-bold">
      <span className="bg-purple-700 px-5 py-2">Z{zone}</span>
      <span className="bg-gray-600 px-5 py-2">{aisle}</span>
      <span className="bg-gray-400 px-5 py-2">{rack}</span>
      <span className="bg-green-600 px-5 py-2">{shelf}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex text-lg font-bold mb-2 justify-center items-center"> 
        <HiLocationMarker className="mr-1.5 text-red-500 text-xl" />
        다음 위치로 이동해주세요.
      </div>
      
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

      <div className="mt-auto">
        <ScanButton 
          onClick={onLocationScan}  // ✨ 수정: handleLocationScan -> onLocationScan
          isScanned={isLocationScanned}
          scanText="위치 바코드 스캔"
          completedText="위치 확인 완료"
          disabled={isLocationScanned}
        />
      </div>
    </div>
  );
};
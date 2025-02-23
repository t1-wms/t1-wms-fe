import { LocationScanProps } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';
import LocationHeader from './LocationHeader';
import BinCodeDisplay from './BinCodeDisplay';
import LocationInfo from './LocationInfo';

export const LocationScan = ({ 
  zone, 
  aisle,
  rack,  
  floor,
  onLocationScan,
  isLocationScanned 
}: LocationScanProps) => {
  return (
    <div className="flex flex-col h-full">
      <LocationHeader />
      <div className="mb-4">
        <BinCodeDisplay zone={zone} aisle={aisle} rack={rack} floor={floor} />
      </div>
      <div className="p-2">
        <div className="flex-col space-y-2">
          <LocationInfo label="구역" value={zone} />
          <LocationInfo label="통로" value={aisle} />
          <LocationInfo label="진열대 번호" value={rack} />
          <LocationInfo label="층" value={floor || "x"} />
        </div>
      </div>
      <div className="mt-auto">
        <ScanButton 
          onClick={onLocationScan}
          isScanned={isLocationScanned}
          scanText="위치 바코드 스캔"
          completedText="위치 확인 완료"
          disabled={isLocationScanned}
        />
      </div>
    </div>
  );
};
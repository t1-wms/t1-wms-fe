import { LocationScanProps } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';
import { HiLocationMarker } from 'react-icons/hi';

export const LocationScan = ({
                                 location,
                                 onLocationScan,
                                 isLocationScanned
                             }: LocationScanProps) => {
    const LocationInfo = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-black text-2xl text-gray-900">{label}</span>
            <span className="font-black text-2xl text-gray-900">{value}</span>
        </div>
    );

    const BinCodeDisplay = ({ location }: { location: LocationScanProps }) => (
        <div className="flex justify-center text-gray-50 p-2 items-center text-2xl font-bold">
            <span className="bg-purple-700 px-5 py-1 rounded-l-sm">Z{location.zone}</span>
            <span className="bg-gray-600 px-5 py-1">{location.aisle}</span>
            <span className="bg-gray-400 px-5 py-1">{location.rack}</span>
            <span className="bg-green-600 px-5 py-1 rounded-r-sm">{location.shelf}</span>
        </div>
    );

    return (
        <div>
            <div className="flex text-lg font-bold mb-2 justify-center items-center">
                <HiLocationMarker className='mr-1.5 text-red-500 text-xl' />
                다음 위치로 이동해주세요.
            </div>

            {/* 빈코드 표시 */}
            <div className="mb-4">
                <BinCodeDisplay location={location} />
            </div>

            <div className="p-2">
                <div className="flex-col space-y-2">
                    <LocationInfo label="구역" value={location.zone} />
                    <LocationInfo label="통로" value={location.rack} />
                    <LocationInfo label="진열대 번호" value={location.shelf} />
                    <LocationInfo label="층" value={location.aisle || "01"} />
                </div>
            </div>

            <ScanButton
                onClick={onLocationScan}
                isScanned={isLocationScanned}
                scanText="위치 바코드 스캔"
                completedText="위치 확인 완료"
                disabled={isLocationScanned}
            />
        </div>
    );
};

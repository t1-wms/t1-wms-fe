import { ItemScanProps, Location } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';


export const ItemScan = ({ item, onScanComplete }: ItemScanProps) => {


  const BinCodeDisplay = ({ zone, aisle, rack, floor }: Location) => (
    <div className="flex text-gray-50 text-md font-bold">
      <span className="bg-purple-700 px-3 py-2">Z{zone}</span>
      <span className="bg-gray-600 px-3 py-2">{aisle}</span>
      <span className="bg-gray-400 px-3 py-2">{rack}</span>
      <span className="bg-green-600 px-3 py-2">{floor}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-auto space-y-6">
      {/* 제품 이미지 */}
      <div className="flex justify-center">
        <div className="w-45 h-45 bg-gray-200 rounded-md flex items-center justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <span className="text-gray-400"></span>
          )}
        </div>
      </div>

      {/* BinCode 표시 */}
      <div className="flex items-center justify-between">
        <div className="py-4">
          <BinCodeDisplay {...item.location} />
        </div>
        <span className="itemcode">
          {item.code}
        </span>
      </div>

      {/* 제품 정보 */}
      <h3 className="font-bold text-xl mb-2">{item.name}</h3>

      {/* 스캔 버튼 */}
      <ScanButton
        onClick={onScanComplete}
        isScanned={item.scanned || false}
        scanText="물품 바코드 스캔"
        completedText="스캔 완료"
        disabled={item.scanned}
      />
    </div>
  );
};
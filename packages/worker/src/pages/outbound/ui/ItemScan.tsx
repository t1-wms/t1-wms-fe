import { ItemScanProps } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';

export const ItemScan = ({ item, onScanComplete }: ItemScanProps) => {
  return (
    <div className="flex flex-col min-h-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{item.name}</h3>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {item.code}
          </span>
        </div>
        <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
      </div>
      
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
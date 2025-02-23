import { ItemScanProps, Location } from '@/shared/types/items';
import { ScanButton } from '@/shared/ui/scanbutton/ScanButton';
import { useState } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi';

export const ItemScan = ({ item, onScanComplete }: ItemScanProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const BinCodeDisplay = ({ zone, aisle, rack, floor }: Location) => (
    <div className="flex text-gray-50 text-xl font-bold">
      <span className="bg-purple-700 px-4 py-2">Z{zone}</span>
      <span className="bg-gray-600 px-4 py-2">{aisle}</span>
      <span className="bg-gray-400 px-4 py-2">{rack}</span>
      <span className="bg-green-600 px-4 py-2">{floor}</span>
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
              className="w-full h-full object-cover rounded-md"
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

      {/* 수량 선택 */}
      <div className="fixed bottom-31 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <HiMinus className="text-gray-600" />
          </button>
          <span className="text-xl font-bold w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <HiPlus className="text-gray-600" />
          </button>
        </div>
      </div>

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
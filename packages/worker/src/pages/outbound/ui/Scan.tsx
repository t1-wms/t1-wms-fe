import { useState } from 'react';
import { LocationScan } from './LocationScan';
import { ItemScan } from './ItemScan';
import { ScanningItem  } from '@/shared/types/items';

export const Scan = () => {
  const [currentItem, setCurrentItem] = useState<ScanningItem>({
    id: 1,
    code: "AX-100",
    name: "부품 이름",
    quantity: 2,
    location: {
      zone: "A",
      aisle: "01",
      rack: "01",
      shelf: "03"
    },
    scanned: false
  });

  const [scanStep, setScanStep] = useState<'location' | 'item'>('location');
  const [isLocationScanned, setIsLocationScanned] = useState(false);

  const handleLocationScan = () => {
    setIsLocationScanned(true);
    setTimeout(() => {
      setScanStep('item');
    }, 1000);
  };

  const handleItemScan = () => {
    setCurrentItem(prev => ({...prev, scanned: true}));
  };

  return (
    <div className="flex flex-col min-h-auto"> 
      <div className="flex-1"> 
        {scanStep === 'location' ? (
          <LocationScan 
            zone={currentItem.location.zone}
            aisle={currentItem.location.aisle}
            rack={currentItem.location.rack}
            shelf={currentItem.location.shelf}
            onLocationScan={handleLocationScan}   
            isLocationScanned={isLocationScanned}  
          />
        ) : (
          <ItemScan 
            item={currentItem}
            onScanComplete={handleItemScan}
          />
        )}
      </div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ItemScan } from '@shared/ui/item/ItemScan';
import { usePickingStore } from '../store/outboundstore';
import Spinner from '@/shared/ui/Spinner';

export const ItemScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [isItemScanned, setIsItemScanned] = useState(false);  // 로컬 스캔 상태 추가
  const { pickingList, setItemScanned, moveToNextItem } = usePickingStore();
  const currentItem = pickingList.items[Number(itemId) - 1];

  useEffect(() => {
    if (!currentItem) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsItemScanned(true);  // 로컬 스캔 상태 업데이트
      setItemScanned();
      
      setTimeout(() => {
        const currentIndex = Number(itemId);
        const nextIndex = currentIndex + 1;

        if (nextIndex > pickingList.items.length) {
          moveToNextItem();
          navigate('/outbound/complete', { replace: true });
        } else {
          moveToNextItem();
          navigate(`/outbound/location/${nextIndex}`, { 
            replace: true,
            state: {} 
          });
        }
      }, 1000);
    }
  }, [location.state, navigate, setItemScanned, moveToNextItem, itemId, pickingList.items.length]);

  const handleItemScan = () => {
    console.log('Expected Location:', currentItem.code);
    navigate('/camera', {
      state: {
        expectedCode: currentItem.code,
        returnPath: `/outbound/item/${itemId}`
      }
    });
  };

  if (!currentItem) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <span className="seq">
          {Number(itemId)} / {pickingList.items.length} 번째 물품
        </span>
      </div>
      <ItemScan
        item={{ ...currentItem, scanned: isItemScanned }}
        onScanComplete={handleItemScan}
      />
    </div>
  );
};
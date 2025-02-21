import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ItemScan } from '@shared/ui/item/ItemScan';
import { usePickingStore } from '../store/outboundstore';
import Spinner from '@/shared/ui/Spinner';

export const ItemScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const { pickingList, setItemScanned, moveToNextItem } = usePickingStore();
  const currentItem = pickingList.items[Number(itemId) - 1]; // URL의 itemId를 인덱스로 변환

  useEffect(() => {
    if (!currentItem) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setItemScanned();
      
      const nextItemIndex = Number(itemId);
      if (nextItemIndex < pickingList.items.length) {
        setTimeout(() => {
          moveToNextItem(); 
          navigate(`/outbound/location/${nextItemIndex + 1}`, { 
            replace: true 
          });
        }, 200);
      } else {
        setTimeout(() => {
          navigate('/outbound/complete', { replace: true });
        }, 200);
      }
    }
  }, [location.state, navigate, setItemScanned, moveToNextItem, itemId]);

  const handleItemScan = () => {
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
      <div className="mb-2">
        <span className="seq">
          {Number(itemId)} / {pickingList.items.length} 번째 물품
        </span>
      </div>
      <ItemScan 
        item={currentItem}
        onScanComplete={handleItemScan}
      />
    </div>
  );
};
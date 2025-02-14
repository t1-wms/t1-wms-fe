import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ItemScan } from '../ui/ItemScan';
import { usePickingStore } from '../store/outboundstore';

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
        }, 1000);
      } else {
        setTimeout(() => {
          navigate('/outbound/complete', { replace: true });
        }, 1000);
      }
    }
  }, [location.state, navigate, setItemScanned, moveToNextItem, itemId]);

  const handleItemScan = () => {
    navigate('/camera', {
      state: {
        expectedCode: currentItem.code,
        returnPath: `/outbound/item/${itemId}` // 수정된 부분
      }
    });
  };

  // currentItem이 없는 경우 로딩 상태 표시
  if (!currentItem) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          {pickingList.currentItemIndex + 1} / {pickingList.items.length} 번째 물품
        </span>
      </div>
      <ItemScan 
        item={currentItem}
        onScanComplete={handleItemScan}
      />
    </div>
  );
};
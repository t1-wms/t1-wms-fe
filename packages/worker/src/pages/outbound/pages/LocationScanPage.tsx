import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { LocationScan } from '@/shared/ui/location/LocationScan';
import { usePickingStore } from '../store/outboundstore';

export const LocationScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [isLocationScanned, setIsLocationScanned] = useState(false);
  
  const { pickingList, setLocationScanned } = usePickingStore();
  const currentItem = pickingList.items[Number(itemId) - 1]; // URL의 itemId를 인덱스로 변환

  useEffect(() => {
    if (!currentItem) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    if (currentItem?.isLocationScanned) {
      navigate(`/outbound/item/${itemId}`, { replace: true });
    }
  }, [currentItem, navigate, itemId]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsLocationScanned(true);
      setLocationScanned();
      
      setTimeout(() => {
        navigate(`/outbound/item/${itemId}`, { 
          replace: true,
          state: {} // 이전 state 초기화
        });
      }, 1000);
    }
  }, [location.state, navigate, setLocationScanned, itemId]);


  // currentItem이 없는 경우 로딩 상태나 빈 화면 표시
  if (!currentItem) {
    return <div className="p-4">로딩중!</div>;
  }

  const handleLocationScan = () => {
    navigate('/camera', {
      state: {
        expectedCode: `${currentItem.location.zone}-${currentItem.location.aisle}-${currentItem.location.rack}-${currentItem.location.shelf}`,
        returnPath: `/outbound/location/${itemId}`
      }
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          {Number(itemId)} / {pickingList.items.length} 번째 물품
        </span>
      </div>
      <LocationScan 
        {...currentItem.location}
        onLocationScan={handleLocationScan}
        isLocationScanned={isLocationScanned}
      />
    </div>
);
};
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { LocationScan } from '@/shared/ui/location/LocationScan';
import { usePickingStore } from '../store/outboundstore';
import Spinner from '@/shared/ui/Spinner';

export const LocationScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [isLocationScanned, setIsLocationScanned] = useState(false);
  
  const { pickingList, setLocationScanned } = usePickingStore();
  const currentItem = pickingList.items[Number(itemId) - 1];

  useEffect(() => {
    if (!pickingList.pickingId) {
      navigate('/tasklist');
      return;
    }
    if (!currentItem) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate, pickingList]);

  useEffect(() => {
    if (!currentItem) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsLocationScanned(true);
      setLocationScanned();
      
      setTimeout(() => {
        navigate(`/outbound/item/${itemId}`, { 
          replace: true,
          state: {} 
        });
      }, 1000);
    }
  }, [location.state, navigate, setLocationScanned, itemId]);

  useEffect(() => {
    if (!pickingList.pickingId) {
      navigate('/tasklist');
      return;
    }
    // 현재 아이템이 없거나 전체 개수를 초과한 경우
    if (!currentItem || Number(itemId) > pickingList.items.length) {
      navigate('/outbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate, pickingList, itemId]);

  if (!currentItem) {
    return <Spinner />;
  }

  const handleLocationScan = () => {
    const expectedLocation = `${currentItem.location.zone}-${currentItem.location.aisle}-${currentItem.location.rack}-${currentItem.location.floor}`;
    console.log('Expected Location:', expectedLocation);
    navigate('/camera', {
      state: {
        expectedCode: expectedLocation,
        returnPath: `/outbound/location/${itemId}`
      }
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <span className="seq">
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
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { LocationScan } from '@/shared/ui/location/LocationScan';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';

function LocationScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [isLocationScanned, setIsLocationScanned] = useState(false);
  
  const { inboundList, setLocationScanned, moveToNextItem } = useInboundStore();
  const currentItem = inboundList.items[Number(itemId) - 1];

  useEffect(() => {
    if (!inboundList.inboundId) {
      navigate('/tasklist');
      return;
    }
    if (!currentItem) {
      navigate('/inbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate, inboundList]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsLocationScanned(true);
      setLocationScanned();
      
      setTimeout(() => {
        const currentIndex = Number(itemId);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex > inboundList.items.length) {
          navigate('/inbound/complete', { replace: true });
        } else {
          moveToNextItem();  // 수정된 moveToNextItem이 불량 물품을 건너뜀
          navigate(`/inbound/item/${nextIndex}`, { 
            replace: true,
            state: {} 
          });
        }
      }, 1000);
    }
  }, [location.state, navigate, setLocationScanned, moveToNextItem, itemId, inboundList.items.length]);

  if (!currentItem) {
    return <Spinner />;
  }

  const handleLocationScan = () => {
    const expectedLocation = `${currentItem.location.zone}-${currentItem.location.aisle}-${currentItem.location.rack}-${currentItem.location.floor}`;
    console.log('Expected Location:', expectedLocation);
    navigate('/camera', {
      state: {
        expectedCode: expectedLocation,
        returnPath: `/inbound/location/${itemId}`
      }
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <span className="seq">
          {Number(itemId)} / {inboundList.items.length} 번째 물품
        </span>
      </div>
      <LocationScan 
        {...currentItem.location}
        onLocationScan={handleLocationScan}
        isLocationScanned={isLocationScanned}
      />
    </div>
  );
}

export default LocationScanPage;
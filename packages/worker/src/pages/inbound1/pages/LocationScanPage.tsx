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
    if (!currentItem) {
      navigate('/inbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    if (currentItem?.isLocationScanned) {
      const nextItemIndex = Number(itemId);
      if (nextItemIndex < inboundList.items.length) {
        navigate(`/inbound/inspection/${nextItemIndex + 1}`, { replace: true });
      } else {
        navigate('/inbound/complete', { replace: true });
      }
    }
  }, [currentItem, navigate, itemId, inboundList.items.length]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsLocationScanned(true);
      setLocationScanned();
      
      setTimeout(() => {
        const nextItemIndex = Number(itemId);
        moveToNextItem();
        
        if (nextItemIndex < inboundList.items.length) {
          navigate(`/inbound/inspection/${nextItemIndex + 1}`, {
            replace: true,
            state: {}
          });
        } else {
          navigate('/inbound/complete', { 
            replace: true 
          });
        }
      }, 1000);
    }
  }, [location.state, navigate, setLocationScanned, moveToNextItem, itemId, inboundList.items.length]);

  if (!currentItem) {
    return <Spinner />;
  }

  const handleLocationScan = () => {
    navigate('/camera', {
      state: {
        expectedCode: `${currentItem.location.zone}-${currentItem.location.aisle}-${currentItem.location.rack}-${currentItem.location.floor}`,
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
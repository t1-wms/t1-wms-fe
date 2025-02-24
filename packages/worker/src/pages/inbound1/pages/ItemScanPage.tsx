import { useEffect,useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ItemScan } from '@shared/ui/item/ItemScan';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';

function ItemScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const [isItemScanned, setIsItemScanned] = useState(false);
  
  const { inboundList, setItemScanned } = useInboundStore();
  const currentItem = inboundList.items[Number(itemId) - 1];

  useEffect(() => {
    if (!currentItem) {
      navigate('/inbound/complete', { replace: true });
      return;
    }
  }, [currentItem, navigate]);

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setIsItemScanned(true);
      setItemScanned();
      
      setTimeout(() => {
        navigate(`/inbound/location/${itemId}`, { 
          replace: true,
          state: {} 
        });
      }, 1000);
    }
  }, [location.state, navigate, setItemScanned, itemId]);

  useEffect(() => {
    if (currentItem && inboundList.rejectedItems.includes(currentItem.id)) {
      const nextAcceptedItemIndex = inboundList.items.findIndex((item, idx) => 
        idx > (Number(itemId) - 1) && !inboundList.rejectedItems.includes(item.id)
      );
      
      if (nextAcceptedItemIndex !== -1) {
        navigate(`/inbound/item/${nextAcceptedItemIndex + 1}`, { replace: true });
      } else {
        navigate('/inbound/complete', { replace: true });
      }
    }
  }, [currentItem, inboundList.rejectedItems, inboundList.items, navigate, itemId]);

  const handleItemScan = () => {
    console.log('Expected Code:', currentItem.code);
    navigate('/camera', {
      state: {
        expectedCode: currentItem.code,
        returnPath: `/inbound/item/${itemId}`
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
          {Number(itemId)} / {inboundList.items.length} 번째 물품
        </span>
      </div>
      <ItemScan
        item={{ ...currentItem, scanned: isItemScanned }}
        onScanComplete={handleItemScan}
      />
    </div>
  );
}
export default ItemScanPage;
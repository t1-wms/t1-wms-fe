import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ItemScan } from '@shared/ui/item/ItemScan';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';

function ItemScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const { inboundList, setItemScanned } = useInboundStore();
  const currentItem = inboundList.items[Number(itemId) - 1];

  useEffect(() => {
    const state = location.state as { scanSuccess?: boolean };
    if (state?.scanSuccess) {
      setItemScanned();
      
      setTimeout(() => {
        navigate(`/inbound/location/${itemId}`, { 
          replace: true,
          state: {} 
        });
      }, 1000);
    }
  }, [location.state, navigate, setItemScanned, itemId]);

  const handleItemScan = () => {
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
      <div className="mb-10">
        <span className="seq">
          {Number(itemId)} / {inboundList.items.length} 번째 물품
        </span>
      </div>
      <ItemScan 
        item={currentItem}
        onScanComplete={handleItemScan}
      />
    </div>
  );
}

export default ItemScanPage;
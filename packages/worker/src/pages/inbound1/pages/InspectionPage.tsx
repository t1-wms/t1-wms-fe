import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InspectionList from '../ui/InspectionList';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';

function InspectionPage() {
  const navigate = useNavigate();
  const { inboundList, setInspectionComplete } = useInboundStore();
  const [itemStatuses, setItemStatuses] = useState<('pending' | 'accept' | 'reject')[]>(
    new Array(inboundList.items.length).fill('pending')
  );

  if (!inboundList.items.length) {
    return <Spinner />;
  }

  const handleItemStatusChange = (index: number, status: 'accept' | 'reject') => {
    const newStatuses = [...itemStatuses];
    newStatuses[index] = status;
    setItemStatuses(newStatuses);
  };

  const isAllItemsProcessed = itemStatuses.every(status => status !== 'pending');

  const handleComplete = () => {
    if (isAllItemsProcessed) {
      setInspectionComplete(); // 검사 완료 상태 저장
      navigate('/inbound/item/1', { replace: true });
    }
  };

  return (
    <div className="p-4 pb-24">
      <h2 className="text-xl font-bold mb-4">입하 검사</h2>
      <div className="mb-2">
        <span className="text-sm text-gray-500">
          전체 {inboundList.items.length}개 항목
        </span>
      </div>
      <InspectionList
        items={inboundList.items}
        itemStatuses={itemStatuses}
        onItemStatusChange={handleItemStatusChange}
      />
      <div className="fixed bottom-16 left-0 right-0 px-4 py-2">
        <div className="max-w-sm mx-auto">
          <button
            onClick={handleComplete}
            disabled={!isAllItemsProcessed}
            className={`w-full p-4 rounded-md ${
              isAllItemsProcessed
                ? 'bg-t1normal text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            검사 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default InspectionPage;
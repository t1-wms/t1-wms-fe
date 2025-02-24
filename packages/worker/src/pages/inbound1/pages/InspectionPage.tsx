import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';
import { InspectionList } from '../ui/InspectionList';
import { item1, item2, item3 } from '@/shared/api/mocks';

export default function InspectionPage() {
  const navigate = useNavigate();
  const { inboundId } = useParams();
  const { inboundList, setInboundTask, setInspectionComplete, setInboundLocations } = useInboundStore();
  const [itemStatuses, setItemStatuses] = useState<('pending' | 'accept' | 'reject')[]>([]);

    // 불량 개수 계산
    const rejectCount = itemStatuses.filter(status => status === 'reject').length;

  useEffect(() => {
    if (inboundId) {
      setInboundTask(Number(inboundId));
    }
  }, [inboundId, setInboundTask]);

  useEffect(() => {
    if (inboundList.items.length > 0) {
      setItemStatuses(new Array(inboundList.items.length).fill('pending'));
    }
  }, [inboundList.items.length]);

  const handleItemStatusChange = (index: number, status: 'accept' | 'reject') => {
    const newStatuses = [...itemStatuses];
    newStatuses[index] = status;
    setItemStatuses(newStatuses);
  };

  const isAllItemsProcessed = itemStatuses.every(status => status !== 'pending');

  const handleComplete = () => {
    if (isAllItemsProcessed) {
      const lotData = {
        checkNumber: item1.checkNumber,
        lotList: [...item1.lotList, ...item2.lotList, ...item3.lotList]
      };
      
      setInboundLocations(lotData.checkNumber, lotData.lotList);
      
      const acceptedItems: number[] = [];
      const rejectedItems: number[] = [];
  
      // 정상/불량 아이템 분류
      itemStatuses.forEach((status, index) => {
        const itemId = inboundList.items[index].id;
        if (status === 'accept') {
          acceptedItems.push(itemId);
        } else if (status === 'reject') {
          rejectedItems.push(itemId);
        }
      });
  
      // 상태 업데이트
      setInspectionComplete(acceptedItems, rejectedItems);
  
      // 정상 품목이 있는 경우에만 스캔 화면으로 이동
      if (acceptedItems.length > 0) {
        const firstAcceptedIndex = itemStatuses.findIndex((status) => status === 'accept') + 1;
        navigate(`/inbound/item/${firstAcceptedIndex}`, { replace: true });
      } else {
        // 모든 물품이 불량인 경우 완료 화면으로 이동
        navigate('/inbound/complete', { replace: true });
      }
    }
  };

  if (!inboundList.items.length) {
    return <Spinner />;
  }


  return (
    <div className="p-4 pb-34">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">입하 검사</h2>
        {rejectCount > 0 && (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-sm text-sm">
            불량 {rejectCount}개
          </span>
        )}
      </div>

      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          전체 {inboundList.items.length}개 항목
        </span>
        <span className="text-sm text-gray-500">
          정상 {itemStatuses.filter(status => status === 'accept').length}개
        </span>
      </div>

      <InspectionList
        items={inboundList.items}
        itemStatuses={itemStatuses}
        onItemStatusChange={handleItemStatusChange}
      />
      <div className="fixed bottom-16 left-0 right-0 px-4 py-2">
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
  );
}
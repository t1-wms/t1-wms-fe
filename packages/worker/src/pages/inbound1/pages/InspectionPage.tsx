import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInboundStore } from '../store/inboundstore';
import Spinner from '@/shared/ui/Spinner';
import { InspectionList } from '../ui/InspectionList';
import { item1, item2, item3 } from '@/shared/api/mocks';

export default function InspectionPage() {
  const navigate = useNavigate();
  const { inboundId } = useParams();
  const { inboundList, setInboundTask, setInspectionComplete,setInboundLocations} = useInboundStore();
  const [itemStatuses, setItemStatuses] = useState<('pending' | 'accept' | 'reject')[]>([]);

  // inboundId로 데이터 초기화
  useEffect(() => {
    if (inboundId) {
      setInboundTask(Number(inboundId));
    }
  }, [inboundId, setInboundTask]);

  // 상태 초기화
  useEffect(() => {
    if (inboundList.items.length > 0) {
      setItemStatuses(new Array(inboundList.items.length).fill('pending'));
    }
  }, [inboundList.items.length]);

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
    // item1, item2, item3의 lotList를 합쳐서 위치 정보 설정
    const lotData = {
      checkNumber: "IC202502230000",
      lotList: [...item1.lotList, ...item2.lotList, ...item3.lotList]
    };
    
    setInboundLocations(lotData.checkNumber, lotData.lotList);
    setInspectionComplete();
    
    // 첫 번째 물품의 스캔 페이지로 이동
    navigate('/inbound/item/1', { replace: true });
  }
};

  return (
    <div className="p-4 pb-34">
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
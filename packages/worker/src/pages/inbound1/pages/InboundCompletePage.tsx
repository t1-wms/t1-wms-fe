import { useNavigate } from 'react-router-dom';
import { useInboundStore } from '../store/inboundstore';
import Success from '@/shared/ui/Success';

function InboundCompletePage() {
  const navigate = useNavigate();
  const { inboundList, resetInbound } = useInboundStore();

  const normalItemsCount = inboundList.items.filter(
    item => !inboundList.rejectedItems.includes(item.id)
  ).length;

  const rejectedItemsCount = inboundList.rejectedItems.length;

  const handleHomeClick = () => {
    resetInbound(); // 입고 상태 초기화
    navigate('/');  // 홈으로 이동
  };

  const handleListClick = () => {
    resetInbound(); // 입고 상태 초기화
    navigate('/task'); // 작업 목록으로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-30">
      <div className="mb-6">
        <Success />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        배치 완료
      </h1>
      <p className="text-gray-800 mb-6 text-center">
        총 {normalItemsCount}개 물품의 배치가 완료되었습니다.
      </p>

      {/* 입고 결과 요약 */}
      <div className="w-full max-w-sm p-4 mb-8">
        <div className="flex justify-between items-center border-b border-gray-200 py-2">
          <span className="text-gray-800">입고 ID</span>
          <span className="font-medium">{inboundList.inboundId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 py-2">
          <span className="text-gray-600">정상 품목 수</span>
          <span className="font-medium text-green-600">{normalItemsCount}개</span>
        </div>
        {rejectedItemsCount > 0 && (
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">불량 품목 수</span>
            <span className="font-medium text-red-600">{rejectedItemsCount}개</span>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-2">
        <div className="max-w-sm mx-auto">
          <button
            onClick={handleHomeClick}
            className="w-full bg-t1normal text-white p-4 mb-3 rounded-md font-medium"
          >
            홈으로 이동
          </button>
          <button
            onClick={handleListClick}
            className="w-full bg-gray-200 text-gray-800 p-4 rounded-md font-medium"
          >
            작업 목록으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default InboundCompletePage;
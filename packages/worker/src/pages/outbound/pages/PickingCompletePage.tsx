import { useNavigate } from 'react-router-dom';
import { usePickingStore } from '../store/outboundstore';
import { BsCheckCircle } from 'react-icons/bs';

export const PickingCompletePage = () => {
  const navigate = useNavigate();
  const { pickingList, resetPicking } = usePickingStore();

  const handleHomeClick = () => {
    resetPicking(); // 피킹 상태 초기화
    navigate('/');  // 홈으로 이동
  };

  const handleListClick = () => {
    resetPicking(); // 피킹 상태 초기화
    navigate('/tasks'); // 작업 목록으로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-6">
        <BsCheckCircle className="text-green-500 text-6xl" />
      </div>

      {/* 완료 메시지 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        집품 완료
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        총 {pickingList.items.length}개 물품의 집품이 완료되었습니다.
      </p>

      {/* 피킹 결과 요약 */}
      <div className="bg-white w-full max-w-sm rounded-lg shadow-sm p-4 mb-8">
        <div className="flex justify-between items-center border-b border-gray-200 py-2">
          <span className="text-gray-600">피킹 ID</span>
          <span className="font-medium">{pickingList.pickingId}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">완료 품목 수</span>
          <span className="font-medium">{pickingList.items.length}개</span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col w-full max-w-sm gap-3">
        <button
          onClick={handleHomeClick}
          className="w-full bg-t1normal text-white py-3 rounded-md font-medium"
        >
          홈으로 이동
        </button>
        <button
          onClick={handleListClick}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium"
        >
          작업 목록으로 이동
        </button>
      </div>
    </div>
  );
};
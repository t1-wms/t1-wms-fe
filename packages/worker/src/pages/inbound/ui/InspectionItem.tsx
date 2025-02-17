interface InspectionItemProps {
    seq: number;
    code: string;
    name: string;
    quantity: number;
    onStatusChange: (status: 'accept' | 'reject') => void;
    status: 'pending' | 'accept' | 'reject';
  }
  
  function InspectionItem({ seq, code, name, quantity, onStatusChange, status }: InspectionItemProps) {
    return (
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-lg font-bold mr-2">{seq}</span>
            <span className="text-gray-600">{code}</span>
          </div>
          <span className="text-sm">수량: {quantity}개</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange('accept')}
              className={`px-3 py-1 rounded ${
                status === 'accept'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              수락
            </button>
            <button
              onClick={() => onStatusChange('reject')}
              className={`px-3 py-1 rounded ${
                status === 'reject'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              불량
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default InspectionItem;
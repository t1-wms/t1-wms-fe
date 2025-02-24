import { PickingItem } from '@/shared/types/items';

interface InspectionListProps {
  items: PickingItem[];
  itemStatuses: ('pending' | 'accept' | 'reject')[];
  onItemStatusChange: (index: number, status: 'accept' | 'reject') => void;
}

export const InspectionList = ({ items, itemStatuses, onItemStatusChange }: InspectionListProps) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="bg-white p-4 rounded-sm shadow">
          <div className="flex items-center gap-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">코드: {item.code}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onItemStatusChange(index, 'accept')}
              className={`flex-1 py-2 rounded ${
                itemStatuses[index] === 'accept'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              정상
            </button>
            <button
              onClick={() => onItemStatusChange(index, 'reject')}
              className={`flex-1 py-2 rounded ${
                itemStatuses[index] === 'reject'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              불량
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
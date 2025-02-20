import InspectionItem from './InspectionItem';
import { PickingItem } from '@/shared/types/items';

interface InspectionListProps {
  items: PickingItem[];
  onItemStatusChange: (index: number, status: 'accept' | 'reject') => void;
  itemStatuses: ('pending' | 'accept' | 'reject')[];
}

function InspectionList({ items, onItemStatusChange, itemStatuses }: InspectionListProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <InspectionItem
          key={item.id}
          seq={index + 1}
          code={item.code}
          name={item.name}
          quantity={item.quantity}
          status={itemStatuses[index]}
          onStatusChange={(status) => onItemStatusChange(index, status)}
        />
      ))}
    </div>
  );
}

export default InspectionList;
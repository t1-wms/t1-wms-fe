import { Location} from '@/shared/types/items';

function BinCodeDisplay({ zone, aisle, rack, floor }: Location)  {
  return (
    <div className="flex justify-center text-gray-50 px-2 py-4 items-center text-4xl font-bold">
    <span className="bg-purple-700 px-5 py-2">Z{zone}</span>
    <span className="bg-gray-600 px-5 py-2">{aisle}</span>
    <span className="bg-gray-400 px-5 py-2">{rack}</span>
    <span className="bg-green-600 px-5 py-2">{floor}</span>
  </div>
  )
}

export default BinCodeDisplay
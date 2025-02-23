// import { Task } from '../types/tasktypes';
// import { useTask } from '../hooks/usetask';

// function WorkItem({ work }: { work: Task }) {
//   const { handleTaskClick } = useTask();

//   function renderProductItems() {
//     return work.productList.slice(0, 2).map((product) => (
//       <div key={product.productId} className="flex items-center text-sm">
//         <span className="text-gray-600 w-24">{product.productCode}</span>
//         <span className="text-gray-800 flex-1">{product.productName}</span>
//       </div>
//     ));
//   }

//   function renderRemainingItemsCount() {
//     if (work.productList.length > 2) {
//       return (
//         <div className="text-sm text-gray-500">
//           외 {work.productList.length - 2}개 품목
//         </div>
//       );
//     }
//     return null;
//   }

//   return (
//     <div 
//       onClick={() => handleTaskClick(work)}
//       className="p-4 bg-white rounded-md shadow-sm mb-4 border border-gray-100 hover:border-t1normal transition-colors cursor-pointer"
//     >
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-lg font-bold text-gray-800">
//           {work.type === 'inbound' ? `입하 #${work.inboundId}` : `출고 #${work.pickingId}`}
//         </span>
//         <span className="text-sm text-gray-500">
//           {work.productList.length}개 품목
//         </span>
//       </div>
      
//       <div className="space-y-2">
//         {renderProductItems()}
//         {renderRemainingItemsCount()}
//       </div>
//     </div>
//   );
// }

// export default WorkItem;

import { Task, isInboundTask } from '../types/tasktypes';
import { useTask } from '../hooks/usetask';

function WorkItem({ work }: { work: Task }) {
  const { handleTaskClick } = useTask();

  function renderProductItems() {
    if (isInboundTask(work)) {
      return work.productList.slice(0, 2).map((product) => (
        <div key={product.productId} className="flex items-center text-sm">
          <span className="text-gray-600 w-28">{product.productCode}</span>
          <span className="text-gray-800 flex-1">{product.productName}</span>
        </div>
      ));
    } else {
      return work.lotLocations.slice(0, 2).map((location) => (
        <div key={location.lotId} className="flex items-center text-sm">
          <span className="text-gray-600 w-28">{location.productCode}</span>
          <span className="text-gray-800 flex-1">{location.productName}</span>
        </div>
      ));
    }
  }

  function renderRemainingItemsCount() {
    const itemCount = isInboundTask(work) 
      ? work.productList.length 
      : work.lotLocations.length;

    if (itemCount > 2) {
      return (
        <div className="text-sm text-gray-500">
          외 {itemCount - 2}개 품목
        </div>
      );
    }
    return null;
  }

  return (
    <div 
      onClick={() => handleTaskClick(work)}
      className="p-4 bg-white rounded-md shadow-sm mb-4 border border-gray-100 hover:border-t1normal transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-gray-800">
          {isInboundTask(work) 
            ? `입하 ${work.inboundId}` 
            : `출고 ${work.outboundAssignNumber}`}
        </span>
        <span className="text-sm text-gray-500">
          {isInboundTask(work) 
            ? `${work.productList.length}개 품목`
            : `${work.lotLocations.length}개 품목`}
        </span>
      </div>
      
      <div className="space-y-2">
        {renderProductItems()}
        {renderRemainingItemsCount()}
      </div>
    </div>
  );
}

export default WorkItem;
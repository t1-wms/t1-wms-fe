import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Product {
  productId: number;
  productCode: string;
  productName: string;
}

interface InboundWork {
  inboundId: number;
  productList: Product[];
}

interface InboundListProps {
  inboundWorks: InboundWork[];
}

export const exampleData = [
  {
    inboundId: 1001,
    productList: [
      { productId: 1, productCode: "A001", productName: "상품 A" },
      { productId: 2, productCode: "B001", productName: "상품 B" },
      { productId: 3, productCode: "C001", productName: "상품 C" },
    ],
  },
  {
    inboundId: 1002,
    productList: [
      { productId: 1, productCode: "A001", productName: "상품 A" },
      { productId: 2, productCode: "B001", productName: "상품 B" },
      { productId: 3, productCode: "C001", productName: "상품 C" },
    ],
  },
  {
    inboundId: 1003,
    productList: [
      { productId: 1, productCode: "A001", productName: "상품 A" },
      { productId: 2, productCode: "B001", productName: "상품 B" },
      { productId: 3, productCode: "C001", productName: "상품 C" },
    ],
  },
];

const InboundListItem = ({ inboundWork }: { inboundWork: InboundWork }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/inbound/inspection/${inboundWork.inboundId}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-100 hover:border-t1normal transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-gray-800">
          입하 #{inboundWork.inboundId}
        </span>
        <span className="text-sm text-gray-500">
          {inboundWork.productList.length}개 품목
        </span>
      </div>
      
      <div className="space-y-2">
        {inboundWork.productList.slice(0, 2).map((product) => (
          <div key={product.productId} className="flex items-center text-sm">
            <span className="text-gray-600 w-24">{product.productCode}</span>
            <span className="text-gray-800 flex-1">{product.productName}</span>
          </div>
        ))}
        {inboundWork.productList.length > 2 && (
          <div className="text-sm text-gray-500">
            외 {inboundWork.productList.length - 2}개 품목
          </div>
        )}
      </div>
    </div>
  );
};

function InboundListPage({ inboundWorks }: InboundListProps) {
  return (
    <div className="p-4 pb-24">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">오늘의 입하 작업</h1>
        <p className="text-sm text-gray-500">
          {format(new Date(), 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
        </p>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-500">
          전체 {inboundWorks.length}건의 입하 작업
        </span>
      </div>

      <div className="space-y-4">
        {inboundWorks.map((work) => (
          <InboundListItem key={work.inboundId} inboundWork={work} />
        ))}
      </div>
    </div>
  );
}

export default InboundListPage;
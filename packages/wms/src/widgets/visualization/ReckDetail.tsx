import { AnimatePresence, motion } from "framer-motion";
import { RackProps } from "./types";


interface RackDetailProps {
  rack: RackProps | null;
}

const RackDetail = ({ rack }: RackDetailProps) => {
  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence>
        {rack && (
          <motion.div
            key={rack.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 500, damping: 70 }}
            className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto" // 수정된 부분
          >
            <div className="backdrop-blur-sm bg-gray-100 rounded-sm">
              <p className="text-2xl font-bold text-gray-800 pb-2 p-6  sticky top-0 bg-gray-100 z-10">
                구역{rack.zone} - 통로{String(rack.aisle).padStart(2, "0")} - 랙{""}
                {String(rack.row).padStart(2, "0")}
              </p>
              <div className="space-y-3 p-4 mt-4">
                {Array.from({ length: 6 }, (_, i) => i + 1)
                  .reverse()
                  .map((floor) => {
                    const binInfo = rack.binData?.find(bin => bin.floor === floor);
                    const hasItems = binInfo && binInfo.lotList && binInfo.lotList.length > 0; // 수정된 부분
                    
                    return (
                      <div
                        key={floor}
                        className="bg-gray-200 p-3 rounded-sm border border-gray-300 hover:bg-gray-300 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-700">
                            {String(floor)}층
                          </h3>
                          <span className={`text-sm px-2 py-1 rounded-sm border ${
                            hasItems ? 'bg-green-100 text-green-800' : 'bg-white text-gray-500'
                          }`}>
                            {hasItems ? `${binInfo.lotList.length}개 보관중` : '비어있음'}
                          </span>
                        </div>
                        {binInfo?.lotList.map(lot => (
                          <div key={lot.lotId} className="mt-2 bg-white/70 rounded-sm p-2 text-sm text-gray-600">
                            <p>제품명: {lot.productInBinDto.productName}</p>
                            <p>로트번호: {lot.lotNumber}</p>
                            <p>상태: {lot.status}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RackDetail;
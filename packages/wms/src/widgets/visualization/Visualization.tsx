import { BinResponseDto, useBins } from "@/features";
import { useCallback, useEffect, useState } from "react";
import ReactGridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RackDetail from "./ReckDetail";
import ZoneLegend from "./ZoneLegend";
import { zoneColor } from "./constants";
import "./tailwind.css";
import { RackProps } from "./types";

const generateRacksForZone = (
  zone: string,
  startX: number,
  startY: number,
  binData: BinResponseDto[]
): RackProps[] => {
  const racks: RackProps[] = [];

  for (let aisle = 0; aisle < 6; aisle++) {
    for (let row = 5; row >= 0; row--) {
      const currentZoneBins = binData.filter(
        (bin) =>
          bin.zone === zone &&
          bin.aisle === aisle + 1 &&
          bin.row === 5 - row + 1
      );

      const isOccupied = currentZoneBins.some((bin) => bin.amount > 0);

      racks.push({
        id: `${zone}-${String(aisle + 1).padStart(2, "0")}-${String(
          5 - row + 1
        ).padStart(2, "0")}-01`,
        x: startX + aisle,
        y: startY + row,
        w: 1,
        h: 1,
        isOccupied,
        zone,
        aisle: aisle + 1,
        row: 5 - row + 1, // row 값을 역순으로 매핑
        binData: currentZoneBins,
      });
    }
  }
  return racks;
};

const WarehouseVisualization = () => {
  const { data } = useBins();

  const newRacks = [
    ...generateRacksForZone("D", 6, 0, data),
    ...generateRacksForZone("E", 12, 7, data),
    ...generateRacksForZone("F", 12, 0, data),
    ...generateRacksForZone("A", 0, 7, data),
    ...generateRacksForZone("B", 0, 0, data),
    ...generateRacksForZone("C", 6, 7, data),
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedRack, setSelectedRack] = useState<RackProps | null>(null);
  const [racks, setRacks] = useState<RackProps[]>(newRacks);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateGridWidth = useCallback(() => {
    return (windowWidth - 240) * 0.75;
  }, [windowWidth]);

  //랙 클릭시 동작 함수 및 콘솔로그로 받아오는 데이터 확인
  const handleRackClick = (rack: RackProps) => {
    console.group(`선택된 랙 정보: ${rack.id}`);
    console.log("랙 기본 정보:", {
      id: rack.id,
      zone: rack.zone,
      aisle: rack.aisle,
      row: rack.row,
      isOccupied: rack.isOccupied,
    });
    console.log("빈(Bin) 상세 정보:", rack.binData);

    if (rack.binData) {
      rack.binData.forEach((bin) => {
        console.log(`${bin.floor}층 정보:`, {
          재고량: bin.amount,
          로트목록: bin.lotList,
        });
      });
    }
    console.groupEnd();

    setSelectedRack(rack);
  };

  const onLayoutChange = (newLayout: Layout[]) => {
    const updatedRacks = racks.map((rack) => {
      const layoutItem = newLayout.find((item) => item.i === rack.id);
      if (layoutItem) {
        return {
          ...rack,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      console.log("생성된 랙 데이터:", layoutItem);
      return rack;
    });
    setRacks(updatedRacks);
  };

  return (
    <div className="flex w-full visual-container">
      <div className="w-3/4 bg-gray-100 rounded-sm">
        <div className="">
          <div className="">
            <div className="p-4">
              <ReactGridLayout
                className="layout"
                layout={racks.map((rack) => ({
                  i: rack.id,
                  x: rack.x,
                  y: rack.y,
                  w: rack.w,
                  h: rack.h,
                }))}
                cols={19}
                rowHeight={40}
                width={calculateGridWidth()}
                margin={[10, 2]}
                preventCollision={true}
                isDraggable={false}
                isResizable={false}
                compactType={null}
                onLayoutChange={onLayoutChange}
              >
                {racks.map((rack) => (
                  <div
                    key={rack.id}
                    className={`
                      ${zoneColor(rack.zone)} 
                      flex flex-col justify-center items-center 
                      cursor-pointer
                      ${rack.isOccupied ? "ring-2 ring-yellow-400" : ""}
                      ${
                        selectedRack?.id === rack.id
                          ? "ring-2 ring-purple-400"
                          : ""
                      }
                    `}
                    onClick={() => handleRackClick(rack)}
                  >
                    <p className="text-xs font-semibold text-gray-900">
                      {`${rack.zone}-${String(rack.aisle).padStart(2, "0")}`}
                    </p>
                    {rack.binData &&
                      rack.binData.some((bin) => bin.amount > 0) && (
                        <span className="text-xs text-gray-600">
                          {rack.binData.reduce(
                            (sum, bin) => sum + bin.amount,
                            0
                          )}
                          개
                        </span>
                      )}
                  </div>
                ))}
              </ReactGridLayout>
            </div>
          </div>
          <ZoneLegend />
        </div>
      </div>
      <div className="w-1/4 pl-2">
        <RackDetail rack={selectedRack} />
      </div>
    </div>
  );
};

export default WarehouseVisualization;

import { zoneColor } from "./constants";

const ZoneLegend = () => {
  return (
    <div className="mt-6 flex gap-4 flex-wrapp-4 rounded-md">
      {["A", "B", "C", "D", "E", "F"].map((zone) => (
        <div key={zone} className="flex items-center">
          <div className={`w-6 h-6 ${zoneColor(zone)} rounded mr-2 border-2`} />
          <span className="font-medium">{zone} 구역</span>
        </div>
      ))}
    </div>
  );
};

export default ZoneLegend;

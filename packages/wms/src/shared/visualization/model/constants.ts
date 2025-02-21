export const zoneColor = (zone: string) => {
  const colors = {
    A: "bg-blue-200 text-white hover:bg-blue-400 transition-colors",
    B: "bg-green-200 text-white hover:bg-green-400 transition-colors",
    C: "bg-lime-200 text-white hover:bg-yellow-400 transition-colors",
    D: "bg-red-200 text-white hover:bg-red-400 transition-colors",
    E: "bg-slate-200 text-white hover:bg-slate-400 transition-colors",
    F: "bg-gray-300 text-white hover:bg-gray-400 transition-colors",
  };
  return colors[zone as keyof typeof colors] || "bg-gray-500 text-white";
};

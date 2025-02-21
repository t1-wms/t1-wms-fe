interface LocationInfoProps {
    label: string;
    value: string;
  }
  
  
  function LocationInfo({ label, value }: LocationInfoProps) {
    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="font-semibold text-2xl text-gray-900">{label}</span>
        <span className="font-black text-2xl text-gray-900">{value}</span>
      </div>
    );
  }
  
  export default LocationInfo

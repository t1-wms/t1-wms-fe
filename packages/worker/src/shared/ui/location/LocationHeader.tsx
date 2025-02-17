import { HiLocationMarker } from 'react-icons/hi';

function LocationHeader() {
  return (
    <div className="flex text-lg font-bold mb-2 justify-center items-center"> 
    <HiLocationMarker className="mr-1.5 text-red-500 text-xl" />
    다음 위치로 이동해주세요.
  </div>
  )
}

export default LocationHeader
import { NavigationBar } from "@/shared/ui/navigationbar/NavigaitionBar";
import { Outlet } from "react-router-dom";


 
function App() {

  return (
    <div className="bg-gray-50 relative max-w-[430px] mx-auto min-h-screen">
      <Outlet />
      <NavigationBar />
    </div>
  )
}

export default App

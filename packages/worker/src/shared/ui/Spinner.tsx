import { PulseLoader } from "react-spinners";

function Spinner() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader
          color= "#0363DE"
          size={15}
          loading={true}
          speedMultiplier={0.5}
        />
      </div>
    );
}

export default Spinner
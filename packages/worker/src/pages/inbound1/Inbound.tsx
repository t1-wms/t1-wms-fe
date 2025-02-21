import { Routes, Route } from 'react-router-dom';
import InspectionPage from './pages/InspectionPage';
import ItemScanPage from './pages/ItemScanPage';
import LocationScanPage from './pages/LocationScanPage';
import InboundCompletePage from './pages/InboundCompletePage';

export const Inbound = () => {
  return (
    <Routes>
      <Route path="/inspection/:itemId" element={<InspectionPage />} />
      <Route path="/item/:itemId" element={<ItemScanPage />} />
      <Route path="/location/:itemId" element={<LocationScanPage />} />
      <Route path="/complete" element={<InboundCompletePage />} />
    </Routes>
  );
};
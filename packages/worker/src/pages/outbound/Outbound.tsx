import { Routes, Route } from 'react-router-dom';
import { LocationScanPage } from './pages/LocationScanPage';
import { ItemScanPage } from './pages/ItemScanPage';
import { PickingCompletePage } from './pages/PickingCompletePage';

export const Outbound = () => {
  return (
    <Routes>
      <Route path="/location/:itemId" element={<LocationScanPage />} />
      <Route path="/item/:itemId" element={<ItemScanPage />} />
      <Route path="/complete" element={<PickingCompletePage />} />
    </Routes>
  );
};
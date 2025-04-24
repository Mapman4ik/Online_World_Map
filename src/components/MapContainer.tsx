import React, { useEffect } from 'react';
import { MapView } from './MapView';
import { LayerControl } from './LayerControl';
import { RegionInfo } from './RegionInfo';
import { useMapContext } from '../context/MapContext';

export const MapContainer: React.FC = () => {
  const { selectedRegion, isSidebarOpen } = useMapContext();

  useEffect(() => {
    // Trigger resize event when sidebar opens/closes
    // This ensures the map properly adjusts its size
    window.dispatchEvent(new Event('resize'));
  }, [isSidebarOpen]);

  return (
    <div className="relative h-full flex">
      <LayerControl />
      <div className={`transition-all duration-300 flex-grow h-full ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <MapView />
      </div>
      {selectedRegion && <RegionInfo />}
    </div>
  );
};
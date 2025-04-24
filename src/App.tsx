import React from 'react';
import { MapContainer } from './components/MapContainer';
import { AppHeader } from './components/AppHeader';
import { useMapContext, MapProvider } from './context/MapContext';

function AppContent() {
  const { isLoading } = useMapContext();

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <main className="flex-grow relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-primary text-lg font-medium">Loading map data...</p>
            </div>
          </div>
        )}
        <MapContainer />
      </main>
    </div>
  );
}

function App() {
  return (
    <MapProvider>
      <AppContent />
    </MapProvider>
  );
}

export default App;
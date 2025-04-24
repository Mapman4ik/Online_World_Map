import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import L from 'leaflet';
import { mockGeoJsonData } from '../data/mockGeoJsonData';

interface MapContextType {
  geoJsonData: any;
  activeLayer: string;
  setActiveLayer: (layer: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  zoomLevel: number | null;
  setZoomLevel: (level: number) => void;
  selectedRegion: any | null;
  handleRegionClick: (region: any) => void;
  clearSelectedRegion: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchLocation: (query: string) => void;
  searchResults: any[];
  searchMarker: L.Marker | null;
  setSearchMarker: (marker: L.Marker | null) => void;
  isLoading: boolean;
  layerStyles: {
    [key: string]: (feature?: any) => any;
  };
  setWorldView: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>('base');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchMarker, setSearchMarker] = useState<L.Marker | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setGeoJsonData(mockGeoJsonData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
  };

  const clearSelectedRegion = () => {
    setSelectedRegion(null);
  };

  const searchLocation = (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const results = [
        {
          name: query,
          location: {
            lat: 43.8666 + (Math.random() - 0.5) * 0.2,
            lng: 77.0628 + (Math.random() - 0.5) * 0.2
          }
        }
      ];
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const setWorldView = () => {
    const map = document.querySelector('.leaflet-container')?._leaflet_map;
    if (map) {
      map.setView([0, 0], 2);
      map.setMaxBounds(null);
      map.setMinZoom(2);
    }
  };

  const getColorScale = (value: number, colors: string[]): string => {
    const normalizedValue = Math.min(100, Math.max(0, value));
    const index = Math.floor(normalizedValue / 100 * (colors.length - 1));
    return colors[index];
  };

  const layerStyles = {
    base: (feature?: any) => ({
      fillColor: getColorScale(feature?.properties?.value || 0, [
        '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'
      ]),
      weight: 2,
      opacity: 1,
      color: '#fff',
      dashArray: '3',
      fillOpacity: 0.7
    }),
    economic: (feature?: any) => ({
      fillColor: getColorScale(feature?.properties?.gdp || 0, [
        '#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'
      ]),
      weight: 2,
      opacity: 1,
      color: '#fff',
      dashArray: '3',
      fillOpacity: 0.7
    }),
    groundwater: (feature?: any) => ({
      fillColor: getColorScale(feature?.properties?.waterLevel || 0, [
        '#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b'
      ]),
      weight: 2,
      opacity: 1,
      color: '#fff',
      dashArray: '3',
      fillOpacity: 0.7
    }),
    terrain: (feature?: any) => ({
      fillColor: getColorScale(feature?.properties?.elevation || 0, [
        '#ffffd4', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'
      ]),
      weight: 2,
      opacity: 1,
      color: '#fff',
      dashArray: '3',
      fillOpacity: 0.7
    })
  };

  return (
    <MapContext.Provider
      value={{
        geoJsonData,
        activeLayer,
        setActiveLayer,
        isSidebarOpen,
        toggleSidebar,
        zoomLevel,
        setZoomLevel,
        selectedRegion,
        handleRegionClick,
        clearSelectedRegion,
        searchQuery,
        setSearchQuery,
        searchLocation,
        searchResults,
        searchMarker,
        setSearchMarker,
        isLoading,
        layerStyles,
        setWorldView
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
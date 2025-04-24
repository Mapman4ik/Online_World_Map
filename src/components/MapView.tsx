import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl, ScaleControl, useMap } from 'react-leaflet';
import { useMapContext } from '../context/MapContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapEvents: React.FC = () => {
  const map = useMap();
  const { setZoomLevel, setSearchMarker, searchMarker, searchResults } = useMapContext();

  useEffect(() => {
    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });
    
    return () => {
      map.off('zoomend');
    };
  }, [map, setZoomLevel]);

  useEffect(() => {
    if (searchResults.length > 0) {
      const location = searchResults[0].location;
      if (location) {
        map.flyTo([location.lat, location.lng], 13);
        
        if (searchMarker) {
          searchMarker.remove();
        }
        
        const marker = L.marker([location.lat, location.lng])
          .addTo(map)
          .bindPopup(searchResults[0].name)
          .openPopup();
        
        setSearchMarker(marker);
      }
    }
  }, [searchResults, map, searchMarker, setSearchMarker]);

  return null;
};

export const MapView: React.FC = () => {
  const { 
    geoJsonData, 
    activeLayer, 
    handleRegionClick,
    layerStyles
  } = useMapContext();
  
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name, { 
        permanent: false, 
        direction: 'center',
        className: 'region-tooltip'
      });
      
      layer.on({
        click: (e) => {
          handleRegionClick(feature);
        },
        mouseover: (e) => {
          const l = e.target;
          l.setStyle({
            weight: 3,
            fillOpacity: 0.7
          });
        },
        mouseout: (e) => {
          if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.resetStyle(e.target);
          }
        }
      });
    }
  };

  return (
    <MapContainer
      center={[43.5491, 77.0628]} // Ashybulak coordinates
      zoom={11}
      className="h-full w-full"
      zoomControl={false}
      minZoom={10}
      maxZoom={14}
      maxBounds={[
        [43.4491, 76.9628], // Southwest bounds
        [43.6491, 77.1628]  // Northeast bounds
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={(feature) => {
            return layerStyles[activeLayer](feature);
          }}
          onEachFeature={onEachFeature}
          ref={geoJsonLayerRef}
        />
      )}
      
      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" />
      <MapEvents />
    </MapContainer>
  );
};
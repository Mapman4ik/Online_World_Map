import React from 'react';
import { X } from 'lucide-react';
import { useMapContext } from '../context/MapContext';

export const RegionInfo: React.FC = () => {
  const { selectedRegion, clearSelectedRegion, activeLayer } = useMapContext();

  if (!selectedRegion) return null;

  const getLayerSpecificInfo = () => {
    const props = selectedRegion.properties;
    
    switch (activeLayer) {
      case 'economic':
        return (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">ВВП:</span>
              <span className="font-medium">${props.gdp || 'N/A'} млрд</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Отрасль:</span>
              <span className="font-medium">{props.industry || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Безработица:</span>
              <span className="font-medium">{props.unemployment || 'N/A'}%</span>
            </div>
          </div>
        );
      case 'groundwater':
        return (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Уровень воды:</span>
              <span className="font-medium">{props.waterLevel || 'N/A'} м</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Качество:</span>
              <span className="font-medium">{props.waterQuality || 'N/A'}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Тип:</span>
              <span className="font-medium">{props.waterType || 'N/A'}</span>
            </div>
          </div>
        );
      case 'terrain':
        return (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Высота:</span>
              <span className="font-medium">{props.elevation || 'N/A'} м</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Тип местности:</span>
              <span className="font-medium">{props.terrainType || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Растительность:</span>
              <span className="font-medium">{props.vegetation || 'N/A'}</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Население:</span>
              <span className="font-medium">{props.population || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Площадь:</span>
              <span className="font-medium">{props.area || 'N/A'} км²</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute top-4 right-4 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-20 animate-slideIn">
      <div className="px-4 py-3 bg-primary text-white flex justify-between items-center">
        <h3 className="font-medium truncate">
          {selectedRegion.properties.name || 'Информация о регионе'}
        </h3>
        <button 
          onClick={clearSelectedRegion}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getLayerColor(activeLayer)}`} 
              style={{ width: `${selectedRegion.properties.dataValue || 50}%` }}
            ></div>
          </div>
        </div>
        
        {getLayerSpecificInfo()}
      </div>
    </div>
  );
};

function getLayerColor(layer: string): string {
  switch (layer) {
    case 'economic': return 'bg-blue-500';
    case 'groundwater': return 'bg-cyan-500';
    case 'terrain': return 'bg-amber-500';
    default: return 'bg-emerald-500';
  }
}
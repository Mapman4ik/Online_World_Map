import React from 'react';
import { useMapContext } from '../context/MapContext';
import { Layers, ChevronLeft, ChevronRight, Map, BarChart3, Droplets, Mountain } from 'lucide-react';

export const LayerControl: React.FC = () => {
  const { 
    activeLayer, 
    setActiveLayer, 
    isSidebarOpen, 
    toggleSidebar,
    zoomLevel,
    setWorldView
  } = useMapContext();

  const layers = [
    { id: 'base', name: 'Базовая карта', icon: <Map className="w-5 h-5" />, description: 'Основные границы и объекты' },
    { id: 'economic', name: 'Экономическая', icon: <BarChart3 className="w-5 h-5" />, description: 'Экономические показатели' },
    { id: 'groundwater', name: 'Подземные воды', icon: <Droplets className="w-5 h-5" />, description: 'Уровни и качество воды' },
    { id: 'terrain', name: 'Рельеф', icon: <Mountain className="w-5 h-5" />, description: 'Типы местности и высоты' },
  ];

  return (
    <>
      <button
        className={`absolute top-4 ${isSidebarOpen ? 'left-64' : 'left-4'} z-40 bg-white rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none hover:bg-gray-100`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <div 
        className={`absolute top-0 left-0 z-30 h-full bg-white shadow-md transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-center mb-6 mt-4">
            <Layers className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-lg font-bold">Слои карты</h2>
          </div>

          <div className="space-y-2">
            {layers.map(layer => (
              <button
                key={layer.id}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                  activeLayer === layer.id
                    ? 'bg-primary bg-opacity-10 text-primary'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveLayer(layer.id)}
              >
                <div className={`mr-3 ${activeLayer === layer.id ? 'text-primary' : 'text-gray-500'}`}>
                  {layer.icon}
                </div>
                <div>
                  <div className="font-medium">{layer.name}</div>
                  <div className="text-xs text-gray-500">{layer.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">Информация</div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Текущий масштаб:</span>
              <span className="font-medium">{zoomLevel || '-'}</span>
            </div>
            <button
              onClick={() => setWorldView()}
              className="mt-3 w-full py-2 px-4 bg-primary text-white rounded-lg text-sm hover:bg-primary-light transition-colors"
            >
              Показать карту мира
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
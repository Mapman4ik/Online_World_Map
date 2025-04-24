import React, { useState } from 'react';
import { Search, Map, Menu, X } from 'lucide-react';
import { useMapContext } from '../context/MapContext';

export const AppHeader: React.FC = () => {
  const { searchQuery, setSearchQuery, searchLocation } = useMapContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  return (
    <header className="bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Map className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Ащибулакский сельский округ</h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Поиск по округу..."
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск по округу..."
                className="py-2 pl-10 pr-4 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
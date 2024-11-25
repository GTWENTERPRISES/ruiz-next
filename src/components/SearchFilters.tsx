import React from 'react';
import { Search, BedDouble, DollarSign, Users } from 'lucide-react';

export default function SearchFilters() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por ubicación..."
            className="input-field pl-12"
          />
        </div>
        
        <div className="relative">
          <BedDouble className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="input-field pl-12 appearance-none">
            <option value="">Habitaciones</option>
            <option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option>
            <option value="3">3+ Habitaciones</option>
          </select>
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="input-field pl-12 appearance-none">
            <option value="">Precio por noche</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101+">$101+</option>
          </select>
        </div>
        
        <div className="relative">
          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="input-field pl-12 appearance-none">
            <option value="">Huéspedes</option>
            <option value="1-2">1-2 personas</option>
            <option value="3-4">3-4 personas</option>
            <option value="5+">5+ personas</option>
          </select>
        </div>
      </div>
    </div>
  );
}
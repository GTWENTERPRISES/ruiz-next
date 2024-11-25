import React from 'react';
import { Star, MapPin, Users, Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Apartment } from '../types/apartment';

interface Props {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: Props) {
  return (
    <Link to={`/apartment/${apartment.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden card-hover">
        <div className="relative aspect-[4/3]">
          <img
            src={apartment.images[0]}
            alt={apartment.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!apartment.is_available && (
            <div className="absolute top-2 right-2 bg-black/75 text-white px-3 py-1 rounded-lg text-sm">
              No disponible
            </div>
          )}
          <button className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
            <Star className="w-5 h-5 stroke-2" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg text-gray-900 truncate">
              {apartment.title}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-airbnb fill-airbnb" />
              <span className="font-medium">{apartment.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{apartment.location}</span>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{apartment.bedrooms} hab.</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{apartment.bathrooms} baños</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{apartment.max_guests} huésp.</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg">
              <span className="font-semibold">${apartment.price_per_night}</span>
              <span className="text-gray-500"> noche</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
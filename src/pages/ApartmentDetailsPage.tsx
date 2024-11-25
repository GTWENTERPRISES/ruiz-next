import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApartmentById } from '../services/api';
import { Apartment } from '../types/apartment';
import { Star, MapPin, Users, Bed, Bath, Phone, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        if (!id) return;
        const data = await getApartmentById(parseInt(id));
        setApartment(data);
      } catch (err) {
        toast.error('Error al cargar los detalles del apartamento');
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!apartment) return;
    const message = `Hola, estoy interesado en el departamento "${apartment.title}" publicado en La Maná Rentals.`;
    const whatsappUrl = `https://wa.me/${apartment.contact_phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se encontró el apartamento</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="col-span-2 lg:col-span-1">
          <img
            src={apartment.images[0]}
            alt={apartment.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {apartment.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${apartment.title} - ${index + 2}`}
                className="w-full h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{apartment.title}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg">{apartment.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{apartment.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-gray-500" />
              <span>{apartment.bedrooms} habitaciones</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-gray-500" />
              <span>{apartment.bathrooms} baños</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span>{apartment.max_guests} huéspedes</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-gray-600">{apartment.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Servicios</h2>
            <div className="grid grid-cols-2 gap-2">
              {apartment.amenities.map((amenity, index) => (
                <div key={index} className="text-gray-600">
                  • {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold">${apartment.price_per_night}</span>
                <span className="text-gray-600"> /noche</span>
              </div>
              {apartment.contact_phone && (
                <button
                  onClick={handleWhatsAppClick}
                  className="btn bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { getApartments } from '../services/api';
import { Apartment } from '../types/apartment';
import ApartmentCard from '../components/ApartmentCard';
import SearchFilters from '../components/SearchFilters';
import { Home, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setError(null);
        const data = await getApartments();
        setApartments(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los apartamentos';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">La Maná Rentals</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-gray-600">Lo sentimos, ha ocurrido un error al cargar los apartamentos.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
            {apartments.length === 0 && !error && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No hay apartamentos disponibles en este momento.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
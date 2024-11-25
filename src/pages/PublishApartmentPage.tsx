import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishApartment } from '../services/api';
import { Upload, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PublishApartmentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_night: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    max_guests: '',
    contact_phone: '',
    amenities: [''],
    images: [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        price_per_night: parseFloat(formData.price_per_night),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        max_guests: parseInt(formData.max_guests),
        amenities: formData.amenities.filter(Boolean),
        images: formData.images.filter(Boolean),
      };

      await publishApartment(data);
      toast.success('¡Departamento publicado exitosamente!');
      navigate('/');
    } catch (error) {
      toast.error('Error al publicar el departamento');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAmenity = () => {
    setFormData(prev => ({
      ...prev,
      amenities: [...prev.amenities, ''],
    }));
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Publicar Departamento</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ej: Hermoso departamento en el centro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Describe tu departamento..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio por noche ($)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price_per_night}
                onChange={e => setFormData(prev => ({ ...prev, price_per_night: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ej: Centro de La Maná"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habitaciones
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.bedrooms}
                onChange={e => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Baños
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.bathrooms}
                onChange={e => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Huéspedes máx.
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.max_guests}
                onChange={e => setFormData(prev => ({ ...prev, max_guests: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp (con código de país)
            </label>
            <input
              type="tel"
              required
              value={formData.contact_phone}
              onChange={e => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ej: +593912345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servicios
            </label>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={amenity}
                  onChange={e => {
                    const newAmenities = [...formData.amenities];
                    newAmenities[index] = e.target.value;
                    setFormData(prev => ({ ...prev, amenities: newAmenities }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ej: WiFi, TV, Aire acondicionado"
                />
                {formData.amenities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAmenity}
              className="mt-2 btn btn-outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar servicio
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URLs de imágenes
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={e => {
                    const newImages = [...formData.images];
                    newImages[index] = e.target.value;
                    setFormData(prev => ({ ...prev, images: newImages }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImage}
              className="mt-2 btn btn-outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar imagen
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Publicar Departamento
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
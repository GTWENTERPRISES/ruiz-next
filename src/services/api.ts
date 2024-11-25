import axios, { AxiosError } from 'axios';
import { Apartment } from '../types/apartment';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApartments = async (): Promise<Apartment[]> => {
  try {
    const response = await api.get<Apartment[]>('/apartments/');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 
        'Error al conectar con el servidor. Por favor, intente más tarde.'
      );
    }
    throw new Error('Ha ocurrido un error inesperado.');
  }
};

export const getApartmentById = async (id: number): Promise<Apartment> => {
  try {
    const response = await api.get<Apartment>(`/apartments/${id}/`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 
        'Error al cargar el apartamento. Por favor, intente más tarde.'
      );
    }
    throw new Error('Ha ocurrido un error inesperado.');
  }
};

export const publishApartment = async (apartmentData: Partial<Apartment>): Promise<Apartment> => {
  try {
    const response = await api.post<Apartment>('/apartments/', apartmentData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 
        'Error al publicar el apartamento. Por favor, intente más tarde.'
      );
    }
    throw new Error('Ha ocurrido un error inesperado.');
  }
};
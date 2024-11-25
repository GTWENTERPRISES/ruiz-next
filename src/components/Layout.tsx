import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Search, Plus, Globe, Menu, User } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-8 h-8 text-airbnb" />
              <span className="text-xl font-bold text-airbnb">La Maná Rentals</span>
            </Link>

            <div className="hidden md:flex items-center px-4 py-2 rounded-full border shadow-sm hover:shadow-md transition-shadow">
              <button className="px-4 py-1 font-medium border-r">Cualquier lugar</button>
              <button className="px-4 py-1 font-medium border-r">Cualquier semana</button>
              <button className="px-4 py-1 text-gray-500">Añadir huéspedes</button>
              <div className="ml-2 p-2 bg-airbnb rounded-full text-white">
                <Search className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/publish" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-50">
                <span className="font-medium">Pon tu espacio en Airbnb</span>
              </Link>
              <button className="p-3 rounded-full hover:bg-gray-50">
                <Globe className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-full border shadow-sm hover:shadow-md transition-shadow">
                <Menu className="w-4 h-4" />
                <div className="p-1 rounded-full bg-gray-500 text-white">
                  <User className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        <Outlet />
      </main>
    </div>
  );
}
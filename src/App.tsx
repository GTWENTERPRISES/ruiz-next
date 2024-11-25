import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ApartmentDetailsPage from './pages/ApartmentDetailsPage';
import PublishApartmentPage from './pages/PublishApartmentPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartment/:id" element={<ApartmentDetailsPage />} />
          <Route path="/publish" element={<PublishApartmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
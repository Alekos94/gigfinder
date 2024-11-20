import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LocationProvider } from './context/location-context';
import { FavouritesProvider } from './context/favourites-context';

const container = document.getElementById('root')

if (!container) {
  throw new Error ('Root Element not found')  
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <LocationProvider>
      <FavouritesProvider>
      <App />
      </FavouritesProvider>
    </LocationProvider>
  </React.StrictMode>
);



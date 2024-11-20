import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavouritesPage from './favourites-page';
import { mockFavouriteList } from '../../../tests/mocks/favouriteMocks';
import '@testing-library/jest-dom'
import '@testing-library/react';

describe('FavouritesPage', () => {
  it('should render the favourites page', () => {
    render(<FavouritesPage />);
    expect(screen.getByText('No favourites added yet..') || screen.getByText('YOUR FAVOURITE EVENTS')).toBeInTheDocument();
  });
});
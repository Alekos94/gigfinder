import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesPage from './favourites-page';
import '@testing-library/jest-dom';
import '@testing-library/react';

describe('FavouritesPage', () => {
  it('should render the favourites page', () => {
    render(<FavouritesPage />);
    expect(
      screen.getByText('No favourites added yet..') ||
        screen.getByText('YOUR FAVOURITE EVENTS')
    ).toBeInTheDocument();
  });
});

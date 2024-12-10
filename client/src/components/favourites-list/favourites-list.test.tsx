import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesList } from './favourites-list';
import { mockFavouriteList } from '../../../tests/mocks/favouriteMocks';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('FavouritesList', () => {
  it('should render the list of favourites', () => {
    render(
      <BrowserRouter>
        <FavouritesList events={mockFavouriteList} />
      </BrowserRouter>
    );
    expect(screen.getByText('Bon Giovi')).toBeInTheDocument();
    expect(screen.getByText('The Watch Plays Genesis')).toBeInTheDocument();
  });

  it('should navigate tp /event-details when "More info" button is clicked', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <BrowserRouter>
        <FavouritesList events={mockFavouriteList} />
      </BrowserRouter>
    );
    const moreInfoButton = screen.getAllByRole('button', {
      name: /more info/i
    });
    await userEvent.click(moreInfoButton[0]);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/event-details/',
      expect.objectContaining({
        state: expect.objectContaining({
          event: expect.objectContaining({
            _embedded: expect.objectContaining({
              attractions: expect.any(Array)
            })
          })
        })
      })
    );
  });
});

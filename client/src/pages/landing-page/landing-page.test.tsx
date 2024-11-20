import React from 'react';
import LandingPage from './landing-page';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import '@testing-library/react';
import { LocationProvider } from '../../context/location-context';

describe(('LandingPage'), () => {
  it('should render the find button on the page', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
     );

     const findButton = screen.getByText('FIND');
     expect(findButton).toBeInTheDocument();
  });

  it("should store the user's location in localStorage after clicking 'find'", async () => {
    // Mock geolocation using Object.defineProperty
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        success({
          coords: {
            latitude: 51.5074,
            longitude: 0.1278,
          },
        })
      ),
    };

    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
    });

    // Mock localStorage
    const setItemMock = jest.spyOn(Storage.prototype, "setItem");

    // Mock localStorage.getItem to return null initially
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(
      <BrowserRouter>
        <LocationProvider>
          <LandingPage />
        </LocationProvider>
      </BrowserRouter>
    );

    const findButton = screen.getByText("FIND");
    fireEvent.click(findButton);

    // Check if localStorage.setItem was called with the expected arguments
    await expect(setItemMock).toHaveBeenCalledWith(
      "location",
      JSON.stringify({ latitude: "51.5074", longitude: "0.1278" })
    );
  });
});
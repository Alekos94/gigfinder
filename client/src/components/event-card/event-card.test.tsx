import React from "react";
import EventCard from "./event-card";
import { render, screen } from "@testing-library/react";
import { FavouritesProvider } from "../../context/favourites-context";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import { FavouritesContext, FavouritesContextType } from "../../context/favourites-context";
import user from '@testing-library/user-event';


    let mockedNavigate = jest.fn()
    // const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...(jest.requireActual('react-router-dom')),
      useNavigate: () => mockedNavigate
      }))

describe('Event-card-tests', () => {
  const iEvent = {
    id: "1",
    name: "Mock Event",
    dates: {
      start: {
        localDate: "2024-12-31",
        localTime: "20:00:00",
        dateTime: "2024-12-31T20:00:00Z",
      },
    },
    images: [
      { url: "https://example.com/image1.jpg" },
      { url: "https://example.com/image2.jpg" },
    ],
    _embedded: {
      venues: [
        {
          name: "Mock Venue",
          address: {
            line1: "123 Mock St.",
          },
          city: {
            name: "Mock City",
          },
          country: {
            name: "Mock Country",
          },
          location: {
            longitude: "12.345678",
            latitude: "98.765432",
          },
        },
      ],
    },
    url: "https://example.com/event",
  };


  test('renders event name, date, time, and venue correctly', () => {
    render(
      <FavouritesProvider>
        <MemoryRouter>
          <EventCard event={iEvent} />
        </MemoryRouter>
      </FavouritesProvider>);
    const eventName = screen.getByRole('heading');
    const eventDate = screen.getByText("2024-12-31");
    const eventTime = screen.getByText("20:00:00");
    const eventVenue = screen.getByText("Mock Venue")
    const eventImg = screen.getByRole('img', {name: iEvent.name})
    expect(eventName).toHaveTextContent("Mock Event");
    expect(eventDate).toBeInTheDocument();
    expect(eventTime).toBeInTheDocument();
    expect(eventVenue).toBeInTheDocument();
    expect(eventImg).toHaveAttribute('src', iEvent.images[0].url);
  })

  test('renders add-to-favourites button correctly', () => {
    render(
      <FavouritesProvider>
        <MemoryRouter>
          <EventCard event={iEvent} />
        </MemoryRouter>
      </FavouritesProvider>);
      const addButton = screen.getByText('Add to Favourites')
      expect(addButton).toBeInTheDocument();
  })

  test('renders remove-favourites button correctly', () => {
    const mockContextValue = {
      favourites: [{ eventId: "1", eventDetails: iEvent},],
      addToFavourites: jest.fn(),
      deleteFromFavourites: jest.fn(),
    };
    
    render(
      <FavouritesContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <EventCard event={iEvent} />
        </MemoryRouter>
      </FavouritesContext.Provider>);
      const deleteButton = screen.getByText('Remove from Favourites')
      expect(deleteButton).toBeInTheDocument();
  })

  test('renders more-info button correctly', () => {
    render(
      <FavouritesProvider>
        <MemoryRouter>
          <EventCard event={iEvent} />
        </MemoryRouter>
      </FavouritesProvider>);

    const infoButton = screen.getByRole('button', {name: 'More Info'});
    expect(infoButton).toBeInTheDocument()
  })

  test('handlers addFvaourite and moreInfo are called', async () => {
    // // const mockedUsedNavigate = jest.fn();
    // jest.mock('react-router-dom', () => ({
    // // ...(jest.requireActual('react-router-dom')),
    // useNavigate: jest.fn()
    // }))
    
    const mockContextValue = {
      favourites: [], 
      addToFavourites: jest.fn(), 
      deleteFromFavourites: jest.fn(), 
    };
    


    render(
      <FavouritesContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <EventCard event={iEvent} />
        </MemoryRouter>
      </FavouritesContext.Provider>);

    const addButton = screen.getByRole('button', {name: 'Add to Favourites'});
    const moreInfoButton = screen.getByRole('button', {name: 'More Info'})

    await user.click(addButton);
    await user.click(moreInfoButton);
    
    expect(mockContextValue.addToFavourites).toHaveBeenCalledTimes(1)
    expect(mockContextValue.addToFavourites).toHaveBeenCalledWith(iEvent);
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedNavigate).toHaveBeenCalledWith(`/event-details/`, { state: { event: iEvent } })
  })
})
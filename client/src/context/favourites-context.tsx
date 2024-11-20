import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { IFavourite, IEvent } from '../@types/event';

export interface FavouritesContextType {
  favourites: IFavourite[];
  addToFavourites: (event: IEvent) => Promise<void>;
  deleteFromFavourites: (eventId: string) => Promise<void>
}

export const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function FavouritesProvider ({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<IFavourite[]>([]);

  //on load fetch favourites from backend
  useEffect(() => {
    const fetchFavourites = async() => {
      try {
        const response = await fetch('http://localhost:3001/api/favourites');
        const data = await response.json();
        setFavourites(data);
      } catch (error) {
        console.error('Error fetching favourites');
      }
    }
    fetchFavourites();
  }, [])

  //add favourites
  const addToFavourites = async(event: IFavourite['eventDetails']) => {
    try {
      const response = await fetch('http://localhost:3001/api/favourites', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ eventId: event.id, eventDetails: event }),
      })
      const newFavourite = await response.json();
      setFavourites([...favourites, newFavourite]);
    } catch (error) {
      console.error('Error adding to favourites', error);
    }
  }

  //delete from favourites
  const deleteFromFavourites = async(eventId: string) => {
    try {
      await fetch(`http://localhost:3001/api/favourites/${eventId}`, {method: 'DELETE'});
      setFavourites(favourites.filter((favourite) => favourite.eventId !== eventId));

    } catch (error) {
      console.error('Error deleting from favourites:  ', error);
    }
  }

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, deleteFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  )
}
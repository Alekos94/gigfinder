import React from 'react';
import FavouritesCard from '../favourites-card/favourites-card';
import { IFavourite } from '../../@types/event';
import '../event-list/event-list.css';

interface FavouritesListProps {
  events: IFavourite[];
}

export function FavouritesList({ events }: FavouritesListProps) {
  return (
    <div className="events-list-container">
      {events.length > 0 ? (
        events.map(event => (
          <FavouritesCard key={event.eventId} event={event} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

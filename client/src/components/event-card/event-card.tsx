import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FavouritesContext,
  FavouritesContextType
} from '../../context/favourites-context';
import { IEvent, IFavourite } from '../../@types/event';
import './event-card.css';

interface EventCardProps {
  event: IEvent;
}

function EventCard({ event }: EventCardProps) {
  const { favourites, addToFavourites, deleteFromFavourites } = useContext(
    FavouritesContext
  ) as FavouritesContextType;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      favourites &&
      favourites.some((fav: IFavourite) => fav.eventId === event.id)
    )
      setIsFavourite(true);
    else setIsFavourite(false);
  }, [favourites, event.id]);

  function handleMoreInfo(event: IEvent) {
    navigate(`/event-details/`, { state: { event } });
  }

  const venue =
    event._embedded && event._embedded.venues[0]
      ? event._embedded.venues[0].name
      : 'Venue not available';

  return (
    <div className="event-card">
      <img src={event.images[0].url} alt={event.name} className="event-image" />
      <div className="event-details">
        <h3 className="event-name">{event.name}</h3>
        <p className="event-date">{event.dates.start.localDate}</p>
        <p className="event-time">{event.dates.start.localTime}</p>
        <p className="event-venue">{venue}</p>
        {isFavourite ? (
          <button
            className="remove-from-favourites"
            onClick={() => deleteFromFavourites(event.id)}
          >
            Remove from Favourites
          </button>
        ) : (
          <button
            className="add-to-favourites"
            onClick={() => addToFavourites(event)}
          >
            Add to Favourites
          </button>
        )}
        <button className="more-info" onClick={() => handleMoreInfo(event)}>
          More Info
        </button>
      </div>
    </div>
  );
}

export default EventCard;

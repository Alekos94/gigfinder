import React, { useContext } from 'react';
import '../event-card/event-card.css';
import { FavouritesContext } from '../../context/favourites-context';
import { useNavigate } from 'react-router-dom';
import { IFavourite } from '../../@types/event';

interface FavouritesCardProps {
  event: IFavourite;
}

function FavouritesCard({ event }: FavouritesCardProps) {
  const { deleteFromFavourites } = useContext(FavouritesContext) || {};
  const navigate = useNavigate();

  function handleMoreInfo(event: IFavourite['eventDetails']) {
    navigate(`/event-details/`, { state: { event } });
  }

  const venue = event.eventDetails._embedded.venues[0].name;

  return (
    <div className="event-card">
      <img
        src={event.eventDetails.images[0].url}
        alt={event.eventDetails.name}
        className="event-image"
      />
      <div className="event-details">
        <h2 className="event-name">{event.eventDetails.name}</h2>
        <p className="event-date">{event.eventDetails.dates.start.localDate}</p>
        <p className="event-time">{event.eventDetails.dates.start.localTime}</p>
        <p className="event-venue">{venue || 'Venue not available'}</p>
        {deleteFromFavourites && (
          <button
            className="remove-from-favourites"
            onClick={() => deleteFromFavourites(event.eventId)}
          >
            Remove from Favourites
          </button>
        )}
        <button
          className="more-info"
          onClick={() => handleMoreInfo(event.eventDetails)}
        >
          More Info
        </button>
      </div>
    </div>
  );
}

export default FavouritesCard;

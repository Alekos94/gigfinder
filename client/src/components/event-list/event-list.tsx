import React from 'react';
import EventCard from '../event-card/event-card';
import { IEvent } from '../../@types/event';
import './event-list.css';

export function EventList({ events }: { events: IEvent[] }) {
  return (
    <div className="events-list-container">
      {events.length > 0 ? (
        events.map(event => <EventCard key={event.id} event={event} />)
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

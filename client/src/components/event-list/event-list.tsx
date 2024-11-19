import React from "react";
import EventCard from "../event-card/event-card";
import './event-list.css';
import {IEvent} from "../../@types/event"



export function EventList ({events} : { events: IEvent[] }) {

  return (
    <div className="events-list-container">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} /> // Render EventCard for each event
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
  

  )
}
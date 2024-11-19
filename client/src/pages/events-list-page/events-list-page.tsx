// ? Seems to be some more redundant imports here?
import React, { useContext, useEffect, useState } from "react";
import './events-list-page.css';
import { LocationContext } from "../../context/location-context";
import ScaleLoader from "react-spinners/ScaleLoader";
import { EventList } from "../../components/event-list/event-list";
import EventMap from "../../components/event-map/event-map";
import Navbar from "../../components/navbar/navbar";
import {IEvent} from "../../@types/event"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#b800a6",
};

interface IFutureEvents {
  futureEvents: IEvent[]
}
function EventsListPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(LocationContext);
  // ? Would be nice to add a way to alter this search radius optionallly?
  const [searchRadius, setSearchRadius] = useState(20); // could use later to alter search radius
  const color = "#b800a6"

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/events?lat=${location?.latitude}&long=${location?.longitude}`);
        const data: IFutureEvents = await response.json();
        console.log(data); // ? Potentially another log to remove during refactor/cleanup?
        setEvents(data.futureEvents);

      } catch (error) {
        console.error('error fetching events:  ', error);
      } finally {
        setLoading(false);
      }
    }
    if (location?.latitude && location?.longitude) fetchEvents();
  }, [location]);



  return (
    <div className="events-list-page">
      <Navbar />
      {loading ? (
        <ScaleLoader
          color={color}
          loading={loading}
          cssOverride={override}
          // size={150}
          aria-label="Loading Spinner"
          data-testid="loader" />
      ) : (
        <div>
          <div className="upcoming-events">
            <h2>UPCOMING EVENTS NEAR YOU</h2>
            <EventList events={events}/>
          </div>
        <EventMap
          events={events}
          radius={searchRadius}
          location={location}
          />
        </div>
      )}
    </div>
  );
}

export default EventsListPage;
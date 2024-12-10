import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './event-map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { IEvent } from '../../@types/event';
import { ILocation } from '../../context/location-context';
mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_KEY as string;

interface EventMapProps {
  events: IEvent[];
  radius: number;
  location: ILocation | null;
}

function EventMap({ events, radius, location }: EventMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!location || !location.latitude || !location.longitude) {
      console.error('location data error');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(location.longitude), parseFloat(location.latitude)],
      zoom: 8,
      projection: { name: 'mercator' }
    });

    events.forEach(event => {
      const longitude = parseFloat(
        event._embedded.venues[0].location.longitude
      );
      const latitude = parseFloat(event._embedded.venues[0].location.latitude);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${event.name}</h3><p>${event._embedded.venues[0].name}</p><p>${event.dates.start.localDate}</p><p>${event.dates.start.localTime}</p>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [events, radius, location]);

  return <div ref={mapContainerRef} className="map-container"></div>;
}

export default EventMap;

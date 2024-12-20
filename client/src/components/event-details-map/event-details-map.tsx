import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './event-details-map.css';
import { ILocation } from '../../context/location-context';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2VvcmdlYnVydCIsImEiOiJjbTNoZ2N6ZDMwOWd5MmpzYWZmaTIycmxnIn0.ei_YZJP7OBCUfZb-n8NOyg';

function EventDetailsMap({ longitude, latitude }: ILocation) {
  //
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!longitude || !latitude) {
      console.error('map input error');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(longitude), parseFloat(latitude)],
      zoom: 12
    });

    new mapboxgl.Marker()
      .setLngLat([parseFloat(longitude), parseFloat(latitude)])
      .addTo(map);

    return () => map.remove();
  }, [longitude, latitude]);

  return <div ref={mapContainerRef} className="event-details-map"></div>;
}

export default EventDetailsMap;

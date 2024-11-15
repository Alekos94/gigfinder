import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './event-map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvcmdlYnVydCIsImEiOiJjbTNoZ2N6ZDMwOWd5MmpzYWZmaTIycmxnIn0.ei_YZJP7OBCUfZb-n8NOyg';

// ? Little bit confused with this component since I'm not familiar with MapBox, consult MapBox docs?
function EventMap ({events, radius, location}) {
  const mapContainerRef = useRef(null);

  useEffect(() => {

    // ? Another log that can be potentially removed?
    console.log(`location = ${location.longitude}, ${location.latitude}`);

    if (!location || !location.latitude || !location.longitude) {
      console.error("location data error");
      return;
    }

    //initialise map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(location.longitude), parseFloat(location.latitude)],
      zoom: 8,
      projection: { name: 'mercator' },
    });


   // add a marker for each event
    events.forEach((event) => {
      const longitude = parseFloat(event._embedded.venues[0].location.longitude);
      const latitude = parseFloat(event._embedded.venues[0].location.latitude);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h3>${event.name}</h3><p>${event._embedded.venues[0].name}</p><p>${event.dates.start.localDate}</p><p>${event.dates.start.localTime}</p>`)
        )
        .addTo(map);
    });

    //cleanup on unmount
    return () => map.remove();
  }, [events, radius, location]);

  return <div ref={mapContainerRef} className='map-container'></div>

}

export default EventMap;
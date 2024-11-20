import React, { createContext, useEffect, useState } from "react";

interface LocationContextProviderProps {
  children: React.ReactNode
}

export interface ILocation {
  longitude: string;
  latitude: string;
}

interface ILocationContext {
  location: ILocation | null;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
}

const iLocationContextState = {
  location : null,
  setLocation: () => {}
}

export const LocationContext = createContext <ILocationContext>(iLocationContextState);

export function LocationProvider({children}: LocationContextProviderProps) {
 
  //if there is a saved location use it else set to null 
  const [location, setLocation] = useState<ILocation>(() => {
    const savedLocation = localStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : {latitude: null, longitude: null};
  });

  //save location to local storage if it changes
  useEffect(() => {
    if (location.latitude && location.longitude) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  }, [location])

  return (
    <LocationContext.Provider value={({location, setLocation})}>
      {children}
    </LocationContext.Provider>
  );
}
interface EventImages {
  url: string;
}

interface EventDate {
  start: {
    localDate: string;
    localTime: string;
  }
}

interface EvenetVenue {
  name: string;
  address: {
    line1: string;
  };
  city: {
    name:string;
  };
  country: {
    name: string;
  };
  location: {
    longitude: string;
    latitude: string;
  }
}

export interface IEvent {
  id: string;
  name : string;
  dates: EventDate;
  images: EventImages[];
  _embedded: {
    venues: EvenetVenue[];
  }
  url: string;
}

export interface IEventList {
  _embedded: {
    events: IEvent[]
  }
}

export interface IFavourite {
  eventId: string;
  eventDetails: IEvent
}


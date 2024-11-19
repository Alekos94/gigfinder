interface EventImages {
  url: string;
}

interface EventDate {
  start: {
    localDate: string;
    localTime: string;
  }
}

interface EventVenue {
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
}

export interface IEvent {
  name : string;
  id: string;
  dates: EventDate;
  images: EventImages[];
  _embedded: EventVenue[];
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


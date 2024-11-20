import ical from 'ical-generator';
import { IEvent } from '../@types/event';

export function generateICSFile(event : IEvent) {
  const calendar = ical({ name: 'GigFinder Events' });
  calendar.createEvent({
    start: new Date(event.dates.start.dateTime),
    // duration: { hours: 2 }, 
    summary: event.name,
    description: 'Event at GigFinder', // event.description
    location: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}`,
    url: event.url,
  });

  //create a download link for the .ics file
  const blob = new Blob([calendar.toString()], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.name}.ics`;
  link.click();
}
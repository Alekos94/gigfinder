import {Favourite, IFavourite} from '../models/favourite'
import dotenv from 'dotenv'
import { Request, Response } from 'express';
import {event as IEvent} from '../@types/event';
dotenv.config()
// ? Can we modularize these controllers into their own respective files? For example, eventsControllers and favouriteControllers etc?
// ? Seems to be a few redundant logs in this file?

const controllers = {

  // event controller
  // handle ticketmaster api and format event data
  getEvents: async function(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>{

    try {
      const { lat, long }  = req.query; //impovement as this filter is deprecated and maybe removed in a future release - use geoPoint instead
      const apiKey  = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${long}&radius=20&unit=miles&sort=date,asc&classificationName=Music`;

      const response = await fetch(url);
      if(!response.ok) res.status(400).send('Failed to fetch events')

      const data = await response.json();

      // if no events, set to empty array
      const events = data._embedded ? data._embedded.events : [];

      // for some reason the API returned some past events so these are filtred out here
      const today = new Date();
      const futureEvents = events.filter((event: IEvent & {dates: any[]}) => {
        const eventDate = new Date(event.dates.start.dateTime);
        return eventDate >= today;
      }) //possibly making

      res.status(200).json({ futureEvents });
    } catch (error) {
      console.error('error fetching events:  ', error);
      res.status(500)
    }
  },

  // favourite controller
  getFavourites: async function(req: Request, res: Response): Promise<void> {
    try {
      const favourites: IFavourite[] = await Favourite.find();
      res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourites from database:  ', error);
      res.status(500).json({message: 'Error getting favourites:  ', error})
    }
  },

  addToFavourites: async function(req: Request, res: Response): Promise<void>  {
    try {
      const {eventId, eventDetails} : IFavourite = req.body; // need the eventDetails interface
      const favourite= new Favourite({ eventId, eventDetails });
      await favourite.save();
      res.status(201).json(favourite);
      console.log('message added')
    } catch (error) {
      console.error('Error adding favourite:  ', error);
      res.status(400).json({message: 'Error adding favourite:  ', error})
    }
  },

  deleteFromFavourites: async function(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Favourite.deleteOne({ eventId: id});
      res.status(200).json({message: 'Successfully removed from Favourites'})
    } catch (error) {
      console.error('Error deleting from database:  ', error);
      res.status(500).json({message: 'Error removing Favourite:  ', error})
    }
  }

  // review controller
  // handle add/remove reviews
}

export default controllers;
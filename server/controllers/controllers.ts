import { Favourite } from '../models/favourite';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { IEvent, IEventList, IFavourite } from '../@types/event';

dotenv.config();

const controllers = {
  getEvents: async function (req: Request, res: Response): Promise<void> {
    try {
      const { lat, long } = req.query;
      const apiKey = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latlong=${lat},${long}&radius=20&unit=miles&sort=date,asc&classificationName=Music`;

      const response = await fetch(url);
      if (!response.ok) res.status(400).send('Failed to fetch events');

      const data: IEventList = await response.json();

      const events = data._embedded ? data._embedded.events : [];

      const today = new Date();
      const futureEvents = events.filter((event: any) => {
        const eventDate = new Date(event.dates.start.dateTime);
        return eventDate >= today;
      });

      res.status(200).json({ futureEvents });
    } catch (error) {
      console.error('error fetching events:  ', error);
      res.status(500);
    }
  },

  getFavourites: async function (req: Request, res: Response): Promise<void> {
    try {
      const favourites: IFavourite[] = await Favourite.find();
      res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourites from database:  ', error);
      res.status(500).json({ message: 'Error getting favourites:  ', error });
    }
  },

  addToFavourites: async function (req: Request, res: Response): Promise<void> {
    try {
      const { eventId, eventDetails }: IFavourite = req.body;
      const favourite = new Favourite({ eventId, eventDetails });
      await favourite.save();
      res.status(201).json(favourite);
    } catch (error) {
      console.error('Error adding favourite:  ', error);
      res.status(400).json({ message: 'Error adding favourite:  ', error });
    }
  },

  deleteFromFavourites: async function (req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Favourite.deleteOne({ eventId: id });
      res.status(200).json({ message: 'Successfully removed from Favourites' });
    } catch (error) {
      console.error('Error deleting from database:  ', error);
      res.status(500).json({ message: 'Error removing Favourite:  ', error });
    }
  }

  // review controller
  // handle add/remove reviews
};

export default controllers;

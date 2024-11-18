import {Schema, model} from 'mongoose'
import {IFavourite} from '../@types/event';

const favouriteSchema = new Schema<IFavourite> ({
  eventId: { type: String, required: true },
  eventDetails: { type: Object, required: true} 
})

const Favourite = model <IFavourite> ('Favourite', favouriteSchema)

export {Favourite, IFavourite}
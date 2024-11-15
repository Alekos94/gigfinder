import {Schema, model} from 'mongoose'

interface IFavourite {
  eventId: string,
  eventDetails: Object
}

const favouriteSchema = new Schema <IFavourite> ({
  eventId: { type: String, required: true },
  eventDetails: { type: Object, required: true} //needs to update it with the interface of event
})

const Favourite = model <IFavourite> ('Favourite', favouriteSchema)

export {Favourite, IFavourite}
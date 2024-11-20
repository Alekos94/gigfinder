import {Schema, model} from 'mongoose'

// should we delete this file as it is not used anywhere?

interface IEvent {
  name: string,
  date: Date,
  venue: string,
  longitude: string,
  latitude: string,
  image: string
}

const eventSchema = new Schema<IEvent> ({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  image: { type: String },
});

const Event = model <IEvent> ('Event', eventSchema)

export {Event, IEvent}
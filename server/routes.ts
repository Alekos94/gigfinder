import express from 'express';
import controller from './controllers/controllers';
const router = express.Router()

// /events
router.get('/events', controller.getEvents)


// /favourites
router.get('/favourites', controller.getFavourites)
router.post('/favourites', controller.addToFavourites)
router.delete('/favourites/:id', controller.deleteFromFavourites)

// /reviews

export default router;
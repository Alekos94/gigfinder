import express from 'express';
import controller from './controllers/controllers';
const router = express.Router();

router.get('/events', controller.getEvents);

router.get('/favourites', controller.getFavourites);
router.post('/favourites', controller.addToFavourites);
router.delete('/favourites/:id', controller.deleteFromFavourites);

export default router;

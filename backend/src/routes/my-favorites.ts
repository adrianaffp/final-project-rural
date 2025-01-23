import express from 'express';

import verifyToken from '../middleware/auth';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/my-favorites-controller';

const router = express.Router();

// /api/my-favorites

router.get('/', verifyToken, getFavorites);

router.post('/:propertyId', verifyToken, addFavorite);

router.delete('/:propertyId', verifyToken, removeFavorite);

export default router;

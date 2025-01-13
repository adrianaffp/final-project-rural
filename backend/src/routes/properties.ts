import express from 'express';
import { getPropertyById, getSearchProperties } from '../controllers/properties-controller';
import { param } from 'express-validator';

const router = express.Router();

//* api/properties/search?
router.get('/search', getSearchProperties);

//* api/properties/:id
router.get('/:id', [param('id').notEmpty().withMessage('Property id is required')], getPropertyById);

export default router;

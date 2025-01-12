import express from 'express';
import { getSearchProperties } from '../controllers/properties-controller';

const router = express.Router();

//* api/properties/search?
router.get("/search", getSearchProperties);

export default router;
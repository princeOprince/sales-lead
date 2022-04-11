import express from 'express';
import { index, submitLead } from '../controllers/index.mjs';
export const router = express.Router();

/* GET home page. */
router.get('/', index);
router.post('/', submitLead);

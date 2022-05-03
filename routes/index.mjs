import express from 'express';
import { index, submitLead, showLeads } from '../controllers/index.mjs';
export const router = express.Router();

/* GET home page. */
router.get('/', index);
router.post('/', submitLead);
router.get('/leads', showLeads);

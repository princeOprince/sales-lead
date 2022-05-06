import express from 'express';
import { 
  index, submitLead, showLeads, showLead 
} from '../controllers/index.mjs';
export const router = express.Router();

/* GET home page. */
router.get('/', index);
router.post('/', submitLead);
router.get('/leads', showLeads);
router.get('/lead/:lead_id', showLead);

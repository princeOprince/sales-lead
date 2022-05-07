import express from 'express';
import { 
  index, submitLead, showLeads, showLead, showEditLead, editLead 
} from '../controllers/index.mjs';
export const router = express.Router();

router.get('/', index);
router.post('/', submitLead);
router.get('/leads', showLeads);
router.get('/lead/:lead_id', showLead);
router.get('/lead/:lead_id/edit', showEditLead);
router.post('/lead/:lead_id/edit', editLead);
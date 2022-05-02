import { connectDB, Lead } from '../models/lead.mjs';
import debug from "debug";
const log = debug('sales-lead:controllers-index');
const error = debug('sales-lead:controllers-index-error');

export const index = (req, res, next) => {
    res.render('index', { title: 'Express' });
  }

export const submitLead = async (req, res, next) => {
  try {
    await connectDB();
    await Lead.create({
      email: req.body.lead_email
    });
    log('Lead Email:', req.body.lead_email);
    res.redirect('/');
  } catch (err) {
    error(err);
    next(err);
  }
}
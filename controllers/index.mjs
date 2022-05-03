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
    res.redirect('/leads');
  } catch (err) {
    error(err);
    next(err);
  }
}

export const showLeads = async (req, res, next) => {
  try {
    await connectDB();
    const leads = await Lead.findAll();
    res.render('index', { title: 'Express', leads});
  } catch (err) {
    error(err);
    next(err);
  }
}
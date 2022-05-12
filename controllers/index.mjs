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

export const showLead = async (req, res, next) => {
  try {
    await connectDB();
    const lead = await Lead.findOne(
      { where: { id: req.params.lead_id } } );
    res.render('lead', { lead } );
  } catch (err) {
    error(err);
    next(err);
  }
}

export const showEditLead = async (req, res, next) => {
  try {
    await connectDB();
    const lead = await Lead.findOne(
      { where: { id: req.params.lead_id } } );
    res.render('lead/edit_lead', { lead } );
  } catch (err) {
    error(err);
    next(err);
  }
}

export const editLead = async (req, res, next) => {
  try {
    await connectDB();
    await Lead.update(
      { email: req.body.lead_email },
      { where: { id: req.params.lead_id } } );
    res.redirect(`/lead/${req.params.lead_id}`);
  } catch (err) {
    error(err);
    next(err);
  }
}

export const deleteLead = async (req, res, next) => {
  try {
    await connectDB();
    await Lead.destroy(
      { where: { id: req.params.lead_id } } );
    res.redirect(`/leads`);
  } catch (err) {
    error(err);
    next(err);
  }
}

export const deleteLeadJson = async (req, res, next) => {
  try {
    await connectDB();
    await Lead.destroy(
      { where: { id: req.params.lead_id } } );
    res.status(200).json({ msg: "Success"});
  } catch (err) {
    error(err);
    res.status(500).json({ err: err.message });
  }
}
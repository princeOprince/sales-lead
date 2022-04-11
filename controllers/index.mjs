import chalk from 'chalk';

export const index = (req, res, next) => {
    res.render('index', { title: 'Express' });
  }

export const submitLead = (req, res, next) => {
    console.log(chalk.bgRed('Lead Email:', req.body.lead_email));
    res.redirect('/');
  }
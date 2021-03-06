const express  = require('express');
const _        = require('lodash');
const router   = express.Router();

const API = require('../models/API');
const List = require('../models/List');
const Snippet = require('../models/Snippet');
const Generator = require('../models/Generator');

// Setup defaultVars and baseURL for all routes
let defaultVars, baseURL;
router.all('*', (req, res, next) => {
  defaultVars = req.app.get('defaultVars');
  baseURL     = req.app.get('baseURL');
  if (!req.session.loggedin) {
    res.redirect(baseURL + '/');
  } else {
    next();
  }
});

router.get('/api', (req, res, next) => {
  if (req.session.subscription.status !== 3) {
    let obs = [];
    API.getAPIs(req.session.user.id).then(apis => {
      res.render('view/api', _.merge(defaultVars, {apis, title: 'View APIs'}));
    });
  } else {
    if (req.session.subscription.status === 3) {
      res.redirect(baseURL + '/settings/subscription/paymentOverdue');
    } else {
      res.redirect(baseURL + '/');
    }
  }
});


// list //
router.get('/list', (req, res, next) => {
  if (req.session.subscription.status !== 3) {
    List.getLists(req.session.user.id).then(lists => {
      res.render('view/list', _.merge(defaultVars, {lists, title: 'View APIs'}));
    });
  } else {
    if (req.session.subscription.status === 3) {
      res.redirect(baseURL + '/settings/subscription/paymentOverdue');
    } else {
      res.redirect(baseURL + '/');
    }
  }
});

// snippet //
router.get('/snippet', (req, res, next) => {
  if (req.session.subscription.status !== 3) {
    Snippet.getSnippets(req.session.user.id).then(snippets => {
      res.render('view/snippet', _.merge(defaultVars, {snippets, title: 'View Snippets'}));
    });
  } else {
    if (req.session.subscription.status === 3) {
      res.redirect(baseURL + '/settings/subscription/paymentOverdue');
    } else {
      res.redirect(baseURL + '/');
    }
  }
});

module.exports = router;

const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const routes = require('./routes/index.route');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

app.use((req, res) => {
  if (req.path.startsWith('/api') || req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(404).json({ code: 'error', message: 'Not found!' });
  }
  res.status(404).render('404', { title: '404 Not Found' });
});

app.use((err, req, res, _next) => {
  console.error('[Error]', err.stack || err.message || err);
  if (req.path.startsWith('/api') || req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(500).json({ code: 'error', message: 'An error occurred, please try again!' });
  }
  res.status(500).send('Something went wrong!');
});

module.exports = app;

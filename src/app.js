const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api/routes');
const {
  notFoundHandler,
  errorHandler,
} = require('./api/controllers/errorController');

const app = express();

// middleware
app.use(helmet()); // security middleware
app.use(cors()); // allow cors
app.use(express.json());

// routes
app.use('/api', routes);
app.use(notFoundHandler); 
app.use(errorHandler);

module.exports = app;

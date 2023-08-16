const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const knex = require('./knex');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(knex);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

/*
const createAdmin = async () => {
  const userUsername = process.env.ADMIN_USERNAME
  const userPassword = process.env.ADMIN_PASSWORD
  const userEmail = process.env.ADMIN_EMAIL
  const userRole = process.env.ADMIN_ROLE

  // Create the admin user if it doesn't exist
  const usersService = app.service("users");
  const existingAdmin = await usersService.find({
    query: { username: userUsername },
  });
  if (existingAdmin.total === 0) {
    const adminUser = {
      username: userUsername,
      email: userEmail,
      password: userPassword,
      role: userRole,
      dateCreated: new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    await usersService.create(adminUser);
    console.log(`Admin user has been created.`);
  } else {
    console.log(`Admin user already exists.`);
  }
};

createAdmin();
*/
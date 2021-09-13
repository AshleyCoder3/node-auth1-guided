const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const store = require('connect-session-knex')(session);

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
// server.use(helmet()); // fewer headers
server.use(express.json());
server.use(session({
  name: 'monkey', // the name of the cookie the server will place on client (session id)
  secret: 'nobody tosses a dwarf!', // put this in the environment, not the code!!!!
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, // in prod, it should be true: ONLY HTTPS!!!!!!!!
  },
  httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  resave: false, // IGNORE, some libs need this
  saveUninitialized: false, // only save a session if user approves
  // PERSISTING SESSIONS TO THE DATABASE!!!
  store: new store({
    knex: require('../database/db-config.js'), // configured instance of knex
    tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
    sidfieldname: 'sid', // column that will hold the session id, name it anything you want
    createtable: true, // if the table does not exist, it will create it automatically
    clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
  }),
}));

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

let counter = 0;

server.get('/gimme-cookie', (req, res) => {
  res.cookie('the-truth', `lady-gaga-rocks-${counter++}-times`)
  res.send(req.headers.cookie ? 'I KNOW YOU! I HAVE SEEN YOU BEFORE!' : 'nice to meet you!')
})

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

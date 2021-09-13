const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
// server.use(helmet()); // fewer headers
server.use(express.json());
server.use(session({
  name: 'monkey', // default is connect.sid
  secret: 'nobody tosses a dwarf!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true, // only set cookies over https. Server will not send back a cookie over http.
  }, // 1 day in milliseconds
  httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  resave: false,
  saveUninitialized: false,
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

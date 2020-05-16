const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session= require('express-session');
const knexSessionStore= require('connect-session-knex')(session)
const db_config= require('../database/dbConfig.js');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
// creating session object
server.use(session({
    name: 'token', // overwrites the default cookie name, keeps our stack safe
    resave: false, // avoids recreating sessions that have not changed
    saveUninitialized: false, // GDPR laws, against setting cookies automatically
    secret: process.env.COOKIE_SECRET || 'secret', // cryptographically sign the cookie
    cookie: {
        http: true, // disallows js from reading our cookie contents
    },
    store: new knexSessionStore({
        knex: db_config, // grabs configured instance of knex
        createtable: true, // if a sessions table doesn't exist, create one automatically
    }),
}));

// route
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate(), jokesRouter);

// handles no supporting route
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// handles errors
server.use((err, req, res, next) => {
    console.log('Server error:', err);
	res.status(500).json({
		message: "Oops, something went wrong. Please try again later.",
	});
});

module.exports = server;

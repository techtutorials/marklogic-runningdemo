const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const searchRouter = require('./routes/search');
const searchAPIRouter = require('./routes/searchapi');
const errorRouter = require('./routes/error');
const cors = require('cors');
const morgan = require('morgan');
require('./helper/passport');
const app = express();
//app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'));
//app.use(bodyParser.json({type: '*/*'}));
bodyParser.urlencoded({ extended: false })
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//following three lines should be in sequence
app.use(session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/app/users', usersRouter);
app.use('/app/login', loginRouter);
app.use('/app/logout', logoutRouter);
app.use('/app/search', searchRouter);
app.use('/app/searchapi', searchAPIRouter);
app.use('/app/error', errorRouter);

module.exports = app;

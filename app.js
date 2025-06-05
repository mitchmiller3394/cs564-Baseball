require('dotenv').config();

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverrid = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const studentRoutes = require('./routes/studentRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);

// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

// Express starting and views with ejs
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log(app.get('env'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverrid('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session and Flash
const store = new MySQLStore({
    host: 'localhost',
    user:  'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cookie_session_db',
});

const sessionConfig = {
    store,
    name: '_bdbSess',
    secret: process.env.COOKIES_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}

app.use(session(sessionConfig));
app.use(flash());

// Passport


// Locals
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', homeRoutes);

app.use('/', studentRoutes);

app.use('/', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})
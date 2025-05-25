const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverrid = require('method-override');
//const session = require('express-session');
//const flash = require('connect-flash');
const studentRoutes = require('./routes/studentRoutes');
const homeRoutes = require('./routes/homeRoutes');
//const passport = require('passport');
//const LocalStrategy = require('passport-local');
const mysql = require('mysql2');

// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mmeyes3394!',
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

// Routes
app.use('/', homeRoutes);

app.use('/', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverrid = require('method-override');
//const session = require('express-session');
//const flash = require('connect-flash');
//const userRoutes = require('./routes/userRoutes');
//const meRoutes = require('./routes/meRoutes');
//const passport = require('passport');
//const LocalStrategy = require('passport-local');

// MySQL connection and Pool creation
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mmeyes3394!',
    database: 'cs564',
});

// Connection and query example
let queryData = []
const sql = "SELECT name FROM students WHERE idstudents = 1";
pool.getConnection((err, conn) => {
    if (err) {
        console.error('Error getting connection:', err.stack);
        return;
    }
    conn.query(sql, (err, result) => {
        conn.release(); // Always release the connection back to the pool
        if (err) {
            console.error('Error executing query:', err.stack);
            return;
        }
        if (result.length > 0) {
            console.log('ID 1 is:', result[0].name);
            queryData.push(result[0].name);
        } else {
            console.log('No student found with id 1');
        }
    });
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
app.get('/', (req, res) => {
    res.render('home', { queryData });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})
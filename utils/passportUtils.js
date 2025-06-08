const argon2 = require('argon2');
const mysql = require('mysql2');

// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

async function generatePasswordHash(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        throw new Error('Error generating password hash');
    }
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in to do that!');
    res.redirect('/login');
}
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash('error', 'You do not have permission to do that!');
    res.redirect('/');
}

function credsExists(req, res, next) {
    pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [req.body.username, req.body.email], (error, results) => {
        if (error) {
            req.flash('error', 'Database error occurred!');
            return res.redirect('/register');
        }
        if (results.length > 0) {
            const errorMessage = results[0].username === req.body.username ? 'Username already exists!' : 'Email already exists!';
            req.flash('error', errorMessage);
            return res.redirect('/register');
        }
        next();
    });
}

module.exports = {
    generatePasswordHash,
    isAuth,
    isAdmin,
    credsExists
};
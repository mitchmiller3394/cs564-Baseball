const mysql = require('mysql2');
const generatePasswordHash = require('../utils/passportUtils').generatePasswordHash;

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hash = await generatePasswordHash(password);
        const pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: process.env.MYSQL_PASSWORD,
                database: 'cs564',
            }).promise();
        
        const sql = "CALL insertNewUser(?, ?, ?)";
        try {
            const [rows] = await pool.execute(sql, [username, email, hash]);
            if (rows.affectedRows > 0) {
                req.flash('success', 'Registration successful!');
                res.redirect('/login');
            } else {
                req.flash('error', 'Registration failed!');
                res.redirect('/register');
            }
        } catch (err) {
            console.error('Database error:', err.stack);
            res.status(500).send('Database error');
        }
    } catch (e) {
            req.flash('error', e.message);
            res.redirect('/register');
    }
}

module.exports.loginUser = (req, res) => {
    const redirectURL = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectURL);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Logout Succesful');
        res.redirect('/');
    })
}
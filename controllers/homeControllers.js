const mysql = require('mysql2');

module.exports.renderHome = async (req, res) => {
    // MySQL connection and Pool creation
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'cs564',
    }).promise();

    const sql = "SELECT park_name FROM park";
    try {
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
            console.log('First student is:', rows[0].park_name);
            pool.end(); // Close the pool after use
        } else {
            console.log('No parks found');
        }
        res.render('home', { rows });
    } catch (err) {
        console.error('Database error:', err.stack);
        res.status(500).send('Database error');
    }
}
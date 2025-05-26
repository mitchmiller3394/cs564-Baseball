const mysql = require('mysql2');

module.exports.renderHome = async (req, res) => {
    // MySQL connection and Pool creation
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Mmeyes3394!',
        database: 'cs564',
    }).promise();

    const sql = "SELECT namestudents FROM students";
    try {
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
            console.log('First student is:', rows[0].namestudents);
            pool.end(); // Close the pool after use
        } else {
            console.log('No students found');
        }
        res.render('home', { rows });
    } catch (err) {
        console.error('Database error:', err.stack);
        res.status(500).send('Database error');
    }
}
const mysql = require('mysql2');
// MySQL connection and Pool creation
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: process.env.MYSQL_PASSWORD,
            database: 'cs564',
        });


module.exports.renderEntry = (req, res) => {
    res.render('playerWithMyName/entry');
}

module.exports.searchStatsForName = async (name) => {
        const sql = "CALL getStatsForFirstName(?)";
        const [rows] = await pool.promise().execute(sql, [name]);
        return rows[0] && rows[0][0] ? rows[0][0] : null;
};
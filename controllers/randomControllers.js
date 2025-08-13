const mysql = require('mysql2');
// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

module.exports.renderEntry = (req, res) => {
    res.render('randoms/entry');
}

module.exports.getRandomStat = async (req, res) => {
    const { randomStat, player1_first, player1_last, player2_first, player2_last } = req.body;
    if (randomStat === 'compareTwoPlayerDropoff') {
        const [results] = await pool.promise().query(
            'CALL compareTwoPlayerDropoff(?, ?, ?, ?)',
            [player1_first, player1_last, player2_first, player2_last]);
        return res.render('randoms/result', { results });
    }
};
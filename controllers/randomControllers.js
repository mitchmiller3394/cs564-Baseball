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
    try {
        console.log('Received POST:', req.body);
        if (randomStat === 'compareTwoPlayerDropoff') {
            console.log('Calling stored procedure...');
            const [results] = await pool.promise().query(
                'CALL CompareTwoPlayersDropoff(?, ?, ?, ?)',
                [player1_first, player1_last, player2_first, player2_last]
            );
            console.log('Stored procedure results:', results);
            return res.render('randoms/result', { results: results[0] || results });
        }
        res.send('No matching stat type.');
    } catch (err) {
        console.error('Error in getRandomStat:', err);
        res.status(500).send('Error: ' + err.message);
    }
};
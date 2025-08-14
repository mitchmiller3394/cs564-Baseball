module.exports.insertTeamWins = async (req, res) => {
    const { p_team_id, p_year, p_g, p_wins, p_losses, p_div_win, p_wc_win, p_lg_win, p_ws_win, p_name, p_attendance } = req.body;
    try {
        console.log('Calling insertTeamWins with:', req.body);
        await pool.promise().query(
            'CALL insertTeamWins(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [p_team_id, p_year, p_g, p_wins, p_losses, p_div_win, p_wc_win, p_lg_win, p_ws_win, p_name, p_attendance]
        );
        res.render('teams/result', { results: [], message: 'Team wins inserted successfully!', viewType: 'insertTeamWins' });
    } catch (err) {
        console.error('Error in insertTeamWins:', err);
        res.status(500).send('Error: ' + err.message);
    }
};
module.exports.getTopStadiumsWithTeams = async (req, res) => {
    const { numStadiums } = req.body;
    try {
        console.log('Calling GetTopStadiumsWithTeams with n =', numStadiums);
        const [results] = await pool.promise().query(
            'CALL GetTopStadiumsWithTeams(?)',
            [numStadiums]
        );
        console.log('Stored procedure results:', results);
        return res.render('teams/result', { results: results[0] || results });
    } catch (err) {
        console.error('Error in getTopStadiumsWithTeams:', err);
        res.status(500).send('Error: ' + err.message);
    }
};
const mysql = require('mysql2');
// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

module.exports.renderEntry = (req, res) => {
    res.render('teams/entry');
}

module.exports.getTotalTeamSalary = async (team_id) => {
    const sql = 'CALL searchTeamTotalSalary(?)';
    const [rows] = await pool.promise().execute(sql, [team_id]);
    return [rows];
}

module.exports.getDollarsPerWin = async (team_id) => {
    const sql = 'CALL searchTeamDollarsPerWin(?)';
    const [rows] = await pool.promise().execute(sql, [team_id]);
    return [rows];
}
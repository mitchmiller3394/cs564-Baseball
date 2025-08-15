const mysql = require('mysql2');

// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

module.exports.renderEntry = (req, res) => {
    res.render('addPlayer/entry');
}

module.exports.searchPlayers = async (q) => {
    let sql, values;
    if (q.includes(' ')) {
        // Split into first and last name
        const [first, last] = q.split(' ');
        sql = "SELECT name_first, name_last, player_id FROM player WHERE name_first LIKE ? AND name_last LIKE ?";
        values = [`%${first}%`, `%${last}%`];
    } else {
        // Search either field
        sql = "SELECT name_first, name_last, player_id FROM player WHERE name_first LIKE ? OR name_last LIKE ?";
        values = [`%${q}%`, `%${q}%`];
    }
    const [rows] = await pool.promise().query(sql, values);
    return [rows];
};

module.exports.searchTeams = async (q) => {
    const sql = `SELECT name, MIN(team_id) as team_id 
                 FROM team 
                 WHERE name LIKE ? 
                 GROUP BY name 
                 ORDER BY name`;
    const values = [`%${q}%`];
    const [rows] = await pool.promise().query(sql, values);
    return [rows];
};

module.exports.addPlayerToTeam = async (req, res) => {
    const { playerId, teamId, year } = req.body;
    
    try {
        // First check if the player is already on the team for that year
        const checkSql = "SELECT * FROM playedfor WHERE player_id = ? AND team_id = ? AND year = ?";
        const [existing] = await pool.promise().query(checkSql, [playerId, teamId, year]);
        
        if (existing.length > 0) {
            req.flash('error', 'Player is already on this team for that year');
            return res.redirect('/addPlayer');
        }
        
        // Call the stored procedure (note: I fixed the syntax error in your SP)
        const sql = "INSERT INTO playedfor (player_id, team_id, year) VALUES (?, ?, ?)";
        await pool.promise().query(sql, [playerId, teamId, year]);
        
        req.flash('success', 'Player successfully added to team!');
        res.redirect('/addPlayer');
        
    } catch (error) {
        console.error('Error adding player to team:', error);
        req.flash('error', 'Error adding player to team. Please try again.');
        res.redirect('/addPlayer');
    }
};

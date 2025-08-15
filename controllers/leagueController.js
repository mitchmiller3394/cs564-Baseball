const mysql = require('mysql2');

// MySQL connection and Pool creation
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cs564',
});

module.exports.renderEntry = (req, res) => {
    res.render('league/entry');
}

module.exports.searchLeagues = async (q) => {
    // Search for leagues by name, return league_id and name
    const sql = "SELECT DISTINCT league_id, name FROM league WHERE name LIKE ? ORDER BY name";
    const values = [`%${q}%`];
    const [rows] = await pool.promise().query(sql, values);
    return [rows];
};

module.exports.getLeagueStats = async (req, res) => {
    const { leagueId } = req.body;
    
    try {
        console.log('=== getLeagueStats Debug ===');
        console.log('Input leagueId:', leagueId);
        
        const [rows] = await pool.promise().execute('CALL getleagueStats(?)', [leagueId]);
        console.log('Raw database response:', JSON.stringify(rows, null, 2));
        console.log('rows[0]:', rows[0]);
        console.log('============================');
        
        const stats = rows[0] && rows[0][0] ? rows[0][0] : null;
        
        if (!stats) {
            req.flash('error', 'No stats found for this league');
            return res.redirect('/league');
        }
        
        res.render('league/stats', { 
            stats: stats,
            leagueId: leagueId
        });
        
    } catch (error) {
        console.error('Error getting league stats:', error);
        req.flash('error', 'Error retrieving league stats. Please try again.');
        res.redirect('/league');
    }
};

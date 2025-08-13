const mysql = require('mysql2');
// MySQL connection and Pool creation
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: process.env.MYSQL_PASSWORD,
            database: 'cs564',
        });

module.exports.renderEntry = (req, res) => {
    res.render('players/entry');
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

module.exports.getPlayerDetails = async (id) => {
    const sql = "SELECT * FROM player WHERE player_id = ?";
    const [rows] = await pool.promise().query(sql, [id]);
    return rows[0];
}

module.exports.getPlayerBatting = async (id) => {
    const sql = "CALL searchPlayerBatting(?)";
    const [rows] = await pool.promise().execute(sql, [id]);
    return [rows];
}

module.exports.getPlayerFielding = async (id) => {
    const sql = "CALL searchPlayerFielding(?)";
    const [rows] = await pool.promise().execute(sql, [id]);
    return [rows];
}

module.exports.getPlayerPitching = async (id) => {
    const sql = "CALL searchPlayerPitching(?)";
    const [rows] = await pool.promise().execute(sql, [id]);
    return [rows];
}

module.exports.getPlayerSalary = async (id) => {
    const sql = "SELECT * FROM salary s, cost c WHERE c.player_id = ? AND s.salary_id = c.salary_id ORDER BY year";
    const [rows] = await pool.promise().query(sql, [id]);
    return [rows];
}

module.exports.deletePlayerSalary = async (player_id, team_id, year) => {
    const sql = "CALL deletePlayerSalary(?, ?, ?)";
    await pool.promise().execute(sql, [player_id, team_id, year]);
}

module.exports.insertPlayerSalary = async (player_id, year, team_id, salary) => {
    const sql = "CALL insertPlayerSalary(?, ?, ?, ?)";
    await pool.promise().execute(sql, [player_id, team_id, year, salary]);
}

module.exports.updatePlayerSalary = async (player_id, year, team_id, salary) => {
    const sql = "CALL updatePlayerSalary(?, ?, ?, ?)";
    await pool.promise().execute(sql, [player_id, team_id, year, salary]);
}

module.exports.createPlayer = async (req, res, next) => {
    try {
        //TODO: update this to use the player model if we want to create a player
        const { namestudents } = req.body;

        if (!namestudents || typeof namestudents !== 'string' || namestudents.trim() === '') {
            console.error('Invalid or missing name in request body');
            return res.status(400).send('Name is required');
        }

        const sql = "INSERT INTO students (namestudents) VALUES (?)";
        const values = [namestudents];
        const [result] = await pool.promise().query(sql, values);
        console.log('Student added with ID:', result.insertId);

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/student');
    }
}
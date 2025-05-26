const mysql = require('mysql2');
// MySQL connection and Pool creation
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Mmeyes3394!',
            database: 'cs564',
        });

module.exports.renderEntry = (req, res) => {
    res.render('students/entry');
}

module.exports.createStudent = async (req, res, next) => {
    try {
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
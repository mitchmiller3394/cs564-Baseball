const mysql = require('mysql2');

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

        // MySQL connection and Pool creation
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Mmeyes3394!',
            database: 'cs564',
        });
        const sql = "INSERT INTO students (namestudents) VALUES (?)";
        const values = [namestudents];
        pool.getConnection((err, conn) => {
            if (err) {
                console.error('Error getting connection:', err.stack);
                return;
            }
            conn.query(sql, values, (err, result) => {
                conn.release(); // Always release the connection back to the pool
                if (err) {
                    console.error('Error executing query:', err.stack);
                    return;
                }
                else {
                    console.log('Student added with ID:', result.insertId);
                }
            });
        });
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/student');
    }
}
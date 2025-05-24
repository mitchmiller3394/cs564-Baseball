const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mmeyes3394!',
    database: 'cs564',
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting:', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);
});

const sql = "INSERT INTO students (name) VALUES ('Mitch Miller')";
connection.query(sql, (err, result) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        return;
    }
    console.log('Inserted row with ID:', result.insertId);
});

setTimeout(() => {
    console.log('Waited 5 seconds');
    connection.end();
}, 5000);
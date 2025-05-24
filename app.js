const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mmeyes3394!'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting:', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);
});

setTimeout(() => {
    console.log('Waited 10 seconds');
    connection.end();
}, 10000);
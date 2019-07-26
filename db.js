const mysql = require('mysql');
const auth = require('./auth');

const connection = mysql.createConnection(auth);
connection.connect();

setInterval(() => {
	connection.query('SELECT 1', (err, result) => {
		if(err) console.log(err);
	});
}, 9000);

connection.query(`CREATE TABLE IF NOT EXISTS Links (
	id VARCHAR(10) PRIMARY KEY NOT NULL,
	url VARCHAR(2048) NOT NULL,
	current INT(10) DEFAULT 0,
	max INT(10) DEFAULT 1
)`, (err) => {
	if(err) throw err;
});

module.exports = connection;
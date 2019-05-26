//mysql test

const mysql = require('mysql');

const mysqltest = callback => {
  const connection = mysql.createConnection({
    host: 'host',
    user: 'user',
    password: 'pass',
    database: 'db'
  });

  connection.connect();
  console.log('mysql connected');

  connection.query('SELECT * FROM test', function(error, results, fields) {
    if (error) throw error;
    callback(results);
  });

  connection.end();
  console.log('mysql connection ended');
};

export default mysqltest;

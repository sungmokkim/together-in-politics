const mysql = require('mysql');
let dateAndTime = require('date-and-time');
import env from '../../helpers/serverEnv';

const fetchPeriodData = ({ community }, callback) => {
  const { host, user, password, database, monthlyDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  const dateFieldName = `date`;
  const rankFieldName = `rank`;
  const tableName = monthlyDataTable;

  const query = `select * from newinfo where name like ? order by period asc `;
  const queryVariables = [community];
  connection.query(query, queryVariables, function(error, results, fields) {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  });

  connection.end();
};

export default fetchPeriodData;

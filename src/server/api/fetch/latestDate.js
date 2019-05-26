const mysql = require('mysql');
import env from '../../helpers/serverEnv';

const fetchLatestDate = callback => {
  const { host, user, password, database, todayDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  const dateFieldName = `date`;
  const tableName = todayDataTable;

  const query = `select ${dateFieldName} from ${tableName} order by ${dateFieldName} desc limit 1`;

  connection.query(query, function(error, results, fields) {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  });
  console.log('latestdate');
  connection.end();
};

export default fetchLatestDate;

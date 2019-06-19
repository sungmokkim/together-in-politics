const mysql = require('mysql');
let dateAndTime = require('date-and-time');
import env from '../../helpers/serverEnv';

const fetchPeriodData = ({ community, period }, callback) => {
  const { host, user, password, database, periodDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  const dateFieldName = `date`;
  const rankFieldName = `rank`;
  const tableName = periodDataTable;

  const periodIndex = period.index;

  let periodString;

  switch (periodIndex) {
    case 'years':
      periodString = 'years';
      break;
    case 'months':
      periodString = 'years, months';
      break;
    case 'weeks':
      periodString = 'years, months, weeks';
      break;

    default:
      periodString = 'years';
  }

  const query = `select name, avg(anti_count ) as anti_count, ${periodString} from ${tableName}  where name like ? group by ${periodString} order by ${periodString} asc `;

  // const query = `select * from ${tableName} where name like ? order by period asc `;

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

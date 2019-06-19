const mysql = require('mysql');
let dateAndTime = require('date-and-time');
import env from '../../helpers/serverEnv';

const fetchBubbleData = ({ latestDate, period }, callback) => {
  const { host, user, password, database, periodDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();
  const { year, month, date } = latestDate;
  const { type, value } = period;

  const today = new Date();
  console.log(period);
  let dateFrom;
  switch (type) {
    case 'year':
      dateFrom = dateAndTime.addYears(today, 0 - value);
      break;
    case 'month':
      dateFrom = dateAndTime.addMonths(today, 0 - value);
      break;
    default:
      break;
  }

  const dateString = dateFrom
    ? dateAndTime.format(dateFrom, 'YYYY-MM-DD', true)
    : '2017-05-01';

  const tableName = periodDataTable;

  console.log(dateString);
  const query = `select name, avg(w_count) as w_count, (sum(anti_count * 1.5) / sum(m_count)) as anti_ratio, (sum(m_count) / sum(w_count)) as popularity from ${tableName} where dates >= ?group by name order by name asc`;

  const queryVariables = [dateString];
  connection.query(query, queryVariables, function(error, results, fields) {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  });

  connection.end();
};

export default fetchBubbleData;

const mysql = require('mysql');
let dateAndTime = require('date-and-time');
import env from '../../helpers/serverEnv';

const fetchTodayRankings = ({ year, month, date, get_latest }, callback) => {
  const { host, user, password, database, todayDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  const originalDate = `${year}-${month}-${date}`;

  const todayParsed = dateAndTime.parse(originalDate, 'YYYY-MM-DD', true);
  const dateMinusOne = dateAndTime.addDays(todayParsed, -1);
  const newDate = dateAndTime.format(dateMinusOne, 'YYYY-MM-DD', true);

  const dateFieldName = `date`;
  const rankFieldName = `rank`;
  const tableName = todayDataTable;

  const query = `select a.name, ((a.anti_count) / a.m_count) as anti_ratio, a.${rankFieldName} as rank_today, (select ${rankFieldName} from ${tableName} where ${dateFieldName} like ? and name like a.name and exists(select ${rankFieldName} from ${tableName} where ${dateFieldName} like ?)) as rank_yesterday from ${tableName} a where (a.${dateFieldName} like ?) order by rank_today asc `;

  const queryVariables = [newDate, newDate, originalDate];

  connection.query(query, queryVariables, function(error, results, fields) {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  });

  connection.end();
};

export default fetchTodayRankings;

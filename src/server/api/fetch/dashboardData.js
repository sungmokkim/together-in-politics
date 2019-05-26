const mysql = require('mysql');
import env from '../../helpers/serverEnv';
import dateAndTime from 'date-and-time';

const fetchDashboardData = (
  latestDate,
  { community, indicator, range },
  callback
) => {
  const { host, user, password, database, todayDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  const todayKoreanString = latestDate[0]['date'];

  const todayKorean = dateAndTime.parse(todayKoreanString, 'YYYY-MM-DD', true);

  const dateFieldName = `date`;
  const rankFieldName = `rank`;
  const tableName = todayDataTable;

  const durations = {
    months: dateAndTime.addMonths,
    years: dateAndTime.addYears,
    days: dateAndTime.addDays
  };

  const fetchFrom = durations[range['duration']](
    todayKorean,
    0 - range['number']
  );

  const query = `select ${dateFieldName} as today, name , popularity,(1-anti_ratio) as anti_ratio,word1, word2, word3,${rankFieldName}, (select count(name) from ${tableName} where ${dateFieldName} like today) as total_community from ${tableName} where name like ? and (${dateFieldName} between ? and ? ) order by today asc`;

  const queryVariables = [community, fetchFrom, todayKoreanString];

  connection.query(query, queryVariables, function(error, results, fields) {
    if (error) {
      callback(error);
    } else {
      callback(results);
    }
  });

  connection.end();
};

export default fetchDashboardData;

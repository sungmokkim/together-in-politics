const mysql = require('mysql');
import env from '../../helpers/serverEnv';

const fetchTodayIndicator = ({ year, month, date, get_latest }, callback) => {
  const { host, user, password, database, todayDataTable } = env.mysql;
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  connection.connect();

  let todayDate = `${year}-${month}-${date}`;

  const dateFieldName = `date`;
  const tableName = todayDataTable;
  let query;
  if (get_latest) {
    todayDate = `(select ${dateFieldName} from ${tableName} order by ${dateFieldName} desc limit 1)`;

    query = `select (SUM(m_count)/SUM(w_count)) as popularity , (1-(SUM(anti_count) / SUM(m_count))) as like_ratio, (select word from (select word1 as word, word1_1 as value from ${tableName} where ${dateFieldName} like ${todayDate} union select word2 as word, word2_1 as value from ${tableName} where ${dateFieldName} like ${todayDate} union select word3 as word, word3_1 as value from ${tableName} where ${dateFieldName} like ${todayDate}) x group by word order by sum(value) desc limit 1) as word1, (select sum(value) from (select word1 as word, word1_1 as value from ${tableName} where ${dateFieldName} like ${todayDate} union select word2 as word, word2_1 as value from ${tableName} where ${dateFieldName} like ${todayDate} union select word3 as word, word3_1 as value from ${tableName} where ${dateFieldName} like ${todayDate}) x group by word order by sum(value) desc limit 1) as word1_1 from ${tableName} where ${dateFieldName} like ${todayDate}`;

    connection.query(query, function(error, results, fields) {
      if (error) {
        callback(error);
      } else {
        callback(results);
      }
    });

    connection.end();
  } else {
    query = `select (SUM(m_count)/SUM(w_count)) as popularity , (1-(SUM(anti_count) / SUM(m_count))) as like_ratio, (select word from (select word1 as word, word1_1 as value from ${tableName} where ${dateFieldName} like ? union select word2 as word, word2_1 as value from ${tableName} where ${dateFieldName} like ? union select word3 as word, word3_1 as value from ${tableName} where ${dateFieldName} like ?) x group by word order by sum(value) desc limit 1) as word1, (select sum(value) from (select word1 as word, word1_1 as value from ${tableName} where ${dateFieldName} like ? union select word2 as word, word2_1 as value from ${tableName} where ${dateFieldName} like ? union select word3 as word, word3_1 as value from ${tableName} where ${dateFieldName} like ?) x group by word order by sum(value) desc limit 1) as word1_1 from ${tableName} where ${dateFieldName} like ?`;

    const queryVariables = [
      todayDate,
      todayDate,
      todayDate,
      todayDate,
      todayDate,
      todayDate,
      todayDate
    ];

    connection.query(query, queryVariables, function(error, results, fields) {
      if (error) {
        callback(error);
      } else {
        callback(results);
      }
    });
    console.log('todayindicator');
    connection.end();
  }
};

export default fetchTodayIndicator;

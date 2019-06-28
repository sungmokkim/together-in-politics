const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
import env from '../../helpers/serverEnv';
import dateAndTime from 'date-and-time';
import wordsToFilter from '../../helpers/wordsToFilter';

const {
  host,
  port,
  user,
  mongopw,
  database,
  infoCollection
} = env.mongodb_info;

const fetchKeywordsData = (
  { community, latestDate, period, mentionPortion },
  callback
) => {
  // Connection URL

  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // deconstruct latest (most recent) date into year, month, date
  const { year, month, date } = latestDate;

  // Database Name
  const dbName = `${database}`;

  // decontruct object to get type and value, also get limit(number) to control document numbers
  const { type, value, limit } = period;
  const todayString = `${year}-${month}-${date}`;
  const today = dateAndTime.parse(todayString, 'YYYY-MM-DD', true);

  // get actual date from the latest date
  let dateFrom;
  switch (type) {
    //subtracting respective period(months, years, days) from the latest date
    case 'year':
      dateFrom = dateAndTime.addYears(today, 0 - value);
      break;
    case 'month':
      dateFrom = dateAndTime.addMonths(today, 0 - value);
      break;
    case 'day':
      dateFrom = dateAndTime.addDays(today, 0 - value);
      break;
    default:
      break;
  }

  //convert date object to string (for db query) if something goes wrong, the date string would be '2017-05-01' (oldest date from our data)
  const dateString = dateFrom
    ? dateAndTime.format(dateFrom, 'YYYY-MM-DD', true)
    : '2017-05-01';

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(`${infoCollection}`);
    collection
      .aggregate([
        {
          $match: {
            name: community.index,
            dates: { $gte: dateString },
            m_count: { $gte: community[mentionPortion.index] } // only fetch records with minimum m_count(freq of mentioning president)
          }
        },

        {
          $project: {
            name: 1,
            dates: 1,
            w_count: 1,
            m_count: 1,
            popularity: 1,
            anti_ratio: 1,
            anti_count: 1,
            words: {
              $filter: {
                input: '$words',
                as: 'word',
                cond: {
                  $not: {
                    $in: ['$$word.word', wordsToFilter] //filter words from imported word list
                  }
                }
              }
            }
          }
        }
      ])
      .sort({ anti_ratio: -1 }) // order by anti_ratio
      .limit(limit)
      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result); // get result and give it to callback func
        client.close();
      });
  });
};

export default fetchKeywordsData;

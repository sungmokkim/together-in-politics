import env from '../../helpers/serverEnv';
import dateAndTime from 'date-and-time';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const {
  host,
  port,
  user,
  mongopw,
  database,
  infoCollection
} = env.mongodb_info;

const fetchBubbleData = ({ latestDate, period }, callback) => {
  const url = `mongodb://${user}:${mongopw}@${host}:${port}`;

  // Database Name
  const dbName = `${database}`;

  // decontruct year, month, date from the most recent date
  const { year, month, date } = latestDate;

  //decontrcut type (whether it's monthly or yearly) and type from period date given
  const { type, value } = period;

  const latestDateString = `${year}-${month}-${date}`;

  const dateParsed = dateAndTime.parse(latestDateString, 'YYYY-MM-DD', true);

  // define date to fetch from based on given duration
  let subtractedDate;
  switch (type) {
    case 'year':
      subtractedDate = dateAndTime.addYears(dateParsed, 0 - value);
      break;
    case 'month':
      subtractedDate = dateAndTime.addMonths(dateParsed, 0 - value);
      break;
    default:
      break;
  }

  // parse it to string (for query) , if something goes wrong, it would be the default date('2017-05-01)
  const dateToFetchFrom = subtractedDate
    ? dateAndTime.format(subtractedDate, 'YYYY-MM-DD', true)
    : '2017-05-01';

  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection(`${infoCollection}`);
    collection
      .aggregate([
        {
          $match: { dates: { $gte: dateToFetchFrom }, m_count: { $gte: 100 } }
        },
        {
          $group: {
            _id: '$name',
            anti_count_sum: { $sum: '$anti_count' },
            m_count_sum: { $sum: '$m_count' },
            w_count_avg: { $avg: '$w_count' },
            w_count_sum: { $sum: '$w_count' },
            femi_count_sum: { $sum: '$femi_count' }
          }
        },
        {
          $project: {
            name: '$_id',
            anti_ratio: {
              $divide: ['$anti_count_sum', '$m_count_sum']
            },
            w_count: '$w_count_avg',
            femi_ratio: {
              $divide: ['$femi_count_sum', '$w_count_sum']
            },
            popularity: {
              $divide: ['$m_count_sum', '$w_count_sum']
            }
          }
        }
      ])
      .toArray((err, result) => {
        assert.equal(null, err);
        callback(result); // get result and give it to callback func

        client.close();
      });
  });
};

export default fetchBubbleData;

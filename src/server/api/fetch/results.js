// mongodb test

import { MongoClient } from 'mongodb';
import assert from 'assert';

const getResults = callback => {
  const url = 'URL';

  const dbName = 'mongodb';

  const client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(err => {
    assert.equal(null, err);

    console.log('connected to mongodb');

    const db = client.db(dbName);

    const col = db.collection('realtheqoo');

    col
      .find({})
      .limit(3)
      .toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);

        client.close();
        console.log('client closed!');
      });
  });
};

export default getResults;

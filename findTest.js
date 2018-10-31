var Datastore = require('nedb');
const db = new Datastore({ filename: './movies.db', autoload: true });


db.count(
  {}, (err, result) => {console.log(result)
  });


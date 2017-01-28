var parseSchema = require('mongodb-schema');
var connect = require('mongodb');
 
connect('mongodb://steemit:steemit@mongo0.steemdata.com/Steem', function(err, db) {
  if (err) return console.error(err);
 
  // here we are passing in a cursor as the first argument. You can 
  // also pass in a stream or an array of documents directly. 
  parseSchema(db.collection('VirtualOperations').find().limit(1), function(err, schema) {
    if (err) return console.error(err);
 
    console.log(JSON.stringify(schema, null, 2));
    db.close();
  });
});
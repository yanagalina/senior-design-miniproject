const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yanagalina:rK@x8UDyB7bEYXS@cluster0-mrpwo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var _db;

module.exports = {

  connectToServer: (callback) => {
    MongoClient.connect( uri,  { useNewUrlParser: true, useUnifiedTopology: true }, ( err, client ) => {
      _db  = client.db("senior-design-mp");
      return callback(err);
    } );
  },

  getDb: function() {
    return _db;
  }
};

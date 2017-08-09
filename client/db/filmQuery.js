var MongoClient = require('mongodb').MongoClient;

var FilmQuery = function(){
  this.url = "mongodb://localhost:27017/ratings_site";

};

FilmQuery.prototype = {
  all: function(callback){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('films');
      collection.find().toArray(function(err, result){
        callback(result);
      });
    });
  },
  add: function(filmToAdd, callback){
    MongoClient.connect(this.url, function(err, db){
      if (db) {
        var collection = db.collection('films');
        collection.insert(filmToAdd);
        collection.find().toArray(function(err, results){
          callback(results);
        });
      };
    });
  }
}

module.exports = FilmQuery;
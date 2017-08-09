var Film = require('./film');
var Review = require('./review');

var Films = function() {


}

Films.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  },
all: function(callback){
  this.makeRequest("http://localhost:3000/api/films", function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var results = JSON.parse(jsonString);
  var films = Films.prototype.populateFilms(results);
  callback(films);
  })
},
populateFilms: function(results){
  var films = [];
  for (var result of results){;
    var film = new Film(result);
    films.push(film);
  }
  return films;
},
add:function(newFilm, callback){
  var filmToAdd = JSON.stringify(newFilm);
  this.makePostRequest("http://localhost:3000/api/films", callback, filmToAdd);
},
makePostRequest: function(url, callback, payload)
{
  var request = new XMLHttpRequest();
  request.open('post', url);
  request.setRequestHeader("Content-type", "application/json");
  request.addEventListener('load', callback);
  request.send(payload);
}

}

module.exports = Films;

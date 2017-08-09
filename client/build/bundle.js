/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Films = __webpack_require__(3);

var UI = function() {
  var films = new Films();
  films.all(function(result){
   UI.prototype.render(result);
});
}

UI.prototype = {
  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },

  render: function(films) {
    var container = document.getElementById('films');

    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.genre, 'Genre: ');
      
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);
    }
  }
}

module.exports = UI;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  new UI();
}

window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Film = function(options) {
  this.title = options.title;
  this.actors = options.actors;
  this.reviews = options.reviews || [];
  this.genre = options.genre;
}

Film.prototype = {
  addReview: function(review) {
    this.reviews.push(review);
  }
}

module.exports = Film;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Film = __webpack_require__(2);
var Review = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Review = function(options) {
  this.comment = options.comment;
  this.rating = options.rating;
  this.author = options.author;
}

module.exports = Review;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
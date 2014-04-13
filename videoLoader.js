var express = require('express');
var videoLoader = express();
videoLoader.use(express.static(__dirname + '/assets'));

var credential = require('./credential.js');
var mdb = require('moviedb')(credential.themoviedb.apiKey);
console.log("moviedb credential : ", credential.themoviedb.apiKey);

var finder = require('findit')('/home/nc/1pad/movies');
var path = require('path');
var movies = [];
var mdbdatas = [];
var index = 0;

finder.on('directory', function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === '.git' || base === 'node_modules') stop()
    else console.log(dir + '/')
});

finder.on('file', function (file, stat) {
  //console.log(file);
  var name = path.basename(file, path.extname(file));
  //movie = {
  movies.push({
    id: index++,
    path: file,
    name: name,
    mdbdatas: []
  });
  /*
   *mdb.searchMovie({query: movie.name }, function(err, mdbRes){
   *  console.log("===>", mdbRes);
   *  if (!! mdbRes) {
   *    for (var j=0; j < mdbRes.results.length; ++j) {
   *      var result = mdbRes.results[j];
   *      result.image = "http://image.tmdb.org/t/p/w154" + result.poster_path;
   *      mdbdatas.push(result);
   *      movie.mdbdatas.push(result.id);
   *    }
   *  }
   *  movies.push(movie);
   *});
   */
});

finder.on('link', function (link, stat) {
  console.log(link);
});

var addData = function (movie, id) {
  movie.mdbdatas = [];

  mdb.searchMovie({query: movie.name }, function(err, mdbRes){
    console.log("===>", mdbRes);
    if (!! mdbRes) {
      for (var j=0; j < mdbRes.results.length; ++j) {
        var result = mdbRes.results[j];
        result.image = "http://image.tmdb.org/t/p/w154" + result.poster_path;
        mdbdatas.push(result);
        movies[id].mdbdatas.push(result.id);
      }
    }
  });
}

finder.on('end', function () {

  for (var i=0; i < movies.length; ++i) {
    var movie = movies[i];
    addData(movie, i);
  }

  videoLoader.get('/', function(req, res){
    //res.send('Hello World !!');
    //
    // goto ember !!
    //
    var list = '<ul><li>';
    for (var i=0; i < movies.length; ++i) {
      movie = movies[i];
      list += '<li>';
      list += movie.name;
      list += '</li>';
    }
    list += '</li></ul>';
    res.send(list);

  });

  videoLoader.get('/movies', function(req, res){
    res.send({
      movies: movies,
      mdbdatas: mdbdatas
    });
  });

  videoLoader.get('/movies/:id', function(req, res){
    var movie = movies[req.params.id];
    mdb.searchMovie({query: movie.name }, function(err, mdbRes){
      console.log("===>", mdbRes);
      var mdbdatas = mdbRes.results;
      movie.mdbdatas =[];
      for (var i=0; i < mdbRes.results.length; ++i) {
        var result = mdbRes.results[i];
        movie.mdbdatas.push(result.id);
        mdbdatas[i]['image'] = "http://image.tmdb.org/t/p/w154" + result.poster_path;
      }

      console.log("mdbdatas : ", mdbdatas);

      res.send({
        movie: movie,
        mdbdatas: mdbdatas
      });
    });
  });

  videoLoader.get('/mdbdata?:ids', function(req, res){
    var ids = req.query.ids;
    var mdbdatas = [];
    for (var i=0; i < ids.length; ++i) {
      var id = ids[i];
      mdb.movieInfo({id: id}, function(err, mdbRes){
        console.log(mdbRes);
        mdbdatas.push(mdbRes);
        if (i === ids.length) {
          res.send({
            mdbdatas: mdbdatas
          });
        }
      });
    }
  });

  var server = videoLoader.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });
});


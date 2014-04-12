var express = require('express');
var videoLoader = express();
videoLoader.use(express.static(__dirname + '/assets'));

var finder = require('findit')('/home/nc/1pad/movies');
var path = require('path');
var movies = [];
var index = 1;

finder.on('directory', function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === '.git' || base === 'node_modules') stop()
    else console.log(dir + '/')
});

finder.on('file', function (file, stat) {
  console.log(file);
  movies.push({
    id: index++,
    path: file,
    name: path.basename(file, path.extname(file))
  });
});

finder.on('link', function (link, stat) {
  console.log(link);
});

finder.on('end', function () {

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
    res.send({movies: movies});
  });

  videoLoader.get('/movies/:id', function(req, res){
    res.send({movie: movies[req.params.id]});
  });

  var server = videoLoader.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });
});


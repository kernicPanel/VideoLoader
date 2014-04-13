var express = require('express');
var videoLoader = express();
videoLoader.use(express.static(__dirname + '/assets'));

var bodyParser = require('body-parser');
videoLoader.use(bodyParser());

var finder = require('findit')('/home/nc/1pad/movies');
var path = require('path');
var fs = require('fs');
var movies = [];
var index = 1;

finder.on('directory', function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === '.git' || base === 'node_modules') stop()
    else console.log(dir + '/')
});

finder.on('file', function (file, stat) {
  //console.log(file);
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

  console.log(movies);
  videoLoader.get('/', function(req, res){
    //res.send('Hello World !!');
    //
    // goto ember !!
    //    //var list = '<ul><li>';
    //for (var i=0; i < movies.length; ++i) {
      //movie = movies[i];
      //list += '<li>';
      //list += movie.name;
      //list += '</li>';
    //}
    //list += '</li></ul>';
    //res.send(list);

  });

  videoLoader.get('/movies', function(req, res){
    res.send({movies: movies});
  });


  /*
   *var router = express.Router();
   *router.route('/movies/:id')
   *  .all(function(req, res, next) {
   *    // runs for all HTTP verbs first
   *    // think of it as route specific middleware!
   *  })
   *  .get(function(req, res, next) {
   *    //res.json(req.user);
   *    res.send({movie: movies[req.params.id]});
   *  })
   *  .put(function(req, res, next) {
   *    // just an example of maybe updating the user
   *    //req.user.name = req.params.name;
   *    // save user ... etc
   *    //res.json(req.user);
   *    res.json(req.params);
   *  });
   */

  videoLoader.get('/movies/:id', function(req, res){
    res.send({movie: movies[req.params.id]});
  });


  videoLoader.put('/movies/:id', function(req, res){
    var oldName = movies[req.params.id - 1].name;
    var newName = req.body.movie.name;
    var oldPath = movies[req.params.id - 1].path;
    var newPath = req.body.movie.path.replace(oldName, newName);
    //console.log("oldName : ", oldName);
    //console.log("newName : ", newName);
    //console.log("oldPath : ", oldPath);
    //console.log("newPath : ", newPath);
    fs.rename(oldPath, newPath, function () {
      movies[req.params.id - 1].name = newName;
      movies[req.params.id - 1].path = newPath;
      res.send({movie: movies[req.params.id - 1]});
    });
    //console.log("req.body.movie.name : ", req.body.movie.name);
    //console.log("req.body : ", req.body);
    //console.log("req.query : ", req.query);
    //console.log("req.params : ", req.params);
    //req.pipe(process.stdout);
    //res.send(req.movie);
  });

  var server = videoLoader.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
  });
});


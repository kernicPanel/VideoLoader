VideoLoader.Router.map(function() {
  this.resource('movies', { path: '/' });
  //this.resource('movies', function() {
    this.resource('movie', { path: '/movie/:movie_id' });
  //});
});

VideoLoader.MoviesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('movie');
  }
});

VideoLoader.MovieRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('movie', params.movie_id);
  }
});

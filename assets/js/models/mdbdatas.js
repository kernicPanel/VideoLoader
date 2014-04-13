VideoLoader.Mdbdata = DS.Model.extend({
  movie: DS.belongsTo('movie', {async: true}),
  adult: DS.attr('boolean'),
  backdrop_path: DS.attr('string'),
  //id: 64686,
  mdbid: DS.attr('number'),
  original_title: DS.attr('string'),
  release_date: DS.attr('date'),
  poster_path: DS.attr('string'),
  popularity: DS.attr('number'),
  title: DS.attr('string'),
  vote_average: DS.attr('number'),
  vote_count: DS.attr('number')
});

VideoLoader.Mdbdata.FIXTURES = [
 {
   id: 1,
   name: '47 Ronin.mkv',
   path: '/home/nc/1pad/movies/47 Ronin.mkv'
 },
 {
   id: 2,
   name: '9.Mois.Ferme.2013.FRENCH.BDRip.x264-AYMO.mkv',
   path: '/home/nc/1pad/movies/9.Mois.Ferme.2013.FRENCH.BDRip.x264-AYMO.mkv'
 },
 {
   id: 3,
   name: 'A Boire.2004.FRENCH.DVDRip.XviD.avi',
   path: '/home/nc/1pad/movies/A Boire.2004.FRENCH.DVDRip.XviD.avi'
 }
];

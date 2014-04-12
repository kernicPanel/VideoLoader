VideoLoader.Movie = DS.Model.extend({
  name: DS.attr('string'),
  path: DS.attr('string')
});

VideoLoader.Movie.FIXTURES = [
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

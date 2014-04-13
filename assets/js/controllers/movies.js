VideoLoader.MovieController = Ember.ObjectController.extend({
  actions: {
    editMovie: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);

      this.get('model').save();
    },
    cancelChanges: function () {
      this.set('isEditing', false);
    },
  },

  isEditing: false

});

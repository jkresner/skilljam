window.JammerProfileView = Backbone.View.extend({

    initialize: function () {
      this.template = _.template( $('#JammerProfileView').html() );
      this.render();
    },

    render: function () {
      console.log('jammerprofile.model', this.model.toJSON());

      this.$el.html(this.template(this.model.toJSON()));
    }
});
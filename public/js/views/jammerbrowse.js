window.JammerBrowseView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template( $('#JammerBrowseView').html() ),
        this.render();
    },

    render: function () {

      this.$el.html(this.template());

      console.log('JammerBrowseView', this.template(), this.$('.chzn-select'))

      this.$("#searchskills").tokenInput('/skills', { theme: 'facebook' });

      return this
    }
});

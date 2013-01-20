window.JammerBrowseView = Backbone.View.extend({

    initialize: function () {
        this.template = _.template( $('#JammerBrowseView').html() ),
        this.render();
    },

    render: function () {

      this.$el.html(this.template());
//      collection = this.collection;
      // this.$("#searchskills").tokenInput('/skills',
      //     { theme: 'facebook', tokenLimit: 1, hintText: "Type a skill you want to learn",

      //           onAdd: function(item) {
      //             console.log('search_skill', item.name);
      //             collection.url = "/jammers-search/" + item.name;
      //             collection.fetch();

      //       },

      //   });

      return this
    }
});

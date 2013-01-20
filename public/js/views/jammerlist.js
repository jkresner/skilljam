window.JammerListView = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {

        var jammers = this.collection.models;

        //console.log('JammerListView.render', this.collection.models.length);

        $(this.el).html('<div id="jammers_tiles" class="profiles span12"><ul class="thumbnails"></ul></div>');

        for (var i = 0; i < jammers.length; i++) {

            var skills_string = "jammer";
            skills_array = _.pluck( jammers[i].get('skills'),  'name' )
            //console.log('skills_array', skills_array);
            for (var s = 0; s < skills_array.length; s++) {
                skills_string += " " + skills_array[s].replace(' ','-');
            }
            //console.log('skills_string', skills_string);

            $('.thumbnails', this.el).append(
                new JammerListItemView({
                    className: skills_string,
                    model: jammers[i]
                }).render().el);
        }

        $container = this.$('#jammers_tiles');
        $container.isotope({ filter: '*', itemSelector: '.jammer' });

        console.log('$container', $container, $('#filters a'));

        $('#filters a').on('click', function(){
          var selector = $(this).attr('data-filter');
          console.log('filtering', selector, $container);
          $container.isotope({ filter: selector, itemSelector: '.jammer' });
          return false;
        });

        return this;
    },

    clearRender: function()
    {
        this.$('#jammers_tiles').isotope('destroy');
        $('#filters a').off('click');
        this.$el.html('');
    }

});

window.JammerListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
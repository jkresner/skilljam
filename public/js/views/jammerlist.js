window.JammerListView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.collection.on("reset",this.render,this);
    },

    render: function () {
        var jammers = this.collection.models;

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = 0; i < jammers.length; i++) {
            $('.thumbnails', this.el).append(new JammerListItemView({model: jammers[i]}).render().el);
        }

        return this;
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
var AppRouter = Backbone.Router.extend({

    routes: {
        ""	                  : "list",
        "/page/:page"	      : "list",
        "jammers/add"         : "addJammer",
        "jammer/:id"          : "jammerDetails",
        "about"               : "about",
    },

    initialize: function () {
        this.jammers = new JammerCollection();
        this.jammers.on('reset', this.refresh, this);
        this.jammers.fetch();
    },

    // home: function (id) {
    //     this.jammerListView.clearRender()

    //     if (!this.homeView) {
    //         this.homeView = new HomeView();
    //     }
    //     $('#content').html(this.homeView.el);
    // },

    refresh: function(page) {
        console.log('refreshing');
        // this.jammers.fetch({success: function(){
        //     that.navigate('', false);
        // }});
        this.list();
    },

	list: function(page) {
        this.jammerListView = new JammerListView({collection: this.jammers});
        if (this.jammers.length > 0)
        {
            this.jammerListView.clearRender();

            console.log('list.jammers', this.jammers.length);
            $("#content").html('')
            $("#content").append(new JammerBrowseView({collection:this.jammers}).el)
            console.log('this.jammerListView.el', this.jammerListView.el);
            $("#content").append(this.jammerListView.render().el);
        }
    },

    jammerDetails: function (id) {
        this.jammerListView.clearRender();

        if (this.jammers.length = 0) { return this.navigate("#list"); }
        idstr = id.toString();
        var jammer = _.find(this.jammers.models, function(m) { return m.get('_id') == idstr});

        $("#content").html(new JammerView({model: jammer}).el);
    },

	addJammer: function() {
        var jammer = new Jammer();
        $('#content').html(new JammerView({model: jammer}).el);
	},

    about: function () {
        this.jammerListView.clearRender();

        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'JammerView',
    'JammerListItemView', 'AboutView'], function() {
    window.app = new AppRouter();
    Backbone.history.start();
});
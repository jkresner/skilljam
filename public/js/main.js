var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "jammers"	: "list",
        "jammers/page/:page"	: "list",
        "jammers/add"         : "addJammer",
        "jammer/:id"         : "jammerDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var jammers = new JammerCollection();
        jammers.fetch({success: function(){
            $("#content").html('')
            $("#content").append(new JammerBrowseView().el)
            $("#content").append(new JammerListView({collection: jammers, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    jammerDetails: function (id) {
        var jammer = new Jammer({_id: id});
        jammer.fetch({success: function(){
            $("#content").html(new JammerView({model: jammer}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addJammer: function() {
        var jammer = new Jammer();
        $('#content').html(new JammerView({model: jammer}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'JammerView',
    'JammerListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
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

        that = this;
        this.jammers = new JammerCollection();
        this.jammers.fetch({success: function(){
            that.list(1);
        }});
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
        $("#content").html('')
        $("#content").append(new JammerBrowseView({collection:this.jammers}).el)
        $("#content").append(new JammerListView({collection: this.jammers, page: p}).el);
        this.headerView.selectMenuItem('home-menu');
    },

    jammerDetails: function (id) {
        if (this.jammers.length = 0) { return this.navigate("#list"); }
        idstr = id.toString();
        var jammer = _.find(this.jammers.models, function(m) { return m.get('_id') == idstr});

        $("#content").html(new JammerView({model: jammer}).el);
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
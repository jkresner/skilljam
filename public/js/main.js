var AppRouter = Backbone.Router.extend({

    routes: {
        ""	                  : "list",
        "/page/:page"	      : "list",
        "jammers/add"         : "addJammer",
        "jammer/:id"          : "jammerDetails",
        "about"               : "about",
        "refresh"             : "refresh"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        that = this;
        this.jammers = new JammerCollection();
        this.jammers.fetch({success: function(){
            that.navigate('', false);
        }});
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    refresh: function(page) {
        this.jammers.fetch({success: function(){
            that.navigate('', false);
        }});
    },

	list: function(page) {
        $("#content").html('')
        $("#content").append(new JammerBrowseView({collection:this.jammers}).el)
        $("#content").append(new JammerListView({collection: this.jammers}).el);
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
    window.app = new AppRouter();
    Backbone.history.start();
});
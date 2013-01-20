window.JammerView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        console.log('jammer.model', this.model.toJSON());

        $(this.el).html(this.template(this.model.toJSON()));

        model = this.model;
        skillsInput = this.$("#skills");

        skillsInput.tokenInput('/skills', { theme: 'facebook',
            onReady: function()
            {
                var skills = model.get('skills');
                for (var i=0;i<skills.length;i=i+1)
                {
                    token = { id: skills[i]._id, name: skills[i].name }
                    skillsInput.tokenInput("add", token);
                }
            },
            onAdd: function(item) {
                var skills = model.get('skills');
                skills.push(item);
                console.log('addskills', skills);
                model.set('skills', skills);
            },
            onDelete: function(item) {
                var skills = model.get('skills');
                skills = _.without(skills, item);
                model.set('skills', skills);
                console.log('deleteskills', skills);
            }
         });

        return this;
    },

    events: {
        "click .save"   : "saveJammer",
        "click .delete" : "deleteJammer",
        "drop #picture" : "dropHandler"
    },

    saveJammer: function () {
        var self = this;

        data = {
            name: this.$('#name').val(),
            description: this.$('#description').val()
        };

        console.log('before save', data, this.model.toJSON());

        this.model.save(data, {
            success: function (model) {
                console.log('saved', window.app.jammers, model);
                window.app.jammers.fetch();
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteJammer: function () {
        this.model.destroy({
            success: function () {
                alert('Jammer deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        this.model.set('picture', e.dataTransfer.files[0].name);

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});
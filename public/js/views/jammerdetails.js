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
                model.save('skills', skills);
            },
            onDelete: function(item) {
                var skills = model.get('skills');
                skills = _.without(skills, item);
                model.save('skills', skills);
                console.log('deleteskills', skills);
            }
         });

        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteJammer",
        "drop #picture" : "dropHandler"
    },

    change: function (event) {
        // Remove any existing alert utils
        message.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveJammer();
        return false;
    },

    saveJammer: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('jammers/' + model.id, false);
                utils.showAlert('Success!', 'Jammer saved successfully', 'alert-success');
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

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});
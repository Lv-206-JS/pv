define(['backbone', 'underscore', 'JST', 'moment', 'backbone-validation'], function (Backbone, _, JST, Moment) {
    'use strict';

    var SettingsView = Backbone.View.extend({
        template: JST['project:settings'],
        className: 'settings-view show-content',

        events: {
            'click .tab-general': 'settingsGeneralInformation',
            'click .tab-time-settings': 'settingsTimeInformation',
            'click .ok-button': 'saveSettings',
            'click .cancel-button': 'cancelSettings',
            'keydown .form-control': 'removeErrors'
        },

        initialize: function (options) {
            this.model = options.model;
            this.settings = this.model.get('settings');
            this.moment = Moment;
            Backbone.Validation.bind(this);
        },


        render: function render() {
            this.$el.html(this.template({model: this.model.attributes, settings: this.settings, moment: this.moment}));
            return this;
        },

        settingsGeneralInformation: function () {
            this.$el.find('.tab-time-settings').removeClass('w--current');
            this.$el.find('.settings-content').removeClass('show-content');
            this.$el.find('.settings-content').addClass('hide-content');
            this.$el.find('.tab-general').addClass('w--current');
            this.$el.find('.general-content').removeClass('hide-content');
            this.$el.find('.general-content').addClass('show-content');
        },

        settingsTimeInformation: function () {
            this.$el.find('.tab-general').removeClass('w--current');
            this.$el.find('.general-content').removeClass('show-content');
            this.$el.find('.general-content').addClass('hide-content');
            this.$el.find('.tab-time-settings').addClass('w--current');
            this.$el.find('.settings-content').removeClass('hide-content');
            this.$el.find('.settings-content').addClass('show-content');
        },

        saveSettings: function saveSettings() {
            var newName = this.$el.find('.name').val();
            this.model.set({name: newName});
            var newAuthor = this.$el.find('.author').val();
            this.model.set({author: newAuthor});
            if (this.$el.find('.description').val() !== undefined) {
                var newDescription = this.$el.find('.description').val();
                this.model.set({description: newDescription});
            } else {
                this.model.set({description: null});
            }
            var newProjectIcon = this.$el.find('.project-icon').val();
            this.model.set({projectIcon: newProjectIcon});

            var newStartDateInSeconds = this.moment(this.$el.find('.start-date').val()).unix();
            this.model.set({startDate: newStartDateInSeconds});
            var newDayDuration = this.$el.find('.day-duration').val();
            var newDayStart = this.$el.find('.working-day-start').val();
            this.settings.dayStart = this.moment.duration(+newDayStart, 'hours').asSeconds();
            this.settings.dayDuration = this.moment.duration(+newDayDuration, 'hours').asSeconds();
            if ($("#add-attachment-file").prop('files')[0]) {
                this.settings.icon = this.uploadAttachment();
            }
            this.model.set('settings', this.settings);

            if (this.model.isValid(['name', 'author', 'description', 'settings.dayStart', 'settings.dayDuration'])) {
                console.log(this.model.isValid());
                this.model.save();
            } else {
                console.log("Handle ERRORS!");
                this.handleErrors();
            }

            event.preventDefault();
            this.$el.remove();
        },

        handleErrors: function () {
            var that = this,
                errors = this.model.validate(),
                inputs = this.$el.find('.form-control');

            _.each(inputs, function(input) {
                var inputName = $(input).attr('name');

                if (errors[inputName]) {
                    that.$el.find('.' + inputName + '-error').html(errors[inputName]);
                    $(input).addClass('error');
                }

            });
        },

        removeErrors: function (e) {
            var input = e.currentTarget;
            var inputName = $(input).attr('name');
            this.$el.find('.' + inputName + '-error').html('');
            $(input).removeClass('error');

        },

        uploadAttachment: function () {
            var uploadfile = new FormData();
            uploadfile.append('file', $("#add-attachment-file").prop('files')[0]);
            var response = $.ajax({
                url: '/rest/attachments',
                type: 'POST',
                data: uploadfile,
                contentType: false,
                processData: false,
                async: false
            });
            return JSON.parse(response.responseText).relativePath;
        },

        cancelSettings: function cancelSettings(event) {
            event.preventDefault();
            this.$el.remove();
        }

    });
    return SettingsView;
});

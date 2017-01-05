define(['backbone', 'underscore', 'JST', 'moment'], function (Backbone, _, JST, Moment) {
    'use strict';

    var InfoBarView = Backbone.View.extend({
        template: JST['project:infoBar'],
        className: 'info-bar-view',

        initialize: function (options) {
            this.model = options.model;
            this.moment = Moment;
        },

        render: function render() {
            this.$el.html(this.template({
                author: this.model.get('author'),
                name: this.model.get('name'),
                description: this.model.get('description'),
                startDate: this.model.get('startDate'),
                createDate: this.model.get('createDate'),
                modifiedDate: this.model.get('modifiedDate'),
                settings : this.model.get('settings'),
                milestones: this.model.get('milestones'),
                tasks: this.model.get('tasks'),
                moment: this.moment
            }));
            return this;
        }
    });

    return InfoBarView;
});
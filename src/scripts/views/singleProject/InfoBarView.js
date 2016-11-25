define(['backbone', 'underscore', 'JST', 'collections/ProjectsCollection'], function (Backbone, _, JST, ProjectsCollection) {
    'use strict';

    var InfoBarView = Backbone.View.extend({
        template: JST['singleProject:InfoBarView'],
        className: 'info-bar-view',

        initialize: function (options) {
            this.model = options.model;
        },

        render: function render() {
            this.$el.html(this.template({author: this.author, page: this.page}));
            //this.$el.html(this.template({}));
            return this;
        }
    });

    return InfoBarView;
});
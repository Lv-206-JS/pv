define([
    'backbone',
    'JST'
], function (Backbone, JST) {
    'use strict';

    var ProjectsTitleView = Backbone.View.extend({
        template: JST['projects:projectsTitle'],
        className: 'projects-title-view',

        initialize: function () {

        },

        render: function render() {
            this.$el.html(this.template({}));

            return this;
        },

        onChange: function () {
            this.$el.html('');
            this.renderViews();
        }
    });

    return ProjectsTitleView;
});

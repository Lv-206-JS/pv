define([
    'backbone',
    'models/Project'
], function (Backbone, ProjectModel) {
    'use strict';

    var ProjectsCollection = Backbone.Collection.extend({
        url: '/rest/projects',
        model: ProjectModel
    });

    return ProjectsCollection;
});

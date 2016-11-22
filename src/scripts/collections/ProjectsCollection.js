define([
    'backbone',
    '../models/ProjectModel'
], function (Backbone, ProjectModel) {
    'use strict';

    var ProjectsCollection = Backbone.Collection.extend({
        url: '/rest/routes/projects',
        model: ProjectModel
    });

    return ProjectsCollection;
});
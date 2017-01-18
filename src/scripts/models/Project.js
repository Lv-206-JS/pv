define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ProjectViewModel = Backbone.Model.extend({
        url: '/rest/projects/',

        setUrl: function (id) {
            this.url = '/rest/projects/' + id;
        },

        validation: {
            name: {
                required: true,
                msg: 'Please, fill in Project Name field.'
            },
            description: [{
                required: true,
                msg: 'Please, fill in Project Description field.',
            }, {
                rangeLength: [3, 45],
                msg: 'Description is expected to be 3 - 45 chars long!'
            }]


        },

        defaults: {
            "id": null,
            "name": "",
            "description": "",
            "author": "",
            "startDate": "",
            "createDate": "",
            "modifiedDate": "",
            "milestones": [
                {
                    "name": "",
                    "date": ""
                },
                {
                    "name": "",
                    "date": ""
                },
                {
                    "name": "",
                    "date": ""
                }
            ],
            "settings": {
                "dayStart": 9*3600,
                "dayDuration": 6*3600
            },
            "tasks": [
                {
                    "taskId": 0,
                    "projectId": 0,
                    "name": "",
                    "description": "",
                    "estimateTime": 0,
                    "resource": "",
                    "dependsOn": [
                        {
                            "taskId": 0,
                            "type": ""
                        }
                    ],
                    "attachments": [
                        {
                            "attachmentId": "",
                            "fileName": "",
                            "relativePath": "",
                            "mimetype": ""
                        }
                    ]
                }
            ],
            "resources": [
                {
                    "resourceId": 0,
                    "resourceName": "",
                    "type": "",
                    "rate": 0
                }
            ]
        }

    });

    return ProjectViewModel;
});

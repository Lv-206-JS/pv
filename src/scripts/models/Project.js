define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ProjectViewModel = Backbone.Model.extend({
        url: '/rest/projects/',

        setUrl: function (id) {
            this.url = '/rest/projects/' + id;
        },

        defaults: {
            "id": "",
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
                "dayDuration": 0,
                "weekend": [
                    "",
                    ""
                ],
                "icon": ""
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
                },
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
            ]
        }

    });

    return ProjectViewModel;
});
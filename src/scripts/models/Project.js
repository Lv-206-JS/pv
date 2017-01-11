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
                minLength: 30,
                msg: 'Description is too short. It is expected to be longer than 30 chars!'

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
                "dayDuration": 0
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

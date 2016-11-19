define([
    'backbone'
], function (Backbone) {
    'use strict';

    var MainViewModel = Backbone.Model.extend({
        url: '/rest/projects/',
        setUrl: function (id) {
            this.url = '/rest/projects/' + id;
        },

        defaults: {
            "id": 123,
            "idCounter": 1,
            "name": "RIA Project",
            "description": "Cupiditate quibusdam perferendis est libero et iure officia.",
            "author": "Julio Botsford",
            "startDate": "2016-07-10T04:57:54.481Z",
            "createDate": "2016-03-05T22:25:59.576Z",
            "modifiedDate": "2016-11-17T20:38:08.036Z",
            "milestones": [
                {
                    "name": "iste",
                    "date": "2017-10-09T09:24:02.213Z"
                },
                {
                    "name": "excepturi",
                    "date": "2017-03-15T03:13:42.195Z"
                },
                {
                    "name": "distinctio",
                    "date": "2017-07-12T08:26:27.952Z"
                }
            ],
            "settings": {
                "dayDuration": 6,
                "weekend": [
                    "Saturday",
                    "Sunday"
                ],
                "icon": "http://lorempixel.com/640/480/food"
            },
            "tasks": [
                {
                    "taskId": 11,
                    "projectId": 123,
                    "name": "est",
                    "description": "Esse dolorum porro magnam consequatur molestiae nemo.",
                    "estimateTime": 4,
                    "resource": "Developer 1",
                    "dependsOn": [
                        {
                            "taskId": false,
                            "type": false
                        }
                    ],
                    "attachments": [
                        {
                            "attachmentId": "a1",
                            "fileName": "knowledge_user.uri",
                            "mimetype": "application/x-sv4cpio"
                        }
                    ]
                },
                {
                    "taskId": 12,
                    "projectId": 123,
                    "name": "voluptas",
                    "description": "Soluta blanditiis id tenetur repellendus.",
                    "estimateTime": 3,
                    "resource": "Developer 2",
                    "dependsOn": [
                        {
                            "taskId": 11,
                            "type": "Finish-To-Start"
                        }
                    ],
                    "attachments": [
                        {
                            "attachmentId": "a2",
                            "fileName": "payment_forward_personal_loan_account.less",
                            "mimetype": "application/mbms-deregister+xml"
                        }
                    ]
                }
            ]
        }

    });
    
    var modelInstance = new MainViewModel();

    return MainViewModel;
});
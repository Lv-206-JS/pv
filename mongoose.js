var mongoose = require('mongoose');
/*
//=========== if you need to use global db, uncomment this strings ==========

mongoose.connect('mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts');
*/

// Most of the types are Strings, because its document oriented DB

var Schema = mongoose.Schema;

var ProjectsSchema = new Schema({
    id: {type: String, required: false},
    name: {type: String, required: false},
    description: {type: String, required: false},
    author: {type: String, required: false},
    startDate: {type: Date, required: false},
    createDate: {type: Date, required: false},
    modifiedDate: {type: Date, required: false},
    milestones: [{
        name: {type: String, required: false},
        date: {type: Date, required: false},
        dependsOn: [{
            taskId: {type: String, required: false},
            taskName : {type: String, required: false},
            type: {type: String, required: false}
        }]

    }],
    settings: {
        dayDuration: {type: String, required: false},
        weekend: {type: Array, required: false},
        icon: {type: String, required: false}
    },
    tasks: [{
        taskId: {type: String, required: false},
        projectId: {type: String, required: false},
        name: {type: String, required: false},
        description: {type: String, required: false},
        estimateTime: {type: String, required: false},
        resource: {type: String, required: false},
        dependsOn: [{
            taskId: {type: String, required: false},
            type: {type: String, required: false}
        }],
        attachments: [{
            attachmentId: {type: String, required: false},
            fileName: {type: String, required: false},
            relativePath: {type: String, required: false},
            mimeType: {type: String, required: false}
        }]
    }],
    attachments: [{
        attachmentId: {type: String, required: false},
        fileName: {type: String, required: false},
        relativePath: {type: String, required: false},
        mimeType: {type: String, required: false}
    }]
});

var FileAttachmentsSchema = new Schema ({
    attachmentId: {type: String, required: false},
    relativePath: {type: String, required: false}
}, { collection: 'fileAttachments' });

var UsersSchema = new Schema ({
    userId: {type: String, required: false},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false}

});

var OwnershipsSchema = new Schema ({
    projectId: {type: String, required: false},
    userId: {type: String, required: false},
    role: {type: String, required: false}
}, { collection: 'ownerships' });

var SessionsSchema = new Schema ({
    sessionId: {type: String, required: false},
    userId: {type: String, required: false}
});

// Create a model based on the schema
var Projects = mongoose.model('Projects', ProjectsSchema);
var FileAttachments = mongoose.model('FileAttachments', FileAttachmentsSchema);
var Users = mongoose.model('Users', UsersSchema);
var Ownerships = mongoose.model('Ownerships', OwnershipsSchema);
var Sessions = mongoose.model('Sessions', SessionsSchema);

module.exports.ProjectModel = Projects;
module.exports.FileAttachmentsModel = FileAttachments;
module.exports.UsersModel = Users;
module.exports.OwnershipsModel = Ownerships;
module.exports.SessionsModel = Sessions;

/*
//=========== if you need to use global db, uncomment this strings ==========
var mongoose    = require('mongoose');
mongoose.connect('mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts');
*/

var Schema = mongoose.Schema;

var ProjectsSchema = new Schema({
    id: {type: Number, required: false},
    idCounter: {type: Number, required: false},
    name: {type: String, required: false},
    description: {type: String, required: false},
    author: {type: String, required: false},
    startDate: {type: Date, required: false},
    createDate: {type: Date, required: false},
    modifiedDate: {type: Date, required: false},
    milestones: [{
        name: {type: String, required: false},
        date: {type: Date, required: false}
    }],
    settings: {
        dayDuration: {type: Number, required: false},
        weekend: {type: Array, required: false},
        icon: {type: String, required: false}
    },
    tasks: [{
        taskId: {type: Number, required: false},
        projectId: {type: Number, required: false},
        name: {type: String, required: false},
        description: {type: String, required: false},
        estimateTime: {type: Number, required: false},
        resource: {type: String, required: false},
        dependsOn: [{
            taskId: {type: Number, required: false},
            type: {type: String, required: false}
        }],
        attachments: [{
            attachmentId: {type: Number, required: false},
            fileName: {type: String, required: false},
            mimeType: {type: String, required: false}
        }]
    }]
});

var FileAttachmentsSchema = new Schema ({
    attachmentId: {type: Number, required: false},
    fileName: {type: String, required: false},
    relativePath: {type: String, required: false},
    mimeType: {type: String, required: false}
});

var UsersSchema = new Schema ({
    userId: {type: String, required: false},
    firstname: {type: Number, required: false},
    lastname: {type: Number, required: false},
    email: {type: Number, required: false},
    password: {type: String, required: false}

});

var OwnershipsSchema = new Schema ({
    projectId: {type: Number, required: false},
    userId: {type: Number, required: false},
    role: {type: String, required: false}
});

var SessionsSchema = new Schema ({
    sessionId: {type: Number, required: false},
    userId: {type: Number, required: false}
});

// Create a model based on the schema
var Projects = mongoose.model('Projects', ProjectsSchema);
var FileAttachments = mongoose.model('FileAttachments', FileAttachmentsSchema);
var Users = mongoose.model('Users', UsersSchema);
var Ownerships = mongoose.model('Ownerships', OwnershipsSchema);
var Sessions = mongoose.model('Sessions', SessionsSchema);

module.exports.ProjectModel = Projects;
module.exports.FileAttachmentsModel    = FileAttachments;
module.exports.UsersModel    = Users;
module.exports.OwnershipsModel    = Ownerships;
module.exports.SessionsModel    = Sessions;

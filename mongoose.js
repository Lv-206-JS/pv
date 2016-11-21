var mongoose    = require('mongoose');
mongoose.connect('mongodb://ganttcharts:softserve@ds055905.mlab.com:55905/ganttcharts');

var Schema = mongoose.Schema;

var ProjectsSchema = new Schema({
    id: {type: Number, required: true},
    idCounter: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    author: {type: String, required: true},
    startDate: {type: Date, required: true},
    createDate: {type: Date, required: true},
    modifiedDate: {type: Date, required: true},
    milestones: [{
        name: {type: String, required: true},
        date: {type: Date, required: true}
    }],
    settings: {
        dayDuration: {type: Number, required: true},
        weekend: {type: Array, required: true},
        icon: {type: String, required: false}
    },
    tasks: [{
        taskId: {type: Number, required: true},
        projectId: {type: Number, required: true},
        name: {type: String, required: true},
        description: {type: String, required: false},
        estimateTime: {type: Number, required: true},
        resource: {type: String, required: true},
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
    attachmentId: {type: Number, required: true},
    fileName: {type: String, required: true},
    relativePath: {type: String, required: true},
    mimeType: {type: String, required: true}
});

var UsersSchema = new Schema ({
    userId: {type: String, required: true},
    firstname: {type: Number, required: true},
    lastname: {type: Number, required: true},
    email: {type: Number, required: true},
    password: {type: String, required: true}

});

var OwnershipsSchema = new Schema ({
    projectId: {type: Number, required: true},
    userId: {type: Number, required: true},
    role: {type: String, required: true}
});

var SessionsSchema = new Schema ({
    sessionId: {type: Number, required: true},
    userId: {type: Number, required: true}
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

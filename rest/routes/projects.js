var express = require('express');
var Guid = require('guid');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;
var Ownerships  = require('../../mongoose').OwnershipsModel;


function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.send(401);
    }
}

function checkOwnership(request, response, next) {
    Ownerships.findOne({'projectId': request.params.id, 'userId': request.user.userId}, function (err, ownerShip) {
        if(err) {
            //error
        }
        else if(ownerShip != undefined) {
            if(ownerShip.role === 'creator') {
                next();
            }
            else {
                return response.send({access: 'Denied!'});
            }
        }
    });
}

function addOwnership(pid, uid) {
    var ownerShipToCreate = new Ownerships({
        projectId: pid,
        userId: uid,
        role: 'creator'
    });
    ownerShipToCreate.save(function (err, ownerShip) {
        if (err) {
            //error
        }
    });
}

function deleteOwnerShip(pid) {
    Ownerships.findOneAndRemove({'projectId': pid}, function (err, ownerShip) {
        if (!ownerShip){
            handleError(response, "Failed to find ownerShip!", 404);
        }
        else if (err) {
            handleError(response, "Failed to delete ownerShip!", 404);
        }
    });
}

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

//get all projects
router.get('/', authenticateUser, function (request, response) {
    Project.find({}, function (err, projects) {
        if(!projects || err) {
            handleError(response, "Failed to find projects!", 404);
        }
        else {
            response.send(projects);
        }
    });
});

//create project
router.post('/', authenticateUser, function (request, response) {
    console.log(request.user.firstname + ' ' + request.user.lastname);
    var projectToCreate = new Project({
        id: Guid.create().value,
        name: request.body.name,
        description: request.body.description,
        author: request.user.firstname + ' ' + request.user.lastname,
        startDate: request.body.startDate,
        createDate: (new Date()).getTime(),
        modifiedDate: (new Date()).getTime(),
        settings : {
            dayDuration : request.body.settings.dayDuration,
            weekend : request.body.settings.weekend,
            icon : request.body.settings.icon
        }
    });
    addOwnership(projectToCreate.id, request.user.userId);
    projectToCreate.save(function (err, project) {
        if (err) {
            handleError(response, "Failed to create project!");
        }
        else {
            response.send(project);
        }
    });
});

//get one project
router.get('/:id', authenticateUser, function (request, response) {
    Project.findOne({'id': request.params.id}, function (err, project) {
        if(!project || err) {
            handleError(response, "Failed to find project!", 404);
        }
        else {
            response.send(project);
        }
    });
});

//update project
router.put('/:id', authenticateUser, checkOwnership, function (request, response) {
    var projectToUpdate = new Project({
        id: request.body.id,
        name: request.body.name,
        description: request.body.description,
        author: request.body.author,
        startDate: request.body.startDate,
        createDate: request.body.createDate,
        modifiedDate: (new Date()).getTime(),
        settings : request.body.settings,
        milestones: request.body.milestones,
        tasks: request.body.tasks,
        attachments: request.body.attachments
    });
    Project.findOne({'id': request.params.id}, function (err, project) {
        Project.schema.eachPath(function(path) {
            if (path != '_id' && path != '__v' && path != 'id') {
                project[path] = projectToUpdate[path];
            }
        });
        project.save(function (err, savedProject) {
            if (err) {
                handleError(response, "Failed to create project!", 404);
            }
            else {
                response.send(savedProject);
            }
        });
    });
});

//delete project
router.delete('/:id', authenticateUser, checkOwnership, function (request, response) {
    Project.findOneAndRemove({'id': request.params.id}, function (err, project) {
        if (!project){
            handleError(response, "Failed to find project!", 404);
        }
        else if (err) {
            handleError(response, "Failed to delete project!", 404);
        }
        else {
            deleteOwnerShip(request.params.id);
            response.send('Deleted!');
        }
    });
});

module.exports = router;
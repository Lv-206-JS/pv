var express = require('express');
var Guid = require('guid');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;
var Ownerships  = require('../../mongoose').OwnershipsModel;

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return handleError(response, 'User is not authenticate!', 401);
    }
}

function checkOwnership(request, response, next) {
    Ownerships.findOne({'projectId': request.params.id, 'email': request.user.email}, function (err, ownerShip) {
        if(err) {
            return handleError(response, err.message, err.code);
        }
        else if(ownerShip != undefined) {
            if(ownerShip.role === 'creator' || ownerShip.role === 'editor') {
                next();
            }
            else {
                return response.send({access: 'Denied!'});
            }
        }
    });
}

function addOwnership(pid, email) {
    var ownerShipToCreate = new Ownerships({
        projectId: pid,
        email: email,
        role: 'creator'
    });
    ownerShipToCreate.save(function (err, ownerShip) {
        if (err) {
            return handleError(response, err.message, err.code);
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

    var name = request.body.name;
    var description = request.body.description;

    // //Validation
    request.checkBody('name', 'Project Name').notEmpty();
    request.checkBody('description', 'Project Description').notEmpty();

    var errors = request.validationErrors();

    if (errors.length) {
        return handleError(response, 'Fill in the fields!', 300);
    }

    var projectToCreate = new Project({
        id: Guid.create().value,
        name: request.body.name,
        description: request.body.description,
        author: request.user.firstname + ' ' + request.user.lastname,
        createDate: (new Date()).getTime(),
        modifiedDate: (new Date()).getTime()
    });
    addOwnership(projectToCreate.id, request.user.email);
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
        attachments: request.body.attachments,
        resources: request.body.resources
    });

    Project.findOne({'id': request.params.id}, function (err, project) {
        Project.schema.eachPath(function(path) {
            if (path != '_id' && path != '__v' && path != 'id') {
                if(path.indexOf('.') != -1) {
                    var pathes = path.split('.');
                    path = pathes[0];
                }
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
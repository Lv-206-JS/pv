var express = require('express');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;

//functions for working with
function getDate() {
    return new Date();
}

function increaseIdCounter () {
    var biggestId = 0;
    Project.findOne().sort('-id').exec(function (err, project) {
        biggestId = project.id;
    });
    return ++biggestId;
}

var projectProjection = {
    milestones: false,
    settings: false,
    tasks: false
};

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

//get all projects
router.get('/', function (request, response) {
    Project.find({}, projectProjection, function (err, projects) {
        if(!projects) {
            return handleError(response, "Failed to find project!", 404);
        }
        if(err){
            handleError(response, "Failed to find projects!", 404);
        }
        response.send(projects);
    });
});

//create project
router.post('/', function (request, response) {
    var projectToCreate = new Project({
        "id": increaseIdCounter(),
        "name": request.body.name,
        "description": request.body.description,
        "author": request.body.author,
        "startDate": request.body.startDate,
        "createDate": getDate(),
        "modifiedDate": getDate()
    });
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
router.get('/:id', function (request, response) {
    Project.findOne({'id': request.params.id}, projectProjection, function (err, project) {
        if(!project) {
            return handleError(response, "Failed to find project!", 404);
        }
        if (!err) {
            response.send(project);
        } else {
            handleError(response, "Failed to send project!");
        }
    });
});

//update project
router.put('/:id', function (request, response) {
    var newName = request.body.name,
        newDescription = request.body.description,
        newAuthor = request.body.author,
        newStartDate = request.body.startDate,
        newModifiedDate = getDate();
    if(!newName && !newDescription && !newAuthor && !newStartDate)
        return handleError(response, "empty body", "Failed to update because of empty body!", 404);
    else {
        Project.findOneAndUpdate({'id': request.params.id}, {
            $set: {
                name: newName, description: newDescription,
                author: newAuthor, startDate: newStartDate, modifiedDate: newModifiedDate
            }
        }, {new: true}, function (err, project) {
            if (!project) {
                return handleError(response, err, "Failed to find project!", 404);
            }
            if (!err) {
                response.send(project);
            }
        });
    }
});


//delete project
router.delete('/:id',function (request, response) {
    Project.findOneAndRemove({'id': request.params.id}, function (err, project) {
        if (project){
            response.send({ status: 'OK'});
        }
        else
            handleError(response, err, "Failed to delete project!",404);
    });
});

module.exports = router;

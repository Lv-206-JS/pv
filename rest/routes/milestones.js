'use strict';
var express = require('express');
var router = express.Router();
var Project  = require('../../mongoose').ProjectModel;


var projectProjection = {
    settings: false,
    tasks: false
};

//Error handler function
function handleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

//get all milestones
router.get('/:pid', function (request, response) {
    Project.find({'id': request.params.pid}, {'milestones': 1}, function (err, milestones) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }
        response.send({ status: 'OK', milestones:milestones});
    });
});

//get one milestone
router.get('/:pid/:name', function (request, response) {
    Project.find({'id': request.params.pid},{'milestones': 1},function (err, milestone) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }
        var singleMilestone;
        var len = milestone[0].milestones.length;
        for(var i = 0; i<len;i++) {
            if (milestone[0].milestones[i].name == request.params.name)
                 singleMilestone = milestone[0].milestones[i];
        }
        response.send({status: 'OK', singleMilestone: singleMilestone});
    });
});

//create milestone
router.post('/:pid', function (request, response) {
    var newMilestone = {
        "name": request.body.name,
        "date": request.body.date
    };
    Project.findOneAndUpdate({'id' : request.params.pid},{$push: {milestones: newMilestone}},
                {safe: true, new: true,upsert: true},
                function(err, project) {
                    if (err)
                    console.log(err);
                    response.send({status: 'OK', singleMilestone: newMilestone});
                }
            );
});

//update milestone
router.put('/:pid/:name', function (request, response) {
    var newName = request.body.name,
        newDate = request.body.date;
    console.log(newName);

    Project.find({'id': request.params.pid},{'milestones': 1},function (err, milestone) {
        if (!err) {
            var singleMilestone;
            var len = milestone[0].milestones.length;
            for (var i = 0; i < len; i++) {
                if (milestone[0].milestones[i].name == request.params.name)
                    singleMilestone = i;
            }
            milestone[0].milestones.splice(i,1);
        response.send({status: 'OK', singleMilestone: milestone});
        } else
            console.log(err);
    });
});

//delete milestone
router.delete('/:pid/:name',function (request, response) {
    Project.find({'id': request.params.pid},{'milestones': 1},function (err, milestone) {
        if(err){
            handleError(response, err, "Failed to find projects!");
        }
        var singleMilestone;
        var len = milestone[0].milestones.length;
        for(var i = 0; i<len;i++) {
            if (milestone[0].milestones[i].name == request.params.name)
                singleMilestone = i;
        }
        milestone[0].milestones.splice(singleMilestone,1);
                response.send({status: 'OK', singleMilestone: milestone});
    });
});


module.exports = router;

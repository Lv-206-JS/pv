var express = require('express');
var Guid = require('guid');
var router = express.Router();
var Attachment  = require('../../mongoose').FileAttachmentsModel;
var Ownerships  = require('../../mongoose').OwnershipsModel;
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

function authenticateUser(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect('users/login');
    }
}

function checkOwnership(request, response, next) {
    var projectReference = request.headers.referer,
        lastSlash = projectReference.lastIndexOf("/"),
        projectId = projectReference.slice(lastSlash+1);
    Ownerships.findOne({'projectId': projectId, 'email': request.user.email}, function (err, ownerShip) {
        if(err) {
            //error
        }
        else if(ownerShip != undefined && (ownerShip.role === 'creator' || ownerShip.role === 'editor')) {
            next();
        }
        else {
            response.send({access: 'Denied!'});
        }
    });
}

//create attachment
router.post('/', multipartMiddleware, authenticateUser, checkOwnership, function (request, response) {
    var pathToFile = request.files.file.path;
    var origName = request.files.file.originalFilename;
    var mimeType = request.files.file.headers['content-type'];
    var fileExt = '.' + origName.split('.').pop();
    var attachmentToCreate = new Attachment();
    fs.existsSync("attachments") || fs.mkdirSync("attachments");
    attachmentToCreate.attachmentId = Guid.create().value;
    attachmentToCreate.relativePath = 'attachments/' + attachmentToCreate.attachmentId + fileExt;
    var pathToSave = attachmentToCreate.relativePath;
    fs.readFile(pathToFile, function(err, file_buffer){
        fs.open(pathToSave, 'w', function(err, fd) {
            if (err) {
                throw 'error opening file: ' + err;
            }
            fs.write(fd, file_buffer, 0, file_buffer.length, null, function(err, data) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd);
            });
        });
    });
    attachmentToCreate.save(function (err, attachment) {
        if (err) {
            handleError(response, "Failed to create attachment!");
        }
        else {
            attachmentToCreate.relativePath = request.protocol + '://' + request.headers.host + '/' + attachmentToCreate.relativePath;
            response.send({
                attachmentId:attachment.attachmentId,
                fileName: origName,
                relativePath: attachment.relativePath,
                mimetype: mimeType
            });
        }
    });
});

//delete attachment
router.delete('/:id', authenticateUser, checkOwnership, function (request, response) {
    Attachment.findOneAndRemove({'attachmentId': request.params.id}, function (err, attachment) {
        if (!attachment){
            handleError(response, "Failed to find attachment!", 404);
        }
        else if (err) {
            handleError(response, "Failed to delete attachment!", 404);
        }
        else {
            fs.unlink(attachment.relativePath,function(err){
                if(err)
                    handleError(response, "Failed to delete attachment!", 404);
                else
                    response.send(attachment);
            });

        }
    });
});

module.exports = router;
var express = require('express');
var Guid = require('guid');
var mime = require('mime-types');
var router = express.Router();
var Attachment  = require('../../mongoose').FileAttachmentsModel;

//Error handler function
function handleError(response, message, code) {
    response.status(code || 500).json({"error": message});
}

//get all attachments
router.get('/:pid/attachments/', function (request, response) {
    Attachment.find({"relativePath": "attachments/" + request.params.pid + "/"}, function (err, attachments) {
        if(!attachments || err) {
            handleError(response, "Failed to find attachments!", 404);
        }
        else {
            response.send(attachments);
        }
    });
});

//create attachment
router.post('/:pid/attachments/', function (request, response) {
    var attachmentToCreate = new Attachment({
        attachmentId: Guid.create().value,
        fileName: request.body.fileName,
        relativePath: "attachments/" + request.params.pid + "/",
        mimeType: mime.lookup(request.body.fileName)
    });
    attachmentToCreate.save(function (err, attachment) {
        if (err) {
            handleError(response, "Failed to create attachment!");
        }
        else {
            response.send(attachment);
        }
    });
});

//get one attachment
router.get('/:pid/attachments/:id', function (request, response) {
    Attachment.findOne({'attachmentId': request.params.id}, function (err, attachment) {
        if(!attachment || err) {
            handleError(response, "Failed to find attachment!", 404);
        }
        else {
            response.send(attachment);
        }
    });
});

//delete attachment
router.delete('/:pid/attachments/:id',function (request, response) {
    Attachment.findOneAndRemove({'attachmentId': request.params.id}, function (err, attachment) {
        if (!attachment){
            handleError(response, "Failed to find attachment!", 404);
        }
        else if (err) {
            handleError(response, "Failed to delete attachment!", 404);
        }
        else {
            response.send('Deleted!');
        }
    });
});

module.exports = router;
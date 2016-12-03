define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var AttachmentsView = Backbone.View.extend({
        template: JST['project:attachments'],
        className: 'attachments-view show-content',


        initialize: function (options) {
            this.model = options.model;
            this.attachments = options.attachments;
        },

        render: function render() {
            this.$el.html(this.template({attachments: this.attachments}));
            return this;
        },

        events: {
            'click .ok-button' : 'hideAttachmentsView',
            'change #add-attachment-file' : 'addAttachment',
            'click #delete-attachment' : 'deleteAttachment'
        },

        updateModel: function (response, action, position) {
            var updatedAttachments = this.model.get('attachments');
            if(action == 'Add'){
                updatedAttachments.push(JSON.parse(response));
            }
            else {
                updatedAttachments.splice(position, 1);
            }
            this.model.set({attachments: updatedAttachments});
            this.model.save();
            this.model.whoChange = 'AttachmentsView';
        },

        addAttachment : function (event) {
            event.preventDefault();
            var uploadfile = new FormData();
            uploadfile.append('file', $("#add-attachment-file").prop('files')[0]);
            var response = $.ajax({
                url:  '/rest/attachments',
                type: 'POST',
                data: uploadfile,
                contentType: false,
                processData: false,
                async:false
            });
            this.updateModel(response.responseText, 'Add');
        },

        deleteAttachment: function (event) {
            event.preventDefault();
            var target = $(event.currentTarget);
            var attachmentId = target.data('id');
            var position = target.data('position');
            var response = $.ajax({
                url:  '/rest/attachments/' + attachmentId,
                type: 'DELETE',
                contentType: false,
                processData: false,
                async:false
            });
            this.updateModel(response.responseText, 'Delete', position);
        },

        hideAttachmentsView : function(event){
            event.preventDefault();
            this.$el.remove();
        }
    });

    return AttachmentsView;
});
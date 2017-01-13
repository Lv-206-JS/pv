define(['backbone',
    'underscore',
    'JST',
    '../common/confirmDelete'], function (Backbone, _, JST, ConfirmDeleteView) {
    'use strict';

    var AttachmentsView = Backbone.View.extend({
        template: JST['project:attachments'],
        className: 'attachments-view show-content',


        initialize: function (options) {
            this.model = options.model;
            this.attachments = options.attachments;
        },

        render: function render() {
            this.$el.html(this.template({attachments: this.model.get('attachments')}));
            return this;
        },

        events: {
            'click .ok-button' : 'hideAttachmentsView',
            'change #add-attachment-file' : 'addAttachmentByButton',
            'click #delete-attachment' : 'confirmDeleteAtt',
            'drop .tab-container': 'dragNDropAtt',
            'dragover .tab-container': 'overrideDragover'
        },

        saveModel: function (response, action, attachmentId) {
            var updatedAttachments = this.model.get('attachments');
            if(action == 'Add'){
                updatedAttachments.push(JSON.parse(response));
            }
            else {
                for (var i = 0, len = updatedAttachments.length; i < len; i++) {
                    if(updatedAttachments[i].attachmentId == attachmentId) {
                        updatedAttachments.splice(i, 1);
                        break;
                    }
                }
            }
            this.model.set({attachments: updatedAttachments});
            this.model.save({
                success:function () {
                    this.updateAttachmentsPopup();
                }.call(this),

                error:function () {
                    //error
                }
            });
        },

        addAttachmentByButton : function (event) {
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
            this.saveModel(response.responseText, 'Add');
        },

        addAttachmentByDrop: function (file) {
            var uploadfile = new FormData();
            uploadfile.append('file', file);
            var response = $.ajax({
                url:  '/rest/attachments',
                type: 'POST',
                data: uploadfile,
                contentType: false,
                processData: false,
                async:false
            });
            this.saveModel(response.responseText, 'Add');
        },

        dragNDropAtt: function (event) {
            event.preventDefault();
            var files = event.originalEvent.dataTransfer.files;

            $(files).each(function(index, file) {
                var filereader = new FileReader();
                filereader.readAsDataURL(file);

                filereader.onloadend = this.addAttachmentByDrop.bind(this, file);
            }.bind(this));
        },

        // override the dragover event, otherwise Firefox will just open the file on drop
        overrideDragover: function () {
            event.preventDefault();
        },

        confirmDeleteAtt: function onDeleteProject(e) {
            e.stopPropagation();
            ConfirmDeleteView(e, this, _.bind(this.deleteAttachment, this, e));
        },

        deleteAttachment: function (event) {
            event.preventDefault();
            var target = $(event.currentTarget);
            var attachmentId = target.data('id');
            var response = $.ajax({
                url:  '/rest/attachments/' + attachmentId,
                type: 'DELETE',
                contentType: false,
                processData: false,
                async:false
            });
            this.saveModel(response.responseText, 'Delete', attachmentId);
        },

        hideAttachmentsView : function(event){
            event.preventDefault();
            this.$el.remove();
        },

        updateAttachmentsPopup:function () {
            this.render();
        }
    });

    return AttachmentsView;
});
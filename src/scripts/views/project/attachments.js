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
            this.$el.html(this.template({attachments: this.model.get('attachments')}));
            return this;
        },

        events: {
            'click .ok-button' : 'hideAttachmentsView',
            'change #add-attachment-file' : 'addAttachment',
            'click #delete-attachment' : 'deleteAttachment'
        },

        saveModel: function (response, action, attachmentId) {
            var updatedAttachments = this.model.get('attachments');
            if(action == 'Add'){
                updatedAttachments.push(JSON.parse(response));
            }
            else {
                for (var i = 0, len = this.attachments.length; i < len; i++) {
                    if(this.attachments[i].attachmentId == attachmentId) {
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
                    console.log('error');
                }
            });
        },

        updateAttachmentsPopup:function () {
            this.render();
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
            this.saveModel(response.responseText, 'Add');
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
        }
    });

    return AttachmentsView;
});
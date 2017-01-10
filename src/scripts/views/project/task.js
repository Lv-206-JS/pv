define(['backbone',
    'underscore',
    'JST',
    'Draggabilly',
    'moment',
    '../common/confirmDelete'],
    function (Backbone, _, JST, Draggabilly, Moment, renderConfirmDeleteView) {
    'use strict';

    var TaskView = Backbone.View.extend({
        template: JST['project:task'],
        className: 'task-view show-content',

        initialize: function (options) {
            this.tasks = options.tasks;
            if(options.task) {
                this.task = options.task;
                this.delete = false;
            }
            else {
               this.task = {
                    name: "",
                    estimateTime: 3600,
                    resource: "",
                    description: "",
                    attachments:[],
                    dependsOn: []
                };
                this.delete = true;
            }
            this.resources = options.resources;
            if(options.model){
                this.model = options.model;
            }
            this.tasksList = this.getTasksList(true);
            this.dependenciesList = this.getTasksList(false);
            this.mimetypesList = this.getMimetypesList(this.task.attachments);
            this.moment = Moment;
        },

        render: function render() {
            this.$el.html(this.template({
                task: this.task,
                tasks: this.tasks,
                resources: this.resources,
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList,
                mimetypes: this.mimetypesList,
                moment: this.moment,
                deleteTask: this.delete
            }));
            return this;
        },

        events: {
            'click .tab-general' : 'taskGeneralInformation',
            'click .tab-dependencies' : 'taskDependenciesInformation',
            'click .tab-attachments' : 'taskAttachmentslInformation',
            'click .cancel-button' : 'hideTaskView',
            'click .ok-button' : 'onSubmitChanges',
            'click .delete-task' : 'confirmDelete',
            'change #add-attachment-file' : 'addAttachment',
            'click #delete-attachment' : 'deleteAttachment',
            'dblclick .task-item' : 'addTaskToList'
        },

        getTasksList: function(el){
            var isNotDependency = [];
            var isDependency = [];
            var len = this.task.dependsOn.length;
            for( var i = 0; i < this.tasks.length; i++) {
                var dependency = false;
                for( var j = 0; j < len; j++) {
                    if( this.tasks[i].taskId === this.task.dependsOn[j].taskId) {
                        dependency = true;
                        isDependency[isDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                    }
                }
                if ((this.tasks[i].taskId !== this.task.taskId)&&( !dependency)) {
                    isNotDependency[isNotDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                }
            }
            if(el) return isNotDependency;
            else return isDependency;
        },

        getMimetypesList: function(attachments){
            var srcMimetype = [];
            for(var i = 0; i < attachments.length; i++){
                var mimetype = attachments[i].mimetype;
                var copyMimetype = mimetype.slice(0, mimetype.indexOf('/'));
                switch(copyMimetype){
                    case 'application':
                        if(mimetype == 'application/pdf') {
                            copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                        }
                        else if(mimetype == 'application/msword'){
                            copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                        }
                        else if((mimetype == 'application/json') || (mimetype == 'application/javascript')){
                            copyMimetype = 'programming';
                        }
                        else {
                            copyMimetype = 'text';
                        }
                }
                srcMimetype[i] = '/images/mimetype_icons/' + copyMimetype + '.png';
            }
            return srcMimetype;
        },

        taskGeneralInformation: function(){
            this.makeTabVisible('.tab-general','.general-content');
            if(this.$el.find('.tab-dependencies').hasClass('w--current')) {
                this.makeTabUnvisible('.tab-dependencies','.dependencies-content');
            }
            if(this.$el.find('.tab-attachments').hasClass('w--current')){
                this.makeTabUnvisible('.tab-attachments','.attachments-content');
            }
        },

        taskDependenciesInformation: function(){
            this.makeTasksDraggable(this.tasksList, this.dependenciesList);
            this.makeTabVisible('.tab-dependencies','.dependencies-content');
            if(this.$el.find('.tab-general').hasClass('w--current')) {
                this.makeTabUnvisible('.tab-general','.general-content');
            }
            if(this.$el.find('.tab-attachments').hasClass('w--current')){
                this.makeTabUnvisible('.tab-attachments','.attachments-content');
            }
        },

        taskAttachmentslInformation: function(){
            this.makeTabVisible('.tab-attachments','.attachments-content');
            if(this.$el.find('.tab-dependencies').hasClass('w--current')) {
                this.makeTabUnvisible('.tab-dependencies','.dependencies-content');
            }
            if(this.$el.find('.tab-general').hasClass('w--current')){
                this.makeTabUnvisible('.tab-general','.general-content');
            }
        },

        makeTabUnvisible: function(tabName,tabContent){
            this.$el.find(tabName).removeClass('w--current');
            this.$el.find(tabContent).removeClass('show-content');
            this.$el.find(tabContent).addClass('hide-content');
        },

        makeTabVisible: function(tabName,tabContent){
            this.$el.find(tabName).addClass('w--current');
            this.$el.find(tabContent).removeClass('hide-content');
            this.$el.find(tabContent).addClass('show-content');
        },

        makeTasksDraggable: function(tasksList, dependenciesList) {
            var draggableElements = document.getElementsByClassName('task-item');
            var draggies = [];
            for (var i = 0; i < draggableElements.length; i++) {
                var draggableElem = draggableElements[i];
                draggies[i] = new Draggabilly(draggableElem, {
                    containment: '.tab-container'
                });
                draggies[i].on('dragEnd', onDragEnd);
                draggies[i].on('dragStart', onDragStart);
            }

            function onDragStart() {
                var newParent = $('.clone');
                $(this.element).css({'position':'absolute'});
                newParent.append(this.element);
                $(this.element).css({'top': this.relativeStartPosition.y-45+'px'});
                $(this.element).css({'left': this.relativeStartPosition.x-55+'px'});
                $(this.element).addClass('is-dragging');
            };

            function onDragEnd() {
                if (this.position.x >= 170) {
                    $("#dependencies-list tbody").append(this.element);
                    $(this.element).css({'position': 'relative'});
                    $(this.element).css({'left': '260'});

                }
                if (this.position.x < 170) {
                    $("#all-tasks-list tbody").append(this.element);
                    $(this.element).css({'position': 'relative'});
                    $(this.element).css({'left': '0'});
                }
                var trigger = false;
                for (i = 0; i < tasksList.length; i++)
                    if (tasksList[i].taskId === $(this.element).attr('id')) {
                        dependenciesList[dependenciesList.length] = tasksList[i];
                        tasksList.splice(i, 1);
                        trigger = true;
                        break;
                    }
                if (!trigger)
                    for (i = 0; i < dependenciesList.length; i++)
                        if (dependenciesList[i].taskId === $(this.element).attr('id')) {
                            tasksList[tasksList.length] = dependenciesList[i];
                            dependenciesList.splice(i, 1);
                        }
            };
        },

        addTaskToList: function(event){
            var element = $(event.currentTarget);
            var taskId = element.attr('id');
            var listName = element.parent().parent().attr('id');
            if(listName === 'all-tasks-list'){
                for(var i = 0; i < this.tasksList.length; i++)
                    if(this.tasksList[i].taskId === taskId){
                        this.dependenciesList.push(this.tasksList[i]);
                        this.tasksList.splice(i,1);
                        break;
                    }
                $("#dependencies-list tbody").append(element);
            }
            else{
                for(var i = 0; i < this.dependenciesList.length; i++)
                    if(this.dependenciesList[i].taskId === taskId){
                        this.tasksList.push(this.dependenciesList[i]);
                        this.dependenciesList.splice(i,1);
                        break;
                    }
                $("#all-tasks-list tbody").append(element);
            }
        },

        addAttachment: function (event) {
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
            this.task.attachments[this.task.attachments.length] = JSON.parse(response.responseText);
            this.addAttachmentItem(this.task.attachments.length-1);
        },

        deleteAttachment: function (event) {
            event.preventDefault();
            var target = $(event.currentTarget);
            var attachmentId = target.data('id');
            var attachmentNumber;
            for(var i = 0; i < this.task.attachments.length; i++){
                if( this.task.attachments[i].attachmentId === attachmentId)
                    attachmentNumber = i;
            }
            var response = $.ajax({
                url:  '/rest/attachments/' + attachmentId,
                type: 'DELETE',
                contentType: false,
                processData: false,
                async:false
            });
            this.task.attachments.splice(attachmentNumber,1);
            this.deleteAttachmentItem(attachmentId);
        },

        addAttachmentItem: function(i){
            var parent = document.getElementsByClassName("task-attachments");
            var str = this.task.attachments[i].fileName;
            var item = [];
            item[0] = this.task.attachments[i];
            var mimetype = this.getMimetypesList(item);
            if(this.task.attachments[i].fileName.length>9)  { str = this.task.attachments[i].fileName.substring(0,9)+'..';}
            $( parent ).append("<div class='attachment-item'>" +
                "<div id='delete-attachment' data-id="+this.task.attachments[i].attachmentId +
                "><img src='/images/cancel.svg' class='delete'  alt='delete attachment'/></div>"+
                "<a class='file-reference' download href="+this.task.attachments[i].relativePath+
                " target='_blank'><img src='"+mimetype[0]+"' class='attachment-image' alt='attachment image'/>"+
                "<div class='attachment-name' id='reference-name'>"+str+"</div></a></div>");
        },

        deleteAttachmentItem: function(id){
            var attachmentItems = $('.attachment-item');
            for ( var i = 0; i < attachmentItems.length; i++){
                var attachmentId = $(attachmentItems[i]).find('#delete-attachment').attr('data-id');
                if (attachmentId === id)
                    $(attachmentItems[i]).remove();
            }
        },

        deleteTask: function(event){
            for(var i = 0; i < this.tasks.length; i++){
                if(this.tasks[i].taskId === this.task.taskId) {
                    this.tasks.splice(i, 1);
                    break;
                }
            }
            for(var i = 0; i < this.tasks.length; i++){
                var dependencies = this.tasks[i].dependsOn;
                for(var j = 0; j < dependencies.length; j++){
                    if(dependencies[j].taskId === this.task.taskId)
                        dependencies.splice(j,1);
                }
                this.tasks[i].dependsOn = dependencies;
            }
            var milestones = this.model.get('milestones');
            for(var i = 0; i < milestones.length; i++){
                var dependencies = milestones[i].dependsOn;
                for(var j = 0; j < dependencies.length; j++){
                    if(dependencies[j].taskId === this.task.taskId)
                        dependencies.splice(j,1);
                }
                milestones[i].dependsOn = dependencies;
                if(milestones[i].dependsOn.length === 0)
                    milestones.splice(i,1);
            }
            this.model.set('milestones', milestones);
            this.trigger('deleteTask', this.tasks);
            this.$el.remove();
        },

        confirmDelete: function(event){
            renderConfirmDeleteView(event, this, this.deleteTask);
        },

        hideTaskView: function(event){
            event.preventDefault();
            this.$el.remove();
        },

        onSubmitChanges: function onSubmitChanges (event){
            event.preventDefault();
            this.task.name = this.$el.find('.task-name').val();
            var estimateTime = this.$el.find('.task-estimate').val();
            this.task.estimateTime = Moment.duration(+estimateTime, 'hours').asSeconds();
            this.task.resource = this.$el.find('.task-resource').val();
            this.task.description = this.$el.find('.task-description').val();
            this.task.dependsOn = [];
            if(this.dependenciesList[0] !== undefined) {
                for (var i = 0; i < this.dependenciesList.length; i++)
                    this.task.dependsOn[i] = {taskId: this.dependenciesList[i].taskId};
            }
            else{
                this.task.dependsOn = [];
            }
            this.trigger('upsertTask', this.tasks, this.task);

            this.$el.remove();
        }

    });

    return TaskView;
});


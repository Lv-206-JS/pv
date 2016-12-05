define(['backbone',
    'underscore',
    'JST',
    '../../../bower_components/draggabilly/dist/draggabilly.pkgd.js'],
    function (Backbone, _, JST, Draggabilly) {
    'use strict';

    var TaskView = Backbone.View.extend({
        template: JST['project:task'],
        className: 'task-view show-content',

        initialize: function (options) {
            this.tasks = options.tasks;
            console.log(this.tasks);
            if(options.task)
                this.task = options.task;
            else
            {console.log('task is not here');
                this.task = {
                    name: "",
                    estimateTime: "",
                    resource: "",
                    description: "",
                    attachments:[],
                    dependsOn: []
                }};
            console.log(this.task);
            this.tasksList = this.getTasksList(true);
            this.dependenciesList = this.getTasksList(false);
        },

        render: function render() {
            this.$el.html(this.template({
                task: this.task,
                tasks: this.tasks,
                tasksList: this.tasksList,
                dependenciesList: this.dependenciesList
            }));
            return this;
        },

        events: {
            'click .tab-general' : 'taskGeneralInformation',
            'click .tab-dependencies' : 'taskDependenciesInformation',
            'click .cancel-button' : 'hideTaskView',
            'click .ok-button' : 'onSubmitChanges',
            'change #add-attachment-file' : 'addAttachment',
            'click #delete-attachment' : 'deleteAttachment'
        },

        getTasksList: function(el){
            var isNotDependency = [];
            var isDependency = [];
            var len = this.task.dependsOn.length;
            for( var i = 0; i < this.tasks.length; i++) {
                for( var j = 0; j < len; j++) {
                    var dependency = false;
                    if( this.tasks[i].taskId === this.task.dependsOn[j].taskId) {
                        dependency = true;
                        isDependency[isDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                     }
                     if ((this.tasks[i].taskId !== this.task.taskId) && (!dependency)) {
                         isNotDependency[isNotDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                     }
                }
                if(len === 0)
                    isNotDependency[isNotDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
            }
            if(el) return isNotDependency;
            else return isDependency;
        },

        taskGeneralInformation: function(){
            this.$el.find('.tab-general').addClass('active');
            this.$el.find('.tab-dependencies').removeClass('active');
            this.$el.find('.dependencies-content').removeClass('show-content');
            this.$el.find('.dependencies-content').addClass('hide-content');
            this.$el.find('.general-content').removeClass('hide-content');
            this.$el.find('.general-content').addClass('show-content');
        },

        taskDependenciesInformation: function(){
            this.makeTasksDraggable(this.tasksList, this.dependenciesList);
            this.$el.find('.tab-dependencies').addClass('active');
            this.$el.find('.tab-general').removeClass('active');
            this.$el.find('.general-content').removeClass('show-content');
            this.$el.find('.general-content').addClass('hide-content');
            this.$el.find('.dependencies-content').removeClass('hide-content');
            this.$el.find('.dependencies-content').addClass('show-content');
        },

        makeTasksDraggable: function(tasksList, dependenciesList){
            var draggableElements = document.getElementsByClassName('task-item');
            var draggies = [];
            for (var i = 0; i < draggableElements.length; i++){
                var draggableElem = draggableElements[i];
                draggies[i] = new Draggabilly(draggableElem);
                draggies[i].on('dragEnd',onDragEnd);
            }

            function onDragEnd() {
                if(this.position.x>260){
                    var parent = document.getElementById("list2");
                    parent.appendChild(this.element);
                }
                if(this.position.x<180){
                    var parent = document.getElementById("list");
                    parent.appendChild(this.element);
                }
                $(this.element).css({'left': '0','top':'0'});
                var trigger = false;
                for(var i = 0; i < tasksList.length; i++)
                    if(tasksList[i].taskId === $(this.element).attr('id')) {
                        dependenciesList[dependenciesList.length] = tasksList[i];
                        tasksList.splice(i,1);
                        trigger=true;
                    }
                if(!trigger)
                    for(var i = 0; i < dependenciesList.length; i++)
                        if(dependenciesList[i].taskId === $(this.element).attr('id')) {
                            tasksList[tasksList.length] = dependenciesList[i];
                            dependenciesList.splice(i,1);
                        }
            };
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
            this.render();
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
            this.render();
        },

        hideTaskView: function(event){
            event.preventDefault();
            this.$el.remove();
        },

        onSubmitChanges: function onSubmitChanges (){
            this.task.name = this.$el.find('.task-name').val();
            this.task.estimateTime = this.$el.find('.task-estimate').val();
            this.task.resource = this.$el.find('.task-resource').val();
            this.task.description = this.$el.find('.task-description').val();
            if(this.dependenciesList[0] !== undefined) {
                for (var i = 0; i < this.dependenciesList.length; i++)
                    this.task.dependsOn[i] = {taskId: this.dependenciesList[i].taskId};
            }
            else{
                this.task.dependsOn = false;
            }
            this.trigger('upsertTask', this.tasks, this.task);
            event.preventDefault();
            this.$el.remove();
        }

    });

    return TaskView;
});


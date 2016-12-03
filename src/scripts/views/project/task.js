define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var TaskView = Backbone.View.extend({
        template: JST['project:task'],
        className: 'task-view show-content',

        initialize: function (options) {
            this.tasks = options.tasks;
            if(options.task)
                this.task = options.task;
            else
                this.task = {
                    name: "",
                    estimateTime: "",
                    resource: "",
                    description: "",
                    attachments:[],
                    dependsOn: []
                };
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
            'click .task-item' : 'dragTaskItem',
            // 'click .not-dependency-item' : 'selectElement'
        },

        getTasksList : function(el){
            var isNotDependency=[];
            var isDependency=[];
            var len = this.task.dependsOn.length;
            for( var i=0; i<this.tasks.length; i++) {
                for( var j=0; j<len; j++) {
                    var dependency = false;
                    if( this.tasks[i].taskId === this.task.dependsOn[j].taskId) {
                        dependency = true;
                        isDependency[isDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                     }
                     if ((this.tasks[i].taskId!==this.task.taskId)&&(!dependency)) {
                         isNotDependency[isNotDependency.length] = { name : this.tasks[i].name, taskId : this.tasks[i].taskId};
                     }
                }
                if(len===0)
                    isNotDependency[isNotDependency.length]={ name : this.tasks[i].name, taskId : this.tasks[i].taskId};
            }
            if(el) return isNotDependency;
            else return isDependency;
        },

        taskGeneralInformation : function(){
            this.$el.find('.tab-general').addClass('active');
            this.$el.find('.tab-dependencies').removeClass('active');
            this.$el.find('.dependencies-content').removeClass('show-content');
            this.$el.find('.dependencies-content').addClass('hide-content');
            this.$el.find('.general-content').removeClass('hide-content');
            this.$el.find('.general-content').addClass('show-content');
        },

        taskDependenciesInformation : function(){
            this.$el.find('.tab-dependencies').addClass('active');
            this.$el.find('.tab-general').removeClass('active');
            this.$el.find('.general-content').removeClass('show-content');
            this.$el.find('.general-content').addClass('hide-content');
            this.$el.find('.dependencies-content').removeClass('hide-content');
            this.$el.find('.dependencies-content').addClass('show-content');
        },

        dragTaskItem : function(){
            console.log("draggabilly");
            var $draggable = $(".task-item").draggabilly({
                containment: '.dependencies-content'
            });



        },

        // selectElement : function(){
        //    if( $(event.target).hasClass('selected'))
        //        $(event.target).removeClass('selected');
        //    else
        //        $(event.target).addClass('selected');
        // },

        hideTaskView : function(event){
            event.preventDefault();
            this.$el.remove();
        },

        // makeTasksDraggable : function(){
        //     $(".task-item").draggable();
        // },
        //
        //     $(function() {
        //             $( ".task-item" ).draggable({
        //                 revert: false,
        //                 stack: "pageItem",
        //                 helper: 'clone',
        //                 start:  function() { $(this).toggle(); },
        //                 stop:   function() { $(this).toggle(); }
        //
        //             });
        //
        //             $( "#list" ).droppable({
        //                 drop: function( event, ui ) {
        //                     $( this )
        //                     $(ui.draggable).appendTo($(this));
        //                     // $( ui.draggable ).resizable();
        //
        //                 }
        //             });
        //
        // })},

        onSubmitChanges : function onSubmitChanges (){

            var newName = this.$el.find('.task-name').val();
            this.task.name = newName;
            var newEstimate = this.$el.find('.task-estimate').val();
            this.task.estimateTime = newEstimate;
            var newResource = this.$el.find('.task-resource').val();
            this.task.resource = newResource;
            var newDescription = this.$el.find('.task-description').val();
            this.task.description = newDescription;

            this.trigger('upsertTask', this.task, this.model);

            event.preventDefault();
            this.$el.remove();
        }
    });


    return TaskView;
});
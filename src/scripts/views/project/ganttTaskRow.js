define([
        'backbone',
        'underscore',
        'JST',
        'Snap'
    ],
    function (Backbone, _, JST, Snap) {
        'use strict';

        var GanttTaskRowView = Backbone.View.extend({
            template: JST['project:ganttTaskRow'],
            className: 'table-row gantt-task-row ',
            tagName: 'div',

            initialize: function (options) {
                this.tasks = options.tasks;
                this.positionX = options.task.positionX;
                this.width = options.task.width;
                this.id = options.task.taskId;
                this.task = this.findTaskById(this.id);
            },

            render: function () {
                this.$el.html(this.template({
                    id: this.id, positionX: this.positionX, width: this.width
                }));
                this.drawTaskRow(this.id, this.positionX, this.width);
                return this;
            },

            drawTaskRow: function(id, positionX, width) {
                $(document).ready(function(){
                    var paper = Snap("#t"+id);
                    // rectangle with rounded corners
                    var rect = paper.rect(positionX, 10.5, width, 18, 2, 2).attr({
                        fill: "#28b463"
                    });

                    //set Gantt Chart min-width
                    var w = positionX + width;
                    $("#gantt-chart").css("min-width", w);
                });
            },

            findTaskById: function (id) {
                var task = null;
                for (var i = 0; !task && i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId == id) {
                        task = this.tasks[i];
                        return task;
                    }
                }
            }

        });

        return GanttTaskRowView;
    });
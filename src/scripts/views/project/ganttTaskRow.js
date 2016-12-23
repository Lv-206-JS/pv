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
                this.task = this.findTaskById(this.tasks, this.id);
            },

            render: function () {
                this.$el.html(this.template({
                    id: this.id, positionX: this.positionX, width: this.width
                }));
                this.drawTaskRow(this.id, this.task, this.positionX, this.width);
                return this;
            },

            drawTaskRow: function(id, task, positionX, width) {
                $(document).ready(function(){
                    var taskName = (task.name) ? task.name : null;

                    //get svg from the template
                    var paper = Snap("#t"+id);

                    // rectangle with rounded corners
                    var rect = paper.rect(positionX, 7.5, width, 25, 2, 2).attr({
                        fill: "#28b463"
                    });

                    if (task.name) {
                        //text start
                        var text = paper.text(positionX + 10, 20, taskName);
                        //text center
                        // var text = paper.text(positionX+width/2, 20, taskName);
                        text.attr({
                            fill: "#fff",
                            'font-size': 14,
                            //'text-anchor':"middle",
                            "alignment-baseline": "middle"
                        });
                    }
                    var g = paper.g(rect, text);
                    //set Gantt Chart min-width
                    var w = positionX + width;
                    $("#gantt-chart").css("min-width", w);
                });
            },

            findTaskById: function (tasks, id) {
                var task = null;
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].taskId == id) {
                        task = tasks[i];
                        return task;
                    }
                }
            }


        });

        return GanttTaskRowView;
    });
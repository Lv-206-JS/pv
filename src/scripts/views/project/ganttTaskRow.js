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
                    var rowWidth = 40,
                        rectWidth = rowWidth * 0.6,
                        borderRadius = 2;

                    var taskName = (task.name) ? task.name : null;
                    //get svg from the template
                    var paper = Snap("#task"+id);
                    // task rectangle
                    var rect = paper.rect(positionX, (rowWidth-rectWidth)/2, width, rectWidth, borderRadius, borderRadius);
                    rect.attr({
                        fill: "#28b463"
                    });
                    // show task name
                    if (taskName) {
                        //text left
                        var text = paper.text(positionX + 10, rowWidth/2, taskName);
                        //text center
                        // var text = paper.text(positionX+width/2, 20, taskName);
                        text.attr({
                            fill: '#fff',
                            'font-size': 14,
                            // text center
                            //'text-anchor': "middle",
                            'alignment-baseline': 'middle'
                        });
                        // TODO check for the zoom value ?
                        // check if to place task name in the rect
                        var textW = parseInt($('#t'+id+' text').css('width'), 10);
                        var rectW = parseInt(width, 10);
                        if(textW > rectW) {
                            text.attr({
                                'visibility': 'hidden'
                            });
                        }
                        //group elements
                        var g = paper.g(rect, text);
                    }
                    //set min-width of gantt chart div
                    var ganttMinWidth = positionX + width;
                    $("#gantt-chart").css('min-width', ganttMinWidth);
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
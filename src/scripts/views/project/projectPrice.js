define(['backbone',
        'underscore',
        'JST',
        'moment',
        'timeLine'],
    function (Backbone, _, JST, Moment, TimeLineLib) {
        'use strict';

        var ProjectPriceView = Backbone.View.extend({
            template: JST['project:price'],
            className: 'project-price-view show-content',

            initialize: function (options) {
                this.model = options.model;
                this.resources = this.model.get('resources');
                this.startDate = this.model.get('startDate');
                this.tasks = this.model.get('tasks');
                this.price = this.calculatePrice();
                this.duration = this.calculateDuration();
            },

            render: function render() {
                this.$el.html(this.template({
                    price: this.price,
                    duration: this.duration
                }));
                return this;
            },

            events: {
                'click .ok-button' : 'onSubmitChanges'
            },

            calculatePrice: function(){
                var price = 0;
                for(var i = 0; i < this.resources.length; i++)
                {
                    if(this.resources[i].type === 'worker'){
                        var maxDate = 0;
                        for(var j = 0; j < this.tasks.length; j++){
                            var taskEnd = Number(this.tasks[j].startDate) + Number(this.tasks[j].estimateTime);
                            if((this.resources[i].resourceName === this.tasks[j].resource)
                                && (this.tasks[j].resource !== 'default')
                                && (maxDate < taskEnd)) {
                                maxDate = Number(taskEnd);
                            }
                        }

                        var workingHours = Moment.duration(+maxDate, 'seconds').asHours();
                        price += this.resources[i].rate * workingHours;
                    }
                    if((this.resources[i].type === 'machine') || (this.resources[i].type === 'freelancer')){
                        var workingTime = 0;
                        for( var j = 0; j < this.tasks.length; j++){
                            if((this.resources[i].resourceName === this.tasks[j].resource)
                                && (this.tasks[j].resource !== 'default')){
                                workingTime += this.tasks[j].estimateTime;
                            }
                        }
                        var workingHours = Moment.duration(+workingTime, 'seconds').asHours();
                        price += this.resources[i].rate * workingHours;
                    }
                }
                return price;
            },

            calculateDuration: function(){
                var timeLine = new TimeLineLib(this.model);
                var projectEnd = 0;
                for(var i = 0; i < this.tasks.length; i++){
                    var taskEnd = Number(this.tasks[i].startDate) + Number(this.tasks[i].estimateTime);
                    if(projectEnd < taskEnd)
                        projectEnd = Number(taskEnd);
                }
                var projectRealEnd = timeLine.toDate(projectEnd);
                var projectDuration = (projectRealEnd - this.startDate)/3600;
                var result = '';
                var days = projectDuration / 24;
                if(days >= 365 ){
                    result += (days - (days % 365)) / 365 +' year ';
                    days = days % 365;
                }
                if(days >= 31){
                    var month = (days - (days % 31)) / 31;
                    result += month;
                    if(month > 1) result +=' months ';
                    else result += ' month ';
                    days = days % 31;
                }
                if((days >= 7) && (days < 31)){
                    var week = (days - (days % 7)) / 7;
                    result += week;
                    if(week > 1) result += ' weeks ';
                    else result += ' week ';
                    days = days % 7;
                }
                if((days >= 1) && (days < 7)){
                    var day = (days - (days % 1)) / 1;
                    result += day;
                    if(week > 1) result += ' days ';
                    else result += ' day ';
                    var hour = Math.ceil((days % 1) * 24);
                    result += hour;
                    if(hour > 1) result += ' hours ';
                    else result += ' hour ';

                }

                // var days = Math.ceil(Moment.duration(projectRealEnd-this.startDate,'seconds').asDays());

                return result;
            },

            onSubmitChanges: function onSubmitChanges (event){
                event.preventDefault();
                this.$el.remove();
            }

        });

        return ProjectPriceView;
    });


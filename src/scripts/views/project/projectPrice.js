define(['backbone',
        'underscore',
        'JST',
        'moment'],
    function (Backbone, _, JST,Moment) {
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
            },

            render: function render() {
                this.$el.html(this.template({
                    price: this.price
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
                    if(this.resources[i].type === 'human'){
                        var maxDate = 0;
                        for(var j = 0; j < this.tasks.length; j++){
                            var taskEnd = Number(this.tasks[j].startDate) + Number(this.tasks[j].estimateTime);
                            if((this.resources[i].resourceName === this.tasks[j].resource)
                                && (this.tasks[j].resource !== 'default')
                                && (maxDate < taskEnd)) {
                                console.log('taskEnd');
                                console.log(taskEnd);
                                maxDate = Number(taskEnd);
                            }
                        }
                        console.log('maxDate');
                        console.log(maxDate);
                        var workingHours = Moment.duration(+maxDate, 'seconds').asHours();
                        console.log('workingHours');
                        console.log(workingHours);
                        price += this.resources[i].rate * workingHours;
                    }
                    if(this.resources[i].type === 'machine'){
                        var workingTime = 0;
                        for( var j = 0; j < this.tasks.length; j++){
                            if((this.resources[i].resourceName === this.tasks[j].resource)
                                && (this.tasks[j].resource !== 'default')){
                                workingTime += this.tasks[j].estimateTime;
                            }
                        }
                        console.log('workingTime');
                        console.log(workingTime);
                        var workingHours = Moment.duration(+workingTime, 'seconds').asHours();
                        price += this.resources[i].rate * workingHours;
                    }
                    console.log(price);
                }
                return price;
            },

            onSubmitChanges: function onSubmitChanges (event){
                event.preventDefault();
                this.$el.remove();
            }

        });

        return ProjectPriceView;
    });


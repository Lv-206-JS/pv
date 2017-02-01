define(['backbone',
        'underscore',
        'JST',
        'moment',
        'timeLine',
        '../modalView'
    ],
    function (Backbone, _, JST, Moment, TimeLineLib, ModalView) {
        'use strict';

        var ProjectPriceView = ModalView.extend({
            template: JST['project:price'],
            className: 'project-price-view show-content',

            initialize: function (options) {
                this.model = options.model;
                this.resources = this.model.get('resources');
                this.startDate = this.model.get('startDate');
                this.tasks = this.model.get('tasks');
                this.price = this.calculatePrice();
                this.duration = this.calculateDuration();
                this.showModalView();
                this.bindMousetrap();
            },

            render: function render() {
                this.$el.html(this.template({
                    price: this.price,
                    resources: this.resources,
                    duration: this.duration
                }));
                return this;
            },

            events: {
                'click .ok-button' : 'onSubmitChanges',
                'click .details-label' : 'showPriceDetails'
            },

            calculatePrice: function(){
                var price = 0;
                var resourcesPrice = [];
                for(var i = 0; i < this.resources.length; i++)
                {
                    if(this.resources[i].type === 'worker'){
                        var maxDate = 0;
                        for(var j = 0; j < this.tasks.length; j++){
                            var taskEnd = Number(this.tasks[j].startDate) + Number(this.tasks[j].estimateTime);
                            if((this.resources[i].resourceId === this.tasks[j].resource)
                                && (maxDate < taskEnd)) {
                                maxDate = Number(taskEnd);
                            }
                        }

                        var workingHours = Moment.duration(+maxDate, 'seconds').asHours();
                        var resourcePrice = this.resources[i].rate * workingHours;
                        price += resourcePrice;
                        resourcesPrice[i] = resourcePrice;
                    }
                    if((this.resources[i].type === 'machine') || (this.resources[i].type === 'freelancer')){
                        var workingTime = 0;
                        for( var j = 0; j < this.tasks.length; j++){
                            if((this.resources[i].resourceId === this.tasks[j].resource)
                                && (this.tasks[j].resource !== 'default')){
                                workingTime += this.tasks[j].estimateTime;
                            }
                        }
                        var workingHours = Moment.duration(+workingTime, 'seconds').asHours();
                        var resourcePrice = this.resources[i].rate * workingHours;
                        price += resourcePrice;
                        resourcesPrice[i] = resourcePrice;
                    }
                }
                var totalPrice = {'price': price, 'resourcesPrice': resourcesPrice};
                return totalPrice;
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
                return result;
            },

            showPriceDetails: function()
            {
                if(this.$el.find('.resources-prices').hasClass('hide-content')){
                    this.$el.find('.resources-prices').addClass('show-content');
                    this.$el.find('.resources-prices').removeClass('hide-content');
                    this.$el.find('.details-label').removeClass('show-prices');
                    this.$el.find('.details-label').addClass('hide-prices');
                    return;
                }
                if(this.$el.find('.resources-prices').hasClass('show-content')){
                    this.$el.find('.resources-prices').addClass('hide-content');
                    this.$el.find('.resources-prices').removeClass('show-content');
                    this.$el.find('.details-label').removeClass('hide-prices');
                    this.$el.find('.details-label').addClass('show-prices');
                    return;
                }
            },

            onSubmitChanges: function onSubmitChanges (event){
                this.hideModalView();
            }

        });

        return ProjectPriceView;
    });


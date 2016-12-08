define(['backbone', 'underscore', 'JST'], function (Backbone, _, JST) {
    'use strict';

    var SettingsView = Backbone.View.extend({
        template: JST['project:settings'],
        className: 'settings-view show-content',

        events: {
            'click .ok-button' : 'saveSettings',
            'click .cancel-button' : 'cancelSettings'
            //'change #add-attachment-file' : 'addAttachment',
            //'click #delete-attachment' : 'deleteAttachment'
        },

        initialize: function (options) {
            this.model = options.model;
            this.settings = options.settings;
        },


        render: function render() {
            this.$el.html(this.template({model: this.model.attributes,  settings: this.settings}));
            return this;
        },

        saveSettings: function saveSettings () {
            var newName = this.$el.find('.name').val();
            this.model.set({name: newName});
            var newAuthor = this.$el.find('.author').val();
            this.model.set({author: newAuthor});
            if (this.$el.find('.description').val() != undefined) {
                var newDescription = this.$el.find('.description').val();
                this.model.set({description: newDescription});
            } else {
                this.model.set({description: null});
            }
            var newStartDate = this.$el.find('.start-date').val();
            this.model.set({startDate: newStartDate});
            var newCreateDate = this.$el.find('.create-date').val();
            this.model.set({createDate: newCreateDate});
            var newModifiedDate = this.$el.find('.modified-date').val();
            this.model.set({modifiedDate: newModifiedDate});
            // var newDayStart = this.$el.find('.day-start').val();
            // this.settings.dayStart = newDayStart;

            var weekCollection =  $('.weekend');
            var days = [];
            for (var i = 0; i < weekCollection.length; i++){
                if(weekCollection[i].checked == true){
                    days[i] = weekCollection[i].value;
                }
            };

            var projSetting = {
                weekend: days,
                dayDuration: this.$el.find('.day-duration').val()
            };

            this.model.set('settings', projSetting);
            this.model.save(
                {
                    success: function (model, response) {
                        console.log("success");
                    },
                    error: function (model, response) {
                        console.log("error");
                    }
                });

            event.preventDefault();
            this.$el.remove();
        },

        cancelSettings : function cancelSettings (event){
            event.preventDefault();
            this.$el.remove();
        },

        // formatDate: function formatDate(date){
        //     var formattedDate = new Date(date);
        //         console.log(formattedDate);
        //     var d = formattedDate.getDate();
        //     var m = formattedDate.getMonth();
        //     //m += 1;  // JavaScript months are 0-11
        //     var y = formattedDate.getYear();
        //     var newDate = new Date(y, m, d);
        //     console.log(newDate);
        //     return newDate;
        //
        // }



    });
    return SettingsView;
});
//TODO Implement week:days saving to db
//TODO Date parsing to show in input type=date value field
//TODO Add function getCurrentDate to save into modifiedDate
//TODO Further: add validation
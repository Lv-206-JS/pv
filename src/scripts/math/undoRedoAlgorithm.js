define(['backbone'], function (Backbone) {
    'use strict';

    function UndoRedoAlgorithm(model){
        this.history = [];
        this.iterator = 0;
    }

    UndoRedoAlgorithm.prototype = {
        constructor: UndoRedoAlgorithm,
        save: function(model){
            this.history.splice(this.iterator);
            var copiedObject = jQuery.extend(true, {}, model);
            this.history[this.history.length] = copiedObject;
            this.iterator++;
            if (this.history.length > 1){
                $('#undo').removeClass('hide-button');
                this.hideButton('#redo');
                if(this.history.length === 50)
                    this.rewriteHistory();
            }
        },

        undo: function(){
            if(this.iterator > 1)
                --this.iterator;
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            this.hideButton('#undo');
            this.showButton('#redo');
            return copiedObject;
        },

        redo: function(){
            if(this.iterator < this.history.length)
                ++this.iterator;
            this.showButton('#undo');
            this.hideButton('#redo');
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            return copiedObject;
        },

        hideButton: function(buttonId){
            if(buttonId === '#undo'){
                if( this.iterator == 1){
                    $('#undo').addClass('hide-button');
                }
            }
            else if(buttonId === '#redo'){
                if( this.iterator == this.history.length){
                    $('#redo').addClass('hide-button');
                }
            }
        },

        showButton: function(buttonId){
            if(buttonId === '#undo'){
                if( this.iterator > 1){
                    $('#undo').removeClass('hide-button');
                }
            }
            else if(buttonId === '#redo'){
                if( this.iterator != this.history.length){
                    $('#redo').removeClass('hide-button');
                }
            }
        },

        rewriteHistory: function(){
            var newHistory = [];
            for (var i = 0; i < 25; i++){
                newHistory[i] = this.history[i+25];
            }
            this.history.splice(0);
            this.history = newHistory;
            this.iterator = 25;
        }

    };

    return UndoRedoAlgorithm;
});

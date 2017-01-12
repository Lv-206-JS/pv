define(['jquery', 'underscore'], function (jQuery, _) {
    'use strict';

    function UndoRedoAlgorithm(){
        this.history = [];
        this.iterator = 0;
    }

    UndoRedoAlgorithm.prototype = {
        constructor: UndoRedoAlgorithm,
        save: function(model){
            this.history.splice(this.iterator);
            var copiedObject = jQuery.extend(true, {}, model);
            console.log(copiedObject);
            this.history[this.history.length] = copiedObject;
            this.iterator++;
            if(this.history.length === 50) {
                this.rewriteHistory();
                this.iterator--;
            }
        },

        undo: function(){
            if(this.iterator > 1)
                this.iterator = this.iterator - 1;
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            return copiedObject;
        },

        redo: function(){
            if(this.iterator < this.history.length)
                this.iterator = this.iterator + 1;
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            return copiedObject;

        },

        rewriteHistory: function(){
            var newHistory = [];
            for (var i = 0; i < 49; i++){
                newHistory[i] = this.history[i+1];
            }
            this.history.splice(0);
            this.history = newHistory;
        }
    };

    return UndoRedoAlgorithm;
});

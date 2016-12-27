define(['backbone'], function (Backbone) {
    'use strict';

    function UndoRedoAlgorithm(model){
        this.history = [];
        this.iterator = 0;
    }

    UndoRedoAlgorithm.prototype = {
        constructor: UndoRedoAlgorithm,
        save: function(model){
            this.history.splice(this.iterator+1);
            this.history.push(model);
            this.iterator++;
        },
        undo: function(){
            if(this.iterator > 0)
                this.iterator--;
            return this.history[this.iterator];
        },
        redo: function(){
            if(this.iterator < this.history.length-1)
                this.iterator++;
            return this.history[this.iterator];
        }
    };

    return UndoRedoAlgorithm;
});

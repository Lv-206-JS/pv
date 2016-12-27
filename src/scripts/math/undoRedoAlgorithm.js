define(['backbone'], function (Backbone) {
    'use strict';

    function UndoRedoAlgorithm(model){
        this.history = [model];
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
        },
        redo: function(){
            if(this.iterator < this.history.length-1)
                this.iterator++;
        }
    };

    return UndoRedoAlgorithm;
});

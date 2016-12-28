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
        },
        undo: function(){
            if(this.iterator > 1)//here and everywhere I need somth like this.iterator > 1 && this.iterator < this.history.length
                --this.iterator;
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            return copiedObject;
        },
        redo: function(){
            if(this.iterator < this.history.length)
                ++this.iterator;
            var copiedObject = jQuery.extend(true, {}, this.history[this.iterator-1]);
            return copiedObject;
        }
    };

    return UndoRedoAlgorithm;
});

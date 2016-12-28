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
            console.log
            ()
            var copiedObject = jQuery.extend(true, {}, model);
            this.history.push(copiedObject);

            this.iterator++;
            console.log('save');
            console.log(this.iterator);
        },
        undo: function(){
            if(this.iterator > 1)//here and everywhere I need somth like this.iterator > 1 && this.iterator < this.history.length
                --this.iterator;
            console.log('undo');
            console.log(this.iterator);
            return this.history[this.iterator-1];
        },
        redo: function(){
            if(this.iterator <= this.history.length)
                ++this.iterator;
            console.log('redo');
            console.log(this.iterator);
            return this.history[this.iterator-1];
        }
    };

    return UndoRedoAlgorithm;
});

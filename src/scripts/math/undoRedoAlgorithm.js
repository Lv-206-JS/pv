define(['jquery', 'underscore'], function ($, _) {
    'use strict';

    function UndoRedoAlgorithm(){
        this.history = [];
        this.iterator = 0;
    }

    _.deepClone = function(obj) {
        if (!obj || (typeof obj !== 'object')){
            return obj;
        }
        if(_.isString(obj)){
            return obj + '';
        }
        if (_.isDate(obj)){
            return new Date(obj.valueOf());
        }
        if(_.isArray(obj)){
            var newArr = [];
            for (var i = 0; i < obj.length; i++) {
                var obj1 = obj[i];
                newArr[i] = _.deepClone(obj1);
            }
            return newArr;
        }
        if(_.isObject(obj)){
            var newObj = {};
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                var objKey = keys[i];
                newObj[objKey] = _.deepClone(obj[objKey]);
            }
            return newObj;
        }
    };

    UndoRedoAlgorithm.prototype = {
        constructor: UndoRedoAlgorithm,
        save: function(model){
            this.cutHistory(this.iterator);
            var copiedObject = _.deepClone(model);
            this.history[this.history.length] = copiedObject;
            this.iterator++;
            if(this.history.length === 50) {
                this.rewriteHistory();
                this.iterator--;
            }
        },

        cutHistory: function(number){
            this.history.splice(number);
        },

        undo: function(){
            if(this.iterator > 1)
                this.iterator--;
            var copiedObject = _.deepClone(this.history[this.iterator-1]);
            return copiedObject;
        },

        redo: function(){
            if(this.iterator < this.history.length)
                this.iterator++;
            var copiedObject = _.deepClone(this.history[this.iterator-1]);
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

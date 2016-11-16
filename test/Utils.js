window.PV = window.PV || {};
window.PV.TestUtils = (function () {
    'use strict';

    return {
        httpUrlRegExp: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/,

        exclusion: function exclusion(s1, s2) {
            var res = [].concat(s1);
            for (var i = 0; i < s2.length; i++) {
                var index = res.indexOf(s2[i]);
                if (index !== -1) {
                    res.splice(index, 1);
                }
            }

            return res;
        }
    };
})();
describe(' Login form ', function(){
    'use strict';
    var loginURL = 'http://localhost:9090/users/login';

    it('should authorize user', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            expect(xhr.status).toBe(200);
            // expect(xhr.)
            done();
        }
        var loginForm = new FormData();

        var loginData = {
            name:'Antion'
        }

        xhr.open('GET', loginURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send(JSON.stringify(loginData));
    });

    it('should not authorize user', function (done) {
        var xhr = new XMLHttpRequest();

        function fail(res) {

            expect(true).toBeFalsy();
            done();
        }

        function success() {
            expect(xhr.status).toBe(200);

            var response = JSON.parse(xhr.response);
            expect(response.errors).notEmpty();
            done();
        }
        var loginForm = new FormData();

        var loginData = {
            name:'Antion'
        }

        xhr.open('POST', loginURL, true);

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send(JSON.stringify(loginData));
    });


});
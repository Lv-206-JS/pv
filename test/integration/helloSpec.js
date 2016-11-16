describe('Hello Resources', function () {
    'use strict';

    var helloResourceURL = 'http://localhost:9090/rest/hello';

    it('should be available', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            expect(xhr.status).toBe(200);
            done();
        }

        xhr.open('GET', helloResourceURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return valid JSON', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var contentType = xhr.getResponseHeader('Content-Type'),
                json = xhr.responseText,
                obj;
            function parseJson() {
                obj = JSON.parse(json);
            }

            expect(contentType).toBe('application/json; charset=utf-8');
            expect(parseJson).not.toThrow();
            expect(obj).toBeDefined();

            done();
        }

        xhr.open('GET', helloResourceURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return "hello" model with all required properties', function (done) {
        var xhr = new XMLHttpRequest(),
            expectedKeys = ['hello', 'world', 'number', 'url'];

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var json = xhr.responseText,
                obj = JSON.parse(json),
                helloKeys = Object.keys(obj);
            expect(PV.TestUtils.exclusion(expectedKeys, helloKeys)).toEqual([]);
            expect(PV.TestUtils.exclusion(helloKeys, expectedKeys)).toEqual([]);

            done();
        }

        xhr.open('GET', helloResourceURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return "hello" model with valid properties', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var json = xhr.responseText,
                obj = JSON.parse(json);
            expect(obj.hello).toEqual(jasmine.any(String));
            expect(obj.world).toEqual(jasmine.any(String));
            expect(obj.number).toEqual(jasmine.any(Number));
            expect(obj.url).toMatch(PV.TestUtils.httpUrlRegExp);
            done();
        }

        xhr.open('GET', helloResourceURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });
});
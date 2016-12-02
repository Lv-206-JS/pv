describe('Project GET router', function () {

    var GetProjectsURL = 'http://localhost:9090/rest/projects/';

    it('must be avaliable', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            expect(xhr.status).toBe(200);
            done();
        }

        xhr.open('GET', GetProjectsURL, true);
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
                projects;
            function parseJson() {
                projects = JSON.parse(json);
            }

            expect(contentType).toBe('application/json; charset=utf-8');
            expect(parseJson).not.toThrow();
            expect(projects).toBeDefined();

            done();
        }

        xhr.open('GET', GetProjectsURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return project array with 2 project objects', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var json = xhr.responseText,
                projects = JSON.parse(json);
            expect(projects.length).toEqual(2);
            expect(projects).toEqual(jasmine.any(Array));
            expect(projects[0]).toEqual(jasmine.any(Object));
            expect(projects[1]).toEqual(jasmine.any(Object));
            done();
        }

        xhr.open('GET', GetProjectsURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });
});

describe('Project GET by ID router', function () {

    var GetProjectByIdURL = 'http://localhost:9090/rest/projects/a47f7f29-baf3-fc45-e766-ac46d7490bb1';

    it('must be avaliable', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            expect(xhr.status).toBe(200);
            done();
        }

        xhr.open('GET', GetProjectByIdURL, true);
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
                project;
            function parseJson() {
                project = JSON.parse(json);
            }

            expect(contentType).toBe('application/json; charset=utf-8');
            expect(parseJson).not.toThrow();
            expect(project).toBeDefined();

            done();
        }

        xhr.open('GET', GetProjectByIdURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return project model with all required properties', function (done) {
        var xhr = new XMLHttpRequest(),
            expectedKeys = [
                '_id',
                'id',
                'name',
                'description',
                'author',
                'startDate',
                'createDate',
                'modifiedDate',
                'attachments',
                'tasks',
                'settings',
                'milestones'
            ];

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var json = xhr.responseText,
                project = JSON.parse(json),
                projectKeys = Object.keys(project);
            expect(expectedKeys).toEqual(projectKeys);

            done();
        }

        xhr.open('GET', GetProjectByIdURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });

    it('should return project model with valid properties', function (done) {
        var xhr = new XMLHttpRequest();

        function fail() {
            expect(true).toBeFalsy();
            done();
        }

        function success() {
            var json = xhr.responseText,
                project = JSON.parse(json);
            expect(project.id).toEqual(jasmine.any(String));
            expect(project.name).toEqual(jasmine.any(String));
            expect(project.description).toEqual(jasmine.any(String));
            expect(project.author).toEqual(jasmine.any(String));
            console.log(project.startDate);
            /*expect(project.startDate).toEqual(jasmine.any(Date));
            expect(project.modifiedDate).toEqual(jasmine.any(Date));
            expect(project.createDate).toEqual(jasmine.any(Date));*/
            expect(project.milestones).toEqual(jasmine.any(Array));
            expect(project.settings).toEqual(jasmine.any(Object));
            expect(project.tasks).toEqual(jasmine.any(Array));
            expect(project.attachments).toEqual(jasmine.any(Array));
            done();
        }

        xhr.open('GET', GetProjectByIdURL, true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });
});
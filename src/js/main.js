window.addEventListener('load', function () {
    'use strict';

    var button = document.getElementById('hello-button');

    button.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();

        function fail() {
            window.alert('Oops!!');
        }

        function success() {
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            window.alert(xhr.responseText);
        }

        xhr.open('GET', '/rest/hello', true);
        xhr.addEventListener('error', fail);
        xhr.addEventListener('load', success);
        xhr.send();
    });
});

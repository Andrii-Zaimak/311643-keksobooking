/**
 * Created by andre on 19.02.2017.
 */

'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function (evt) {

      switch (evt.target.readyState) {
        case 0:

          break;

        case 1:

          break;

        case 2:

          break;

        case 3:

          break;

        case 4:
          try {
            if (typeof onLoad === 'function') {
              onLoad(JSON.parse(evt.target.response));
            }
          } catch (err) {
            // TODO
          }
          break;
      }
    });

    xhr.addEventListener('error', function () {

    });

    xhr.addEventListener('timeout', function () {

    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

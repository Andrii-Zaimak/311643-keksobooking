/**
 * Created by andre on 19.02.2017.
 */

'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 30000;

    xhr.addEventListener('load', function (evt) {
      if (typeof onLoad === 'function') {
        onLoad(evt.target.response);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

/**
 * Created by andre on 13.02.2017.
 */

'use strict';
/**
 * Synchronize two elements.
 * @param {Object} firstElement - first element.
 * @param {Object} secondElement - second element.
 * @param {Array} firstArr - values list of first element.
 * @param {Array} secondArr - values list of second element.
 * @param {function} callback - callback function.
 */
window.synchronizeFields = (function () {
  return function (firstElement, secondElement, firstArr, secondArr, callback) {
    var changeElement = function (evt) {
      var target = evt.target;
      var index = firstArr.indexOf(target.value);

      if (typeof callback === 'function') {
        callback(secondElement, secondArr[index]);
      }
    };

    firstElement.addEventListener('change', changeElement);
  };
})();

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
    firstElement.addEventListener('change', function (evt) {
      var val = evt.target.value;
      var index = firstArr.indexOf(val);

      if (typeof callback === 'function') {
        callback(secondElement, secondArr[index]);
      }
    });
  };
})();

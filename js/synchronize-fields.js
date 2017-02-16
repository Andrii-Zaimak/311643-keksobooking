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
 * @param {string} propertyName - changing property of elements.
 */
window.synchronizeFields = (function () {
  return function (firstElement, secondElement, firstArr, secondArr, propertyName) {
    var changeElement = function (evt) {
      var target = evt.target;
      var index;

      if (target === firstElement) {
        index = firstArr.indexOf(target[propertyName]);
        secondElement[propertyName] = secondArr[index];
      } else {
        index = secondArr.indexOf(target.value);
        firstElement[propertyName] = firstArr[index];
      }
    };

    firstElement.addEventListener('change', changeElement);
    secondElement.addEventListener('change', changeElement);
  };
})();

/**
 * Created by andre on 13.02.2017.
 */

'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMapNode = document.querySelector('.tokyo__pin-map');
    var pinsListNode = pinsMapNode.querySelectorAll('.pin');

    var i;
    var currentPin = null;

    // add role and tabindex to pin's
    for (i = 0; i < pinsListNode.length; i++) {
      var element = pinsListNode[i];
      element.setAttribute('role', 'checkbox');
      element.setAttribute('tabindex', '0');

      // find active pin
      if (element.classList.contains('pin--active')) {
        currentPin = element;
        element.setAttribute('aria-checked', 'true');
      } else {
        element.setAttribute('aria-checked', 'false');
      }
    }

    // add click pin listener
    pinsMapNode.addEventListener('click', function (evt) {
      setActivePin(evt.target);
    });

    pinsMapNode.addEventListener('keydown', function (evt) {
      if (window.utils.isValidKeyPressed(evt, [window.utils.KEY_CODE_ENTER])) {
        setActivePin(evt.target);
      }
    });

    /**
     * Set focus to last focused element.
     */
    function setFocusToPin() {
      currentPin.focus();
      removePinActivity();
    }

    /**
     * Remove activity from last active pin.
     */
    function removePinActivity() {
      if (currentPin) {
        currentPin.setAttribute('aria-checked', 'false');
        currentPin.classList.remove('pin--active');
      }
    }

    /**
     * Set active pin.
     * @param {Object} target - DOM pin element.
     */
    function setActivePin(target) {
      target = getPinElement(target);

      // if not found 'div.pin' return
      if (!target) {
        return;
      }

      // remove all activity
      removePinActivity();
      // add .pin--active to select element
      currentPin = target;
      currentPin.setAttribute('aria-checked', 'true');
      currentPin.classList.add('pin--active');
      // show dialogNode
      window.showCard(setFocusToPin);
    }

    /**
     * Get pin element.
     * @param {Object} target - clicked target.
     * @return {Object|null} null - if target not a 'div.pin'.
     */
    function getPinElement(target) {
      while (target !== pinsMapNode) {
        if (target.tagName === 'DIV' && target.classList.contains('pin')) {
          return target;
        }
        target = target.parentNode;
      }

      return null;
    }
  };
})();

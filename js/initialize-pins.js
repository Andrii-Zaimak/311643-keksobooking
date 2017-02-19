/**
 * Created by andre on 13.02.2017.
 */

'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMapNode = document.querySelector('.tokyo__pin-map');
    var pinsListNode = pinsMapNode.querySelectorAll('.pin');
    var pinTemplateNode = pinsMapNode.querySelector('#pin-template');
    var pinClone = pinTemplateNode.content.querySelector('.pin');

    var i;
    var currentPin = null;
    var similarApartments = [];

    // load apartments list from server
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', onLoadHandler);

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
    function cardCloseHandler() {
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
      window.showCard(target.dataset.info, cardCloseHandler);
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

    /**
     * Load data from server success.
     * @param {Array|Object} data - data from server in JSON format.
       */
    function onLoadHandler(data) {
      similarApartments = data;

      for (i = 0; i < 3 && i < similarApartments.length; i++) {
        var elem = pinClone.cloneNode(true);
        pinsMapNode.appendChild(elem);

        elem.style.left = similarApartments[i].location.x + 'px';
        elem.style.top = similarApartments[i].location.y + 'px';

        elem.querySelector('img').src = similarApartments[i].author.avatar;

        elem.dataset.info = JSON.stringify(similarApartments[i]);
      }

      pinsListNode = pinsMapNode.querySelectorAll('.pin');

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
    }
  };
})();

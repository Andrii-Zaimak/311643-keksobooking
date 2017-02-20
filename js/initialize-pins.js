/**
 * Created by andre on 13.02.2017.
 */

'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMapNode = document.querySelector('.tokyo__pin-map');
    var pinTemplateNode = pinsMapNode.querySelector('#pin-template');
    var pinNode = pinTemplateNode.content.querySelector('.pin');

    var i;
    var currentPin = null;
    var similarApartments = null;


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
      var apInfo = getApartmentInfo(target);
      window.showCard(apInfo, cardCloseHandler);
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
      data = Array.isArray(data) ? data : [data];
      similarApartments = [];
      // create pins
      for (i = 0; i < data.length; i++) {
        var elem = pinNode.cloneNode(true);

        // set element styles
        elem.style.left = data[i].location.x + 'px';
        elem.style.top = data[i].location.y + 'px';
        // add element avatar
        elem.querySelector('img').src = data[i].author.avatar;
        // set element attributes
        elem.setAttribute('role', 'checkbox');
        elem.setAttribute('tabindex', '0');
        elem.setAttribute('aria-checked', 'false');

        // add apartments data and element to apartments list
        similarApartments.push({
          data: data[i],
          element: elem
        });
      }

      addApartments(similarApartments);
    }

    /**
     * Add apartments to map.
     * @param {Array} list
       */
    function addApartments(list) {
      removeApartments();

      var docFrag = document.createDocumentFragment();
      list.forEach(function (apartment) {
        docFrag.appendChild(apartment.element);
      });

      pinsMapNode.appendChild(docFrag);
    }

    /**
     * Remove apartments from map.
     */
    function removeApartments() {
      var list = pinsMapNode.querySelectorAll('.pin:not(.pin__main)');

      list.forEach(function (element) {
        pinsMapNode.removeChild(element);
      });
    }

    /**
     * Get apartment info by element.
     * @param {Element} element
     * @return {Object} - return null if apartment info not found.
     */
    function getApartmentInfo(element) {
      if (!similarApartments) {
        return null;
      }

      for (i = 0; i < similarApartments.length; i++) {
        if (similarApartments[i].element === element) {
          return similarApartments[i].data;
        }
      }

      return null;
    }
  };
})();

/**
 * Created by andre on 13.02.2017.
 */

'use strict';

window.initializePins = (function () {
  return function () {
    var pinsMapNode = document.querySelector('.tokyo__pin-map');
    var pinTemplateNode = pinsMapNode.querySelector('#pin-template');
    var pinNode = pinTemplateNode.content.querySelector('.pin');

    var currentPin = null;
    var similarApartments = null;

    var filter = new window.Filter();

    // filter change
    filter.addEventListener('change', function (evt) {
      var params = evt.params;
      var list = similarApartments.filter(function (apartment) {
        var info = apartment.data.offer;

        if (params.type !== 'any' && info.type !== params.type) {
          return false;
        }

        if (info.price < params.price.min || info.price > params.price.max) {
          return false;
        }

        if (params.rooms !== 'any' && info.rooms !== +params.rooms) {
          return false;
        }

        if (params.guests !== 'any' && info.guests !== +params.guests) {
          return false;
        }

        if (params.features.length !== 0 && !params.features.every(function (element) {
          return info.features.indexOf(element) !== -1;
        })) {
          return false;
        }

        return true;
      });

      showApartments(list);
    });

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
      var apInfo = similarApartments.find(function (apartment) {
        return apartment.element === target;
      });
      window.showCard(apInfo && apInfo.data, cardCloseHandler);
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
      similarApartments = [];
      // create pins
      data.forEach(function (info) {
        var elem = pinNode.cloneNode(true);

        // set element styles
        //elem.style.left = (info.location.x - 28) + 'px';
        //elem.style.top = (info.location.y - 75) + 'px';
        elem.style.left = info.location.x + 'px';
        elem.style.top = info.location.y + 'px';
        // add element avatar
        elem.querySelector('img').src = info.author.avatar;
        // add apartments data and element to apartments list
        similarApartments.push({
          data: info,
          element: elem
        });
      });

      showApartments(similarApartments, 3);
    }

    /**
     * Show apartments in map.
     * @param {Array} list
     * @param {number} count
     */
    function showApartments(list, count) {
      removeApartments();

      var documentFragment = document.createDocumentFragment();
      for (var i = 0; i < list.length; i++) {
        if (count && i >= count) {
          break;
        }
        documentFragment.appendChild(list[i].element);
      }

      pinsMapNode.appendChild(documentFragment);
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
  };
})();

/**
 * Created by andre on 19.02.2017.
 */

'use strict';

window.showCard = (function () {
  var dialogNode = document.querySelector('.dialog');
  var dialogCloseBtnNode = dialogNode.querySelector('.dialog__close');
  var avatarNode = dialogNode.querySelector('.dialog__avatar');
  var titleNode = dialogNode.querySelector('#dialog-title');
  var addressNode = dialogNode.querySelector('.lodge__address');
  var priceNode = dialogNode.querySelector('.lodge__price');
  var typeNode = dialogNode.querySelector('.lodge__type');
  var roomAndGuestNode = dialogNode.querySelector('.lodge__rooms-and-guests');
  var checkInTimeNode = dialogNode.querySelector('.lodge__checkin-time');
  var descriptionNode = dialogNode.querySelector('.lodge__description');

  var onClose = null;

  // card hide for default
  close();

  // add dialog drag
  avatarNode.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      var top = dialogNode.offsetTop - shift.y;
      var left = dialogNode.offsetLeft - shift.x;

      // set current coordinate
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // check dialog 'y' min/max coordinate
      if (dialogNode.offsetTop < 0) {
        top = 0;
      } else if (dialogNode.offsetTop > dialogNode.parentNode.offsetHeight - dialogNode.offsetHeight) {
        top = dialogNode.parentNode.offsetHeight - dialogNode.offsetHeight;
      }
      // check dialog 'x' min/max coordinate
      if (dialogNode.offsetLeft < 0) {
        left = 0;
      } else if (dialogNode.offsetLeft > dialogNode.parentNode.offsetWidth - dialogNode.offsetWidth) {
        left = dialogNode.parentNode.offsetWidth - dialogNode.offsetWidth;
      }
      // set dialog window coordinate
      dialogNode.style.top = top + 'px';
      dialogNode.style.left = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /**
   * Show dialog.
   */
  function show() {
    dialogNode.classList.remove('dialog--hidden');

    dialogCloseBtnNode.focus();
  }

  /**
   * Close dialog.
   */
  function close() {
    dialogNode.classList.add('dialog--hidden');

    dialogCloseBtnNode.removeEventListener('click', close);
    dialogCloseBtnNode.removeEventListener('keydown', keyDownHandler);

    if (typeof onClose === 'function') {
      onClose();
    }
  }

  /**
   * Set apartment info.
   * @param {Object} data
   */
  function setInfo(data) {
    var apartmentTypes = {
      'bungalo': 'Сарай',
      'house': 'Дом',
      'flat': 'Квартира'
    };

    avatarNode.src = data.author.avatar;
    titleNode.innerText = data.offer.title;
    addressNode.innerText = data.offer.address;
    priceNode.innerHTML = data.offer.price + '&#x20bd;/ночь';
    typeNode.innerText = apartmentTypes[data.offer.type];
    roomAndGuestNode.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    checkInTimeNode.innerText = 'Заед после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    setFeatures(data.offer.features);
    descriptionNode.innerText = data.offer.description;
    showPhotos(data.offer.photos);
  }

  /**
   * Set features.
   * @param {Array} list - list of features.
   */
  function setFeatures(list) {
    removeElementsFrom(dialogNode.querySelector('.lodge__features'));

    var template = document.querySelector('#feature-image-template');
    var featureNode = template.content.querySelector('.feature__image');
    var documentFragment = document.createDocumentFragment();
    var featuresNode = dialogNode.querySelector('.lodge__features');

    list.forEach(function (feature) {
      var element = featureNode.cloneNode(true);
      element.classList.add('feature__image--' + feature);
      documentFragment.appendChild(element);
    });

    featuresNode.appendChild(documentFragment);
  }

  /**
   * Show photos.
   * @param {Array} list - list of photos url.
   */
  function showPhotos(list) {
    removeElementsFrom(dialogNode.querySelector('.lodge__photos'));

    var template = document.querySelector('#dialog-lodge-photos');
    var photoNode = template.content.querySelector('.lodge__photo');
    var documentFragment = document.createDocumentFragment();
    var photosNode = dialogNode.querySelector('.lodge__photos');

    list.forEach(function (photo) {
      var element = photoNode.cloneNode(true);
      element.src = photo;
      documentFragment.appendChild(element);
    });

    photosNode.appendChild(documentFragment);
  }

  /**
   * Remove all child elements from select element.
   * @param {Element} element
   */
  function removeElementsFrom(element) {
    if (!element) {
      return;
    }

    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
  }

  /**
   * Key down.
   * @param {KeyboardEvent} evt
   */
  function keyDownHandler(evt) {
    if (window.utils.isValidKeyPressed(evt, [window.utils.KEY_CODE_ENTER])) {
      close();
    }
  }

  return function (data, callback) {
    if (!data) {
      close();
      return;
    }

    onClose = callback;
    setInfo(data);
    show(callback);

    dialogCloseBtnNode.addEventListener('click', close);
    dialogCloseBtnNode.addEventListener('keydown', keyDownHandler);
  };
})();

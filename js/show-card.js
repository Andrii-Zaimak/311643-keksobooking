/**
 * Created by andre on 19.02.2017.
 */

'use strict';

window.showCard = (function () {
  var dialogNode = document.querySelector('.dialog');
  var dialogCloseBtnNode = dialogNode.querySelector('.dialog__close');
  var onClose = null;

  // card hide for default
  close();

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
    var avatarNode = dialogNode.querySelector('.dialog__title > img');
    var titleNode = dialogNode.querySelector('#dialog-title');
    var addressNode = dialogNode.querySelector('.lodge__address');
    var priceNode = dialogNode.querySelector('.lodge__price');
    var typeNode = dialogNode.querySelector('.lodge__type');
    var roomAndGuestNode = dialogNode.querySelector('.lodge__rooms-and-guests');
    var checkInTimeNode = dialogNode.querySelector('.lodge__checkin-time');
    var descriptionNode = dialogNode.querySelector('.lodge__description');

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
    var docFrag = document.createDocumentFragment();
    var featuresNode = dialogNode.querySelector('.lodge__features');

    list.forEach(function (feature) {
      var element = featureNode.cloneNode(true);
      element.classList.add('feature__image--' + feature);
      docFrag.appendChild(element);
    });

    featuresNode.appendChild(docFrag);
  }

  /**
   * Show photos.
   * @param {Array} list - list of photos url.
   */
  function showPhotos(list) {
    removeElementsFrom(dialogNode.querySelector('.lodge__photos'));

    var template = document.querySelector('#dialog-lodge-photos');
    var photoNode = template.content.querySelector('img');
    var docFrag = document.createDocumentFragment();
    var photosNode = dialogNode.querySelector('.lodge__photos');

    list.forEach(function (photo) {
      var element = photoNode.cloneNode(true);
      element.src = photo;
      docFrag.appendChild(element);
    });

    photosNode.appendChild(docFrag);
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

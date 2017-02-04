/**
 * Created by andre on 25.01.2017.
 */

'use strict';
var KEY_CODE_ENTER = 13;
// var KEY_CODE_ESCAPE = 27;
var KEY_CODE_SPACE = 32;

var pinsMapNode = document.querySelector('.tokyo__pin-map');
var pinsListNode = pinsMapNode.querySelectorAll('.pin');
var dialogNode = document.querySelector('.dialog');
var dialogCloseBtnNode = dialogNode.querySelector('.dialog__close');

var noticeFormNode = document.querySelector('.notice__form');
var formTitleNode = noticeFormNode.querySelector('#title');
var formPriceNode = noticeFormNode.querySelector('#price');
var formAddressNode = noticeFormNode.querySelector('#address');
var formTimeNode = noticeFormNode.querySelector('#time');
var formTimeoutNode = noticeFormNode.querySelector('#timeout');
var formTypeNode = noticeFormNode.querySelector('#type');
var formRoomNumberNode = noticeFormNode.querySelector('#room_number');
var formCapacityNode = noticeFormNode.querySelector('#capacity');

var i;
var currentPin = null;

// add validation option to form title
formTitleNode.required = true;
formTitleNode.minLength = 30;
formTitleNode.maxLength = 100;

// add validation option to form price
formPriceNode.required = true;
formPriceNode.type = 'number';
formPriceNode.min = 1000;
formPriceNode.max = 1000000;

// add validation option to form address
formAddressNode.required = true;

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
  setActivePin(evt.target.parentNode);
});

pinsMapNode.addEventListener('keydown', function (evt) {
  if (isValidKeyPressed(evt, [KEY_CODE_ENTER, KEY_CODE_SPACE])) {
    setActivePin(evt.target);
  }
});

// add listener to dialogNode close button
dialogCloseBtnNode.addEventListener('click', function () {
  dialogNode.classList.add('dialog--hidden');
  removePinActivity();
});

// add change listener to form time and timeout
formTimeNode.addEventListener('change', function () {
  formTimeoutNode.value = formTimeNode.value;
});

formTimeoutNode.addEventListener('change', function () {
  formTimeNode.value = formTimeoutNode.value;
});

// add change listener to form type
formTypeNode.addEventListener('change', function () {
  formPriceNode.min = formTypeNode.value;
});

// add change listener to form room number
formRoomNumberNode.addEventListener('change', function () {
  formCapacityNode.value = [2, 100].indexOf(+formRoomNumberNode.value) !== -1 ? 3 : 0;
});

/**
 * Remove activity from last active pin.
 */
function removePinActivity() {
  if (currentPin !== null) {
    currentPin.setAttribute('aria-checked', 'false');
    currentPin.classList.remove('pin--active');
  }
}

/**
 * Set active pin.
 * @param {object} pin - DOM pin element.
 */
function setActivePin(pin) {
  // remove all activity
  removePinActivity();
  // add .pin--active to select element
  currentPin = pin;
  currentPin.setAttribute('aria-checked', 'true');
  currentPin.classList.add('pin--active');
  // show dialogNode
  dialogNode.classList.remove('dialog--hidden');
}

/**
 * Check for need key is pressed.
 * @param {object} evt - keypress object.
 * @param {Array} keyCodes - list of valid keys.
 * @return {boolean} true - if key is valid, false - if keyCode is undefined or invalid.
 */
function isValidKeyPressed(evt, keyCodes) {
  return evt.keyCode && keyCodes.indexOf(evt.keyCode) !== -1;
}

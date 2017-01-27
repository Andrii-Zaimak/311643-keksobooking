/**
 * Created by andre on 25.01.2017.
 */

'use strict';

var pinsListNode = document.querySelectorAll('.pin');
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

// add click listener to .pin elements and find active
for (i = 0; i < pinsListNode.length; i++) {
  pinsListNode[i].addEventListener('click', pinSelectHandler);
  // find active pin
  if (pinsListNode[i].classList.contains('pin--active')) {
    currentPin = pinsListNode[i];
  }
}

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

// change pin activity
function pinSelectHandler(evt) {
  // remove all activity
  removePinActivity();
  // add .pin--active to select element
  currentPin = evt.currentTarget;
  currentPin.classList.add('pin--active');
  // show dialogNode
  dialogNode.classList.remove('dialog--hidden');
}
// remove activity from all pins
function removePinActivity() {
  if (currentPin !== null) {
    currentPin.classList.remove('pin--active');
  }
}

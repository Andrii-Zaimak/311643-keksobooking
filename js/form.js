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

// add click listener to .pin elements
for (i = 0; i < pinsListNode.length; i++) {
  pinsListNode[i].addEventListener('click', pinSelectHandler);
}

// add listener to dialogNode close button
dialogCloseBtnNode.addEventListener('click', function () {
  dialogNode.style.display = 'none';
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
  formCapacityNode.value = formRoomNumberNode.value === 2 || formRoomNumberNode.value === 100 ? 3 : 0;
});

// change pin activity
function pinSelectHandler(evt) {
  // remove all activity
  removePinActivity();
  // add .pin--active to select element
  evt.currentTarget.classList.add('pin--active');
  // show dialogNode
  dialogNode.style.display = 'block';
}
// remove activity from all pins
function removePinActivity() {
  for (i = 0; i < pinsListNode.length; i++) {
    pinsListNode[i].classList.remove('pin--active');
  }
}

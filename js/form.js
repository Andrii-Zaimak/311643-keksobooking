/**
 * Created by andre on 25.01.2017.
 */

'use strict';

var pinsList = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogCloseBtn = dialog.querySelector('.dialog__close');

var noticeForm = document.querySelector('.notice__form');
var formTitle = noticeForm.querySelector('#title');
var formPrice = noticeForm.querySelector('#price');
var formAddress = noticeForm.querySelector('#address');
var formTime = noticeForm.querySelector('#time');
var formTimeout = noticeForm.querySelector('#timeout');
var formType = noticeForm.querySelector('#type');
var formRoomNumber = noticeForm.querySelector('#room_number');
var formCapacity = noticeForm.querySelector('#capacity');

var i;

// add validation option to form title
// - not empty
// - min length
// - max length
formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

// add validation option to form price
// - not empty
// - type number
// - min value
// - max value
formPrice.required = true;
formPrice.type = 'number';
formPrice.min = 1000;
formPrice.max = 1000000;

// add validation option to form address
// - not empty
formAddress.required = true;

// add click listener to .pin elements
pinsList.forEach(function (element) {
  element.addEventListener('click', pinSelectHandler);
});

// add listener to dialog close button
dialogCloseBtn.addEventListener('click', function () {
  dialog.style.display = 'none';
  removePinActivity();
});

// add change listener to form time and timeout
formTime.addEventListener('change', function () {
  formTimeout.value = formTime.value;
});
formTimeout.addEventListener('change', function () {
  formTime.value = formTimeout.value;
});

// add change listener to form type
formType.addEventListener('change', function () {
  formPrice.min = formType.value;
});

// add change listener to form room number
formRoomNumber.addEventListener('change', function () {
  formCapacity.value = formRoomNumber.value === 2 || formRoomNumber.value === 100 ? 3 : 0;
});


// change pin activity
function pinSelectHandler(evt) {
  // remove all activity
  removePinActivity();
  // add .pin--active to select element
  evt.currentTarget.classList.add('pin--active');
  // show dialog
  dialog.style.display = 'block';
}
// remove activity from all pins
function removePinActivity() {
  for (i = 0; i < pinsList.length; i++) {
    pinsList[i].classList.remove('pin--active');
  }
}

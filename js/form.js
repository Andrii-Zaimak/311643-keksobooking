/**
 * Created by andre on 25.01.2017.
 */

'use strict';

(function () {
  var noticeFormNode = document.querySelector('.notice__form');
  var formTitleNode = noticeFormNode.querySelector('#title');
  var formPriceNode = noticeFormNode.querySelector('#price');
  var formAddressNode = noticeFormNode.querySelector('#address');
  var formTimeNode = noticeFormNode.querySelector('#time');
  var formTimeoutNode = noticeFormNode.querySelector('#timeout');
  var formTypeNode = noticeFormNode.querySelector('#type');
  var formRoomNumberNode = noticeFormNode.querySelector('#room_number');
  var formCapacityNode = noticeFormNode.querySelector('#capacity');

  // init pin's
  window.initializePins();

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

  window.synchronizeFields(formTimeNode, formTimeoutNode, ['12', '13', '14'], ['12', '13', '14'], 'value');

  window.synchronizeFields(formRoomNumberNode, formCapacityNode, ['1', '2', '100'], ['0', '3', '3'], 'value');

  // add change listener to form type
  formTypeNode.addEventListener('change', function () {
    formPriceNode.min = formTypeNode.value;
  });
})();

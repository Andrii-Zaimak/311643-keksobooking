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
   * Key down.
   * @param {KeyboardEvent} evt
   */
  function keyDownHandler(evt) {
    if (window.utils.isValidKeyPressed(evt, [window.utils.KEY_CODE_ENTER])) {
      close();
    }
  }

  return function (data, callback) {
    onClose = callback;

    show(callback);

    dialogCloseBtnNode.addEventListener('click', close);
    dialogCloseBtnNode.addEventListener('keydown', keyDownHandler);
  };
})();

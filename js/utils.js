/**
 * Created by andre on 06.02.2017.
 */
'use strict';

window.utils = {
  KEY_CODE_ENTER: 13,
  KEY_CODE_ESCAPE: 27,
  KEY_CODE_SPACE: 32,
  /**
   * Check for need key is pressed.
   * @param {object} evt - keypress object.
   * @param {Array} keyCodes - list of valid keys.
   * @return {boolean} true - if key is valid, false - if keyCode is undefined or invalid.
   */
  isValidKeyPressed: function (evt, keyCodes) {
    return evt.keyCode && keyCodes.indexOf(evt.keyCode) !== -1;
  }
};

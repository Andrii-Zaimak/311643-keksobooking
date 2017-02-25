/**
 * Created by andre on 23.02.2017.
 */

'use strict';

window.EventDispatcher = (function () {
  this._listenersByEvent = {};
  return this;
});

window.EventDispatcher.prototype.addEventListener = function (type, listener, scope) {
  if (!this._listenersByEvent[type]) {
    this._listenersByEvent[type] = [];
  }

  this._listenersByEvent[type].push({
    listener: listener,
    scope: scope
  });
};
window.EventDispatcher.prototype.removeEventListener = function (type, listener) {
  var events = this._listenersByEvent[type];
  if (events) {
    for (var i = 0; i < events.length; i++) {
      if (events[i].listener === listener) {
        events.splice(i, 1);
        break;
      }
    }
  }
};
window.EventDispatcher.prototype.dispatchEvent = function (type, eventArgs) {
  var events = this._listenersByEvent[type];
  if (events && events.length > 0) {
    for (var i = 0; i < events.length; i++) {
      events[i].listener.call(events[i].scope, {
        type: type,
        params: eventArgs
      });
    }
  }
};

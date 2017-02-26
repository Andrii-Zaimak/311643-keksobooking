/**
 * Created by andre on 23.02.2017.
 */

'use strict';

window.Filter = (function () {
  var filterNode = document.querySelector('.tokyo__filters');
  var housingTypeNode = filterNode.querySelector('#housing_type');
  var housingPriceNode = filterNode.querySelector('#housing_price');
  var housingRoomNumberNode = filterNode.querySelector('#housing_room-number');
  var housingGuestsNumberNode = filterNode.querySelector('#housing_guests-number');
  var housingFeaturesNode = filterNode.querySelector('#housing_features');

  var self;

  /**
   * Constructor.
   * @constructor
   */
  function Filter() {
    self = this;
    window.EventDispatcher.call(this);
  }

  housingTypeNode.addEventListener('change', update);
  housingPriceNode.addEventListener('change', update);
  housingRoomNumberNode.addEventListener('change', update);
  housingGuestsNumberNode.addEventListener('change', update);
  housingFeaturesNode.addEventListener('change', update);

  function update() {
    self.dispatchEvent('change', {
      type: housingTypeNode.value,
      price: getPrice(housingPriceNode.value),
      rooms: housingRoomNumberNode.value,
      guests: housingGuestsNumberNode.value,
      features: getFeatures()
    });
  }

  function getPrice(priceType) {
    var obj = {min: -Infinity, max: Infinity};
    switch (priceType) {
      case 'low':
        obj.max = 10000;
        break;
      case 'middle':
        obj.min = 10000;
        obj.max = 50000;
        break;
      case 'high':
        obj.min = 50000;
        break;
    }
    return obj;
  }

  function getFeatures() {
    return Array.from(housingFeaturesNode.querySelectorAll('input[name=feature]:checked'), function (node) {
      return node.value;
    });
  }

  Filter.prototype = Object.create(window.EventDispatcher.prototype);

  return Filter;
})();

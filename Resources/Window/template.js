var BaseWindow, SAMPLE;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
SAMPLE = (function() {
  __extends(SAMPLE, BaseWindow);
  function SAMPLE() {}
  SAMPLE.prototype.setView = function() {};
  SAMPLE.prototype.setButton = function() {};
  SAMPLE.prototype.setEvent = function() {};
  return SAMPLE;
})();
exports.SAMPLE = SAMPLE;
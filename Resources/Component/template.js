var BaseComponent, EXAMPLE;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
EXAMPLE = (function() {
  __extends(EXAMPLE, BaseComponent);
  function EXAMPLE(param) {
    this.param = param;
  }
  EXAMPLE.prototype.setView = function() {};
  EXAMPLE.prototype.setEvent = function() {};
  EXAMPLE.prototype.setButton = function() {};
  return EXAMPLE;
})();
exports.EXAMPLE = EXAMPLE;
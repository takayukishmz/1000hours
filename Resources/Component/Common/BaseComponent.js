var BaseComponent;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BaseComponent = (function() {
  function BaseComponent(param) {
    this.getNodeView = __bind(this.getNodeView, this);    if (!param) {
      param = {
        top: 0,
        left: 0,
        width: 320,
        height: 480
      };
    }
    this._view = Ti.UI.createView(param);
    this.setView();
    this.setEvent();
    this.setButton();
  }
  BaseComponent.prototype.setView = function() {};
  BaseComponent.prototype.setEvent = function() {};
  BaseComponent.prototype.setButton = function() {};
  BaseComponent.prototype.getNodeView = function() {
    return this._view;
  };
  BaseComponent.prototype.add = function(node) {
    this._view.add(node);
  };
  BaseComponent.prototype.remove = function(node) {
    this._view.remove(node);
  };
  BaseComponent.prototype.setPosition = function(pos) {
    this._view.setLeft(pos[0]);
    return this._view.setTop(pos[1]);
  };
  return BaseComponent;
})();
exports.BaseComponent = BaseComponent;
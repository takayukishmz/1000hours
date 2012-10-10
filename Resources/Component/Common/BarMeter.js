var BarMeter, BaseComponent;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
BarMeter = (function() {
  __extends(BarMeter, BaseComponent);
  BarMeter.prototype.MARGIN = 10;
  BarMeter.prototype.SIZE_DEFAULT = [274, 50];
  function BarMeter(param) {
    this.param = param;
    this.getCoverWitdh = __bind(this.getCoverWitdh, this);
    this.getRatio = __bind(this.getRatio, this);
    this.setMaxValue = __bind(this.setMaxValue, this);
    this.setValue = __bind(this.setValue, this);
    this.buildBar = __bind(this.buildBar, this);
    this.currentValue = 0;
    this.maxValue = 0;
    BarMeter.__super__.constructor.call(this, this.param);
  }
  BarMeter.prototype.setView = function() {};
  BarMeter.prototype.setEvent = function() {};
  BarMeter.prototype.setButton = function() {};
  BarMeter.prototype.buildBar = function(size) {
    var base, margin, scale;
    scale = size[1] / this.SIZE_DEFAULT[1];
    margin = scale * this.MARGIN;
    this.maxWidth = size[0] - margin * 2;
    base = Ti.UI.createView({
      top: 0,
      left: 0,
      width: size[0],
      height: size[1],
      backgroundImage: global.getImagePath("Chart/bg_bar")
    });
    this.add(base);
    this.cover = Ti.UI.createView({
      top: margin,
      left: margin,
      width: this.maxWidth,
      height: size[1] - margin * 2,
      backgroundImage: global.getImagePath("Chart/bar")
    });
    this.add(this.cover);
  };
  BarMeter.prototype.setValue = function(current, max) {
    var ratio;
    this.currentValue = current;
    if (max) {
      this.setMaxValue(max);
    }
    ratio = this._ajustValue(this.currentValue / this.maxValue);
    this.cover.width = ratio * this.maxWidth;
  };
  BarMeter.prototype.setMaxValue = function(max) {
    this.maxValue = max;
  };
  BarMeter.prototype.getRatio = function() {
    return this.currentValue / this.maxValue;
  };
  BarMeter.prototype._ajustValue = function(ratio) {
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }
    return ratio;
  };
  BarMeter.prototype.getCoverWitdh = function() {
    return this.cover.width;
  };
  return BarMeter;
})();
exports.BarMeter = BarMeter;
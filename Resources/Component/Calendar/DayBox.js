var BaseComponent, Const, DayBox, EventType;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
Const = require('Lib/Const').Const;
EventType = require('Event/EventType').EventType;
DayBox = (function() {
  __extends(DayBox, BaseComponent);
  DayBox.prototype._ICON_NAME = ['write', 'read', 'listen', 'speak'];
  DayBox.prototype._ICON_SIZE = [15, 15];
  DayBox.prototype._ICON_MARGIN = 5;
  function DayBox(frame) {
    this.frame = frame;
    this.toggle = __bind(this.toggle, this);
    this.setView = __bind(this.setView, this);
    this.icons = [];
    this.time_types = Const.TIME_TYPE;
    this._record = {};
    DayBox.__super__.constructor.call(this, {
      left: this.frame[0],
      top: this.frame[1],
      width: this.frame[2],
      height: this.frame[3]
    });
  }
  DayBox.prototype.setView = function() {
    this._button = Titanium.UI.createButton({
      top: 0,
      left: 0,
      width: this.frame[2],
      height: this.frame[3],
      backgroundImage: global.getImagePath('Calendar/bg_calender'),
      backgroundSelectedImage: global.getImagePath('Calendar/bg_calender_dw')
    });
    this.add(this._button);
    this.day = Ti.UI.createLabel({
      right: 5,
      top: 2,
      width: 30,
      height: 20,
      text: '',
      textAlign: "right",
      color: '#333333',
      shadowColor: '#ffffff',
      shadowOffset: {
        x: 0,
        y: 1
      },
      font: {
        fontFamily: 'American Typewriter',
        fontSize: 13
      }
    });
    this._button.add(this.day);
    this._buildIcons();
  };
  DayBox.prototype.toggle = function(flg) {
    if (flg) {
      return this._button.backgroundImage = global.getImagePath('Calendar/bg_calender_dw');
    } else {
      return this._button.backgroundImage = global.getImagePath('Calendar/bg_calender');
    }
  };
  DayBox.prototype.setDay = function(num) {
    this.day.text = num;
  };
  DayBox.prototype.hide = function() {
    this.day.color = '#CCCCCC';
    this._button.setTouchEnabled(false);
  };
  DayBox.prototype.show = function() {
    this.day.color = '#333333';
    this._button.setTouchEnabled(true);
  };
  DayBox.prototype.setData = function(data) {
    var i, value, _len, _ref;
    this._data = data;
    this.setDay(data.day);
    this._record = data.record;
    if (data.show) {
      this.show();
    } else {
      this.hide();
    }
    _ref = this.time_types;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      value = _ref[i];
      if (!this._record || !this._record[this.time_types[i]]) {
        this.icons[i].setVisible(false);
      } else {
        this.icons[i].setVisible(true);
      }
    }
  };
  DayBox.prototype.setEvent = function() {
    Ti.App.addEventListener(EventType.set_unselect, __bind(function(e) {
      if (this.day.text !== e.day || !this._data.show) {
        this.toggle(false);
      } else {
        this.toggle(true);
      }
    }, this));
    return this._button.addEventListener('click', __bind(function() {
      Ti.App.fireEvent(EventType.click_box, this._data);
      this.toggle(true);
    }, this));
  };
  DayBox.prototype._buildIcons = function() {
    var cols, height, i, icon, left, margin, rows, top, value, width, _len, _ref, _results;
    cols = 0;
    rows = 0;
    width = this._ICON_SIZE[0];
    height = this._ICON_SIZE[1];
    margin = this._ICON_MARGIN;
    _ref = this._ICON_NAME;
    _results = [];
    for (i = 0, _len = _ref.length; i < _len; i++) {
      value = _ref[i];
      top = 0 + height * rows - rows;
      left = 0 + width * cols - cols;
      icon = Ti.UI.createView({
        top: 20 + margin + (margin / 2 + width) * cols,
        left: margin + (margin / 2 + height) * rows,
        width: height,
        height: width,
        backgroundImage: global.getImagePath('Calendar/mark_' + value.toLowerCase())
      });
      icon.setVisible(false);
      this._button.add(icon);
      this.icons.push(icon);
      _results.push(cols !== 1 ? cols++ : (cols = 0, rows++));
    }
    return _results;
  };
  return DayBox;
})();
exports.DayBox = DayBox;
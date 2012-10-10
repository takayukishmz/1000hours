var BaseWindow, EventType, InputTimeWindow;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
EventType = require('Event/EventType').EventType;
InputTimeWindow = (function() {
  var _i, _j, _results, _results2;
  __extends(InputTimeWindow, BaseWindow);
  InputTimeWindow.prototype.HOUR = (function() {
    _results = [];
    for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
    return _results;
  }).apply(this);
  InputTimeWindow.prototype.MINUTE = (function() {
    _results2 = [];
    for (_j = 0; _j <= 59; _j++){ _results2.push(_j); }
    return _results2;
  }).apply(this);
  function InputTimeWindow(timeType, hour, minute, day) {
    this.timeType = timeType;
    this.hour = hour;
    this.minute = minute;
    this.day = day;
    this.setButton = __bind(this.setButton, this);
    this.setEvent = __bind(this.setEvent, this);
    this.setView = __bind(this.setView, this);
    this.params = {
      backgroundColor: 'red',
      opacity: 0.5,
      title: getText('title_Input'),
      top: 0,
      height: 350,
      width: 'auto'
    };
    InputTimeWindow.__super__.constructor.call(this, this.params);
    return this.win;
  }
  InputTimeWindow.prototype.setView = function() {
    var hourColumn, minuteColumn, pickerBase, row, value, _k, _l, _len, _len2, _ref, _ref2;
    pickerBase = Ti.UI.createView({
      bottom: 0,
      height: 270
    });
    this.picker = Ti.UI.createPicker({
      left: 100,
      type: Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER
    });
    this.picker.selectionIndicator = true;
    hourColumn = Ti.UI.createPickerColumn();
    minuteColumn = Ti.UI.createPickerColumn();
    _ref = this.HOUR;
    for (_k = 0, _len = _ref.length; _k < _len; _k++) {
      value = _ref[_k];
      row = Ti.UI.createPickerRow({
        title: value.toString()
      });
      hourColumn.addRow(row);
    }
    _ref2 = this.MINUTE;
    for (_l = 0, _len2 = _ref2.length; _l < _len2; _l++) {
      value = _ref2[_l];
      row = Ti.UI.createPickerRow({
        title: value.toString()
      });
      minuteColumn.addRow(row);
    }
    this.picker.addEventListener('change', function(e) {
      info(e);
    });
  };
  InputTimeWindow.prototype.setEvent = function() {
    this.win.addEventListener('open', __bind(function() {
      this.picker.setSelectedRow(0, this.hour, true);
      this.picker.setSelectedRow(1, this.minute, true);
    }, this));
  };
  InputTimeWindow.prototype.setButton = function() {
    var save;
    save = Ti.UI.createButton({
      bottom: 10,
      height: 44,
      width: 300,
      left: 10,
      color: 'blue',
      title: 'save'
    });
    this.win.add(save);
    return save.addEventListener('click', __bind(function() {
      var data, hourIndex, minIndex;
      hourIndex = this.picker.getSelectedRow(0).title;
      minIndex = this.picker.getSelectedRow(1).title;
      data = {
        day: this.day,
        key: this.timeType,
        hour: this.HOUR[hourIndex],
        minute: this.MINUTE[minIndex]
      };
      Ti.App.fireEvent(EventType.update_target_time, data);
      this.win.close();
    }, this));
  };
  return InputTimeWindow;
})();
exports.InputTimeWindow = InputTimeWindow;
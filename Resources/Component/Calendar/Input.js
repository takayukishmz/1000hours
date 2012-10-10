var BaseComponent, EventType, Input;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
EventType = require('Event/EventType').EventType;
Input = (function() {
  var _i, _j, _results, _results2;
  __extends(Input, BaseComponent);
  Input.prototype.HOUR = (function() {
    _results = [];
    for (_i = 0; _i <= 23; _i++){ _results.push(_i); }
    return _results;
  }).apply(this);
  Input.prototype.MINUTE = (function() {
    _results2 = [];
    for (_j = 0; _j <= 59; _j++){ _results2.push(_j); }
    return _results2;
  }).apply(this);
  Input.prototype.ROW_NO = {
    HOUR: 1,
    MINUTE: 2
  };
  function Input() {
    this.close = __bind(this.close, this);
    this._setup = __bind(this._setup, this);
    this.open = __bind(this.open, this);
    this._buildPicker = __bind(this._buildPicker, this);
    this.setButton = __bind(this.setButton, this);    Input.__super__.constructor.call(this, {
      top: -480,
      left: 0,
      height: 480,
      width: 'auto'
    });
  }
  Input.prototype.setData = function(timeType, hour, minute, day) {
    this.timeType = timeType;
    this.hour = hour;
    this.minute = minute;
    this.day = day;
    this._title.backgroundImage = global.getImagePath('Calendar/Input/tm_' + this.timeType);
  };
  Input.prototype.setView = function() {
    this._bg = Ti.UI.createView({
      top: 0,
      left: 0,
      height: 480,
      width: 320,
      backgroundColor: 'black',
      opacity: 0.5
    });
    this._panel = Ti.UI.createView({
      top: -480,
      left: 0,
      height: 385,
      width: 320,
      backgroundImage: global.getImagePath('Calendar/Input/bg_modal')
    });
    this._title = Ti.UI.createView({
      width: 140,
      height: 25,
      top: 12,
      left: (320 - 125) / 2
    });
    this.add(this._bg);
    this.add(this._panel);
    this._panel.add(this._title);
    this._buildPicker();
  };
  Input.prototype.setEvent = function() {};
  Input.prototype.setButton = function() {
    var cancelBtn, saveBtn;
    saveBtn = Ti.UI.createButton({
      backgroundImage: global.getImagePath('Calendar/Input/btn_save_modal'),
      backgroundSelectedImage: global.getImagePath('Calendar/Input/btn_save_modal_dw'),
      width: 320,
      height: 50,
      top: 272,
      left: 0
    });
    saveBtn.addEventListener('click', __bind(function(e) {
      var data, hourIndex, minIndex;
      hourIndex = this.picker.getSelectedRow(0).index;
      minIndex = this.picker.getSelectedRow(1).index;
      data = {
        day: this.day,
        key: this.timeType,
        hour: this.HOUR[hourIndex],
        minute: this.MINUTE[minIndex]
      };
      Ti.App.fireEvent(EventType.update_target_time, data);
      this.close();
    }, this));
    this._panel.add(saveBtn);
    cancelBtn = Ti.UI.createButton({
      backgroundImage: global.getImagePath('Calendar/Input/btn_cancel_modal'),
      backgroundSelectedImage: global.getImagePath('Calendar/Input/btn_cancel_modal_dw'),
      width: 320,
      height: 50,
      top: 327,
      left: 0
    });
    cancelBtn.addEventListener('click', __bind(function() {
      this.close();
    }, this));
    this._panel.add(cancelBtn);
  };
  Input.prototype._buildPicker = function() {
    var hour, hourColumn, i, j, min, minuteColumn, row, value, _len, _len2, _ref, _ref2;
    this.picker = Ti.UI.createPicker({
      left: 15,
      top: 46,
      width: 290,
      height: 188,
      selectionIndicator: true
    });
    hourColumn = Ti.UI.createPickerColumn();
    minuteColumn = Ti.UI.createPickerColumn();
    _ref = this.HOUR;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      value = _ref[i];
      row = Ti.UI.createPickerRow({
        title: "    " + value.toString(),
        index: i,
        fontSize: 22,
        rowNo: this.ROW_NO.HOUR
      });
      hourColumn.addRow(row);
    }
    _ref2 = this.MINUTE;
    for (j = 0, _len2 = _ref2.length; j < _len2; j++) {
      value = _ref2[j];
      row = Ti.UI.createPickerRow({
        fontSize: 22,
        index: j,
        title: "    " + value.toString(),
        rowNo: this.ROW_NO.MINUTE
      });
      minuteColumn.addRow(row);
    }
    this.picker.add([hourColumn, minuteColumn]);
    this._panel.add(this.picker);
    hour = Ti.UI.createLabel({
      top: 141.5,
      left: 91,
      width: 72,
      height: 30,
      text: 'hours',
      textAlign: 'left',
      font: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold'
      }
    });
    this._panel.add(hour);
    min = Ti.UI.createLabel({
      top: 141.5,
      left: 225,
      width: 72,
      height: 30,
      text: 'mins',
      textAlign: 'left',
      font: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold'
      }
    });
    this._panel.add(min);
    this.picker.addEventListener('change', __bind(function(e) {
      row = e.row;
      if (row.rowNo === this.ROW_NO.HOUR) {
        if (row.index === 1) {
          hour.text = 'hour';
        } else {
          hour.text = 'hours';
        }
      } else if (row.rowNo === this.ROW_NO.MINUTE) {
        if (row.index === 1) {
          min.text = 'min';
        } else {
          min.text = 'mins';
        }
      }
    }, this));
  };
  Input.prototype.open = function() {
    var action;
    this._view.setTop(0);
    action = Titanium.UI.createAnimation({
      top: 0,
      left: 0,
      duration: 300,
      curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
    });
    this._panel.animate(action);
    this._setup();
  };
  Input.prototype._setup = function() {
    this.picker.setSelectedRow(0, this.hour, true);
    this.picker.setSelectedRow(1, this.minute, true);
  };
  Input.prototype.close = function() {
    var action;
    action = Titanium.UI.createAnimation({
      top: -480,
      left: 0,
      duration: 300,
      curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
    });
    this._panel.animate(action);
    action.addEventListener('complete', __bind(function() {
      this._view.setTop(-480);
    }, this));
  };
  return Input;
})();
exports.Input = Input;
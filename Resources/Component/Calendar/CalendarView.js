var BaseComponent, CalendarView, Const, DayBox, EventType;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
DayBox = require('Component/Calendar/DayBox').DayBox;
Const = require('Lib/Const').Const;
EventType = require('Event/EventType').EventType;
CalendarView = (function() {
  __extends(CalendarView, BaseComponent);
  CalendarView.prototype.SAMPLE_VALUE = [15, 0, 30, 0];
  CalendarView.prototype.TYPE_NAMES = ['write', 'read', 'listen', 'speak'];
  CalendarView.prototype.WEEK_NAME = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  function CalendarView(_model) {
    this._model = _model;
    this._updateTime = __bind(this._updateTime, this);
    this.resetDetail = __bind(this.resetDetail, this);
    this._buildDetailPanel = __bind(this._buildDetailPanel, this);
    this.switchCal = __bind(this.switchCal, this);
    this.updateCal = __bind(this.updateCal, this);
    this.updateDetail = __bind(this.updateDetail, this);
    this.times = [];
    this.boxes = [];
    this.boxesScroll = [];
    this.isNormalBg = false;
    this.isScrollBg = false;
    this.time_types = Const.TIME_TYPE;
    CalendarView.__super__.constructor.call(this, {
      contentWidth: 'auto',
      contentHeight: 'auto',
      top: 45,
      left: 0,
      height: 430,
      width: 320
    });
    this.switchCal();
    this.setDetailPanel(this._model.getTodayRecord());
    this._model.setCalendarData();
    this._title.text = this._model.getMonthName();
    this._year.text = this._model.getYear();
    return;
  }
  CalendarView.prototype.setView = function() {
    this._buildTitlePanel();
    this._buildScrollCal();
    this._buildNormalCal();
    return this._buildDetailPanel();
  };
  CalendarView.prototype.setEvent = function() {
    Ti.App.addEventListener(EventType.click_box, __bind(function(params) {
      this.setDetailPanel(params);
    }, this));
    Ti.App.addEventListener(EventType.update_cal, __bind(function(e) {
      this._data = e.data;
      this.updateCal();
    }, this));
    this.backMonthButton.addEventListener('click', __bind(function() {
      this._model.setBeforeMonth();
      this.switchCal();
      this._model.setCalendarData();
      this._title.text = this._model.getMonthName();
      this._year.text = this._model.getYear();
    }, this));
    this.forwardMonthButton.addEventListener('click', __bind(function() {
      this._model.setNextMonth();
      this.switchCal();
      this._model.setCalendarData();
      this._title.text = this._model.getMonthName();
      this._year.text = this._model.getYear();
    }, this));
    this.alert = Titanium.UI.createAlertDialog();
    this.alert.setTitle(L('alert_title'));
    this.alert.setMessage(L('alert_message'));
    Ti.App.addEventListener(EventType.update_selected_day, __bind(function(e) {
      this.updateDetail(e);
    }, this));
    Ti.App.addEventListener(EventType.set_unselect, __bind(function(e) {
      if (this.isNormalBg) {
        return this.toggleBoxes(this.boxes, e.day);
      } else if (this.isScrollBg) {
        return this.toggleBoxes(this.boxesScroll, e.day);
      }
    }, this));
  };
  CalendarView.prototype.toggleBoxes = function(boxes, day) {
    var box, _i, _len;
    for (_i = 0, _len = boxes.length; _i < _len; _i++) {
      box = boxes[_i];
      if (box.day.text === day && box._data.show) {
        box.toggle(true);
      } else if (box.getState()) {
        box.toggle(false);
      }
    }
  };
  CalendarView.prototype.unSelectAll = function(boxes) {
    var box, _i, _len;
    for (_i = 0, _len = boxes.length; _i < _len; _i++) {
      box = boxes[_i];
      box.toggle(false);
    }
  };
  CalendarView.prototype.updateDetail = function(data) {
    var index;
    if (this.dayNum.value !== data.day) {
      return;
    }
    index = this.TYPE_NAMES.indexOf(data.timeType);
    if (index !== -1) {
      this._updateTime(data.time, index);
    }
  };
  CalendarView.prototype.setDetailPanel = function(data) {
    var dayIndex, i, time, value, _len, _ref;
    if (!this._model.isPastDay(data.day)) {
      this.alert.show();
      return;
    }
    info(data);
    this.dayNum.backgroundImage = global.getImagePath('Calendar/Date/date_' + data.day);
    this.dayNum.value = data.day;
    this.dayNum.setVisible(true);
    this.dayNoNum.setVisible(false);
    dayIndex = this._model.getDayIndexFromDay(data.day);
    this.dayName.backgroundImage = global.getImagePath('Calendar/Day/day_' + this.WEEK_NAME[dayIndex]);
    this.dayName.setVisible(true);
    this.dayNoName.setVisible(false);
    _ref = this.time_types;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      value = _ref[i];
      if (!data.record || !data.record[this.time_types[i]]) {
        this.times[i].text = 0;
        continue;
      }
      time = data.record[this.time_types[i]];
      this._updateTime(time, i);
    }
  };
  CalendarView.prototype.setButton = function() {};
  CalendarView.prototype.updateCal = function() {
    var box, data, i, len, _len, _len2, _ref, _ref2;
    len = this._model.getCalDataLength();
    if (len <= 35) {
      _ref = this.boxes;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        box = _ref[i];
        data = this._data[i];
        box.setData(data);
      }
    } else {
      _ref2 = this.boxesScroll;
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        box = _ref2[i];
        box.setData(this._data[i]);
      }
    }
  };
  CalendarView.prototype._buildScrollCal = function() {
    var box, cols, i, rows;
    this.calScrollBg = Titanium.UI.createScrollView({
      top: 45,
      height: 298,
      width: 320,
      contentWidth: 320,
      contentHeight: 60 * 6 - 6
    });
    cols = 0;
    rows = 0;
    for (i = 0; i < 42; i++) {
      box = this._buildBox(rows, cols);
      this.calScrollBg.add(box.getNodeView());
      this.boxesScroll.push(box);
      if (cols !== 6) {
        cols++;
      } else {
        cols = 0;
        rows++;
      }
    }
  };
  CalendarView.prototype._buildBox = function(rows, cols) {
    var box, height, left, top, width;
    width = 46.7;
    height = 60;
    top = 0 + height * rows - rows;
    left = 0 + width * cols - cols;
    box = new DayBox([left, top, width, height]);
    return box;
  };
  CalendarView.prototype._buildNormalCal = function() {
    var box, cols, i, rows;
    this.calBg = Titanium.UI.createView({
      top: 45,
      height: 322,
      width: 320
    });
    cols = 0;
    rows = 0;
    for (i = 0; i < 35; i++) {
      box = this._buildBox(rows, cols);
      this.calBg.add(box.getNodeView());
      this.boxes.push(box);
      if (cols !== 6) {
        cols++;
      } else {
        cols = 0;
        rows++;
      }
    }
  };
  CalendarView.prototype.switchCal = function() {
    var len;
    len = this._model.getCalDataLength();
    this.resetDetail();
    if (len <= 35) {
      this.add(this.calBg);
      this.isNormalBg = true;
      if (this.isScrollBg) {
        this.unSelectAll(this.boxesScroll);
        this.remove(this.calScrollBg);
        this.isScrollBg = false;
      }
    } else {
      this.add(this.calScrollBg);
      this.isScrollBg = true;
      if (this.isNormalBg) {
        this.unSelectAll(this.boxes);
        this.remove(this.calBg);
        this.isNormalBg = false;
      }
    }
  };
  CalendarView.prototype._buildTitlePanel = function() {
    var M, Y, now;
    this._title = Ti.UI.createLabel({
      top: 3.9,
      left: 30,
      width: 150,
      height: 24,
      text: '',
      color: '#383838',
      textAlign: 'right',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 22,
        fontWeight: "bold"
      }
    });
    this.add(this._title);
    this._year = Ti.UI.createLabel({
      top: 10,
      left: 185,
      width: 40,
      height: 16,
      text: '',
      color: '#999999',
      textAlign: 'center',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "bold"
      }
    });
    this.add(this._year);
    now = new Date();
    now.setHours(12);
    Y = now.getYear() + 1900;
    M = now.getMonth() + 1;
    this.backMonthButton = Ti.UI.createView({
      color: "#fff",
      top: 0,
      left: 0,
      height: 33,
      width: 46,
      backgroundImage: global.getImagePath("Calendar/btn_before")
    });
    this.add(this.backMonthButton);
    this.forwardMonthButton = Ti.UI.createLabel({
      color: "#fff",
      top: 0,
      right: 0,
      height: 33,
      width: 46,
      backgroundImage: global.getImagePath("Calendar/btn_next")
    });
    this.add(this.forwardMonthButton);
    return this._setDaylabels();
  };
  CalendarView.prototype._setDaylabels = function() {
    var index, title, value, _len, _ref;
    _ref = this.WEEK_NAME;
    for (index = 0, _len = _ref.length; index < _len; index++) {
      value = _ref[index];
      title = Ti.UI.createLabel({
        top: 33,
        left: 45.7 * index,
        width: 45,
        height: 12,
        text: value,
        color: '#333333',
        shadowColor: '#FFFFFF',
        textAlign: 'center',
        font: {
          fontFamily: 'American Typewriter',
          fontSize: 12
        }
      });
      this.add(title);
    }
  };
  CalendarView.prototype._buildDetailPanel = function() {
    var category, categoryBox, i, selectedBox, _len, _ref;
    selectedBox = Titanium.UI.createView({
      left: 0,
      top: 343,
      width: 72,
      height: 76,
      backgroundImage: global.getImagePath('Calendar/bottom_date')
    });
    this.dayNum = Titanium.UI.createView({
      left: 12.5,
      top: 12.5,
      width: 47,
      height: 32
    });
    this.dayNoNum = Titanium.UI.createLabel({
      left: 0,
      top: 8,
      width: 72,
      height: 33,
      text: '-',
      color: '#ffffff',
      textAlign: 'center',
      font: {
        fontFamily: 'American Typewriter',
        fontSize: 27
      },
      shadowColor: '#7a4822',
      shadowOffset: {
        x: 0,
        y: -1
      }
    });
    this.dayName = Titanium.UI.createView({
      left: 19,
      top: 55,
      width: 34,
      height: 13
    });
    this.dayNoName = Titanium.UI.createLabel({
      left: 0,
      top: 48,
      width: 72,
      height: 21,
      text: '-',
      color: '#ffffff',
      textAlign: 'center',
      font: {
        fontFamily: 'American Typewriter',
        fontSize: 15
      },
      shadowColor: '#7a4822',
      shadowOffset: {
        x: 0,
        y: -1
      }
    });
    this.add(selectedBox);
    selectedBox.add(this.dayNoNum);
    selectedBox.add(this.dayNum);
    selectedBox.add(this.dayNoName);
    selectedBox.add(this.dayName);
    _ref = this.TYPE_NAMES;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      category = _ref[i];
      categoryBox = Titanium.UI.createButton({
        left: 72 + 62 * i,
        top: 343,
        width: 62,
        height: 76,
        backgroundImage: global.getImagePath('Calendar/bottom_' + category),
        backgroundSelectedImage: global.getImagePath('Calendar/bottom_' + category + '_dw'),
        timeType: category,
        index: i
      });
      this.time = Titanium.UI.createLabel({
        left: 0,
        top: 24,
        width: 62,
        height: 26,
        textAlign: 'center',
        text: '',
        color: '#ffffff',
        minimumFontSize: 16,
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 22,
          fontWeight: "bold"
        },
        shadowColor: '#7a4822',
        shadowOffset: {
          x: 0,
          y: -1
        }
      });
      this.times.push(this.time);
      this.categoryLebel = Titanium.UI.createLabel({
        left: 0,
        bottom: 10,
        width: 62,
        height: 20,
        text: 'min',
        textAlign: 'center',
        color: '#ffffff',
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 11,
          fontWeight: "semibold"
        },
        shadowColor: '#7a4822',
        shadowOffset: {
          x: 0,
          y: -1
        }
      });
      this.add(categoryBox);
      categoryBox.add(this.time);
      categoryBox.add(this.categoryLebel);
      categoryBox.addEventListener('click', __bind(function(e) {
        var data;
        if (this.times[e.source.index].text === '-') {
          return;
        }
        data = {
          timeType: e.source.timeType.toLowerCase(),
          day: this.dayNum.value,
          time: this.times[e.source.index].text
        };
        Ti.App.fireEvent(EventType.open_input, data);
      }, this));
    }
  };
  CalendarView.prototype.resetDetail = function() {
    var time, _i, _len, _ref;
    this.dayNum.value = '-';
    this.dayNum.setVisible(false);
    this.dayNoNum.setVisible(true);
    this.dayName.setVisible(false);
    this.dayNoName.setVisible(true);
    _ref = this.times;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      time = _ref[_i];
      time.text = '-';
    }
  };
  CalendarView.prototype._updateTime = function(time, index) {
    if (time < 0 || time === void 0) {
      return;
    }
    this.times[index].text = time;
  };
  return CalendarView;
})();
exports.CalendarView = CalendarView;
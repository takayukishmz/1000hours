var BaseWindow, Calendar, CalendarView, CalendarWindow, ChartWindow, EventType, InputTimeWindow, TitlePanel;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
TitlePanel = require('Component/Calendar/TitlePanel').TitlePanel;
CalendarView = require('Component/Calendar/CalendarView').CalendarView;
Calendar = require('Model/Calendar').Calendar;
ChartWindow = require('Window/ChartWindow').ChartWindow;
InputTimeWindow = require('Window/InputTimeWindow').InputTimeWindow;
EventType = require('Event/EventType').EventType;
CalendarWindow = (function() {
  __extends(CalendarWindow, BaseWindow);
  CalendarWindow.prototype.WEEK_COLOR = ["reds", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
  function CalendarWindow() {
    this.setEvent = __bind(this.setEvent, this);
    this.setButton = __bind(this.setButton, this);    CalendarWindow.__super__.constructor.call(this, {
      title: getText('title_calendar')
    });
    this._model = new Calendar();
    this._model.setDate(new Date());
    this._calendar = new CalendarView(this._model);
    this._model.setMonthlyData();
    this.win.add(this._calendar.getNodeView());
    this.win.hideTabBar();
    return this.win;
  }
  CalendarWindow.prototype.setView = function() {};
  CalendarWindow.prototype.setButton = function() {
    var rightBtn;
    rightBtn = Ti.UI.createButton({
      top: 0,
      right: 0,
      width: 66,
      height: 44,
      backgroundImage: global.getImagePath('Calendar/btn_chart'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_chart_dw')
    });
    rightBtn.addEventListener('click', function(e) {
      global.tabs.currentTab.open(new ChartWindow(), {
        animated: true
      });
    });
    return this.win.rightNavButton = rightBtn;
  };
  CalendarWindow.prototype.setEvent = function() {
    Ti.App.addEventListener(EventType.update_target_time, __bind(function(data) {
      info('update_target_time', data.day);
      this._model.updateTimeData(data.key, data.hour, data.minute, data.day);
    }, this));
    Ti.App.addEventListener(EventType.open_input, __bind(function(data) {
      var hhmm, hour, minute, newWindow;
      info('handle:open_input', JSON.stringify(data));
      hhmm = this._model.convertToHHMM(data.time);
      hour = hhmm[0];
      minute = hhmm[1];
      newWindow = new InputTimeWindow(data.timeType, hour, minute, data.day);
      newWindow.open();
    }, this));
    return Ti.App.addEventListener(EventType.click_box, __bind(function(e) {
      var day;
      info('click_box');
      day = 0;
      if (this._model.isPastDay(e.day)) {
        this._model.setSelectedDay(e.day);
        day = e.day;
      } else if (this._model.isPastMonth()) {
        day = this._model.getSelectedDay();
      } else {
        day = 0;
      }
      Ti.App.fireEvent(EventType.set_unselect, {
        day: day
      });
    }, this));
  };
  return CalendarWindow;
})();
exports.CalendarWindow = CalendarWindow;
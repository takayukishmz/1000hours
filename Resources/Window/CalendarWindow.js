var BaseWindow, Calendar, CalendarView, CalendarWindow, ChartWindow, EventType, Input, SettingNavWindow, TitlePanel, TutorialWindow;
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
SettingNavWindow = require('Window/SettingNavWindow').SettingNavWindow;
Input = require('Component/Calendar/Input').Input;
EventType = require('Event/EventType').EventType;
TutorialWindow = require('Window/TutorialWindow').TutorialWindow;
CalendarWindow = (function() {
  __extends(CalendarWindow, BaseWindow);
  CalendarWindow.prototype.WEEK_COLOR = ["reds", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
  function CalendarWindow() {
    this.setEvent = __bind(this.setEvent, this);
    this.setButton = __bind(this.setButton, this);
    this.setView = __bind(this.setView, this);    CalendarWindow.__super__.constructor.call(this, {
      title: getText('title_calendar')
    });
    this._model = new Calendar();
    this._model.setDate(new Date());
    this._inputDialog = new Input();
    this._calendar = new CalendarView(this._model);
    this._settingNavWindow = new SettingNavWindow();
    this._chartWindow = new ChartWindow();
    this._model.setMonthlyData();
    this.win.add(this._calendar.getNodeView());
    this.win.add(this._inputDialog.getNodeView());
    this.win.hideTabBar();
    return this.win;
  }
  CalendarWindow.prototype.setView = function() {
    this.setHeaderTitleImage({
      backgroundImage: global.getImagePath('Calendar/title_calendar'),
      height: 21,
      width: 120,
      left: 100,
      top: 12
    });
  };
  CalendarWindow.prototype.setButton = function() {
    var leftBtn, rightBtn;
    rightBtn = Ti.UI.createButton({
      top: 0,
      left: 263,
      width: 57,
      height: 45,
      backgroundImage: global.getImagePath('Calendar/btn_chart'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_chart_dw')
    });
    rightBtn.addEventListener('click', __bind(function(e) {
      global.tabs.currentTab.open(this._chartWindow, {
        animated: true
      });
    }, this));
    this.win.add(rightBtn);
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 57,
      height: 45,
      backgroundImage: global.getImagePath('Calendar/btn_setting'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_setting_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      this._settingNavWindow.open({
        modal: true
      });
    }, this));
    this.win.add(leftBtn);
  };
  CalendarWindow.prototype.setEvent = function() {
    Ti.App.addEventListener(EventType.update_target_time, __bind(function(data) {
      this._model.updateTimeData(data.key, data.hour, data.minute, data.day);
    }, this));
    Ti.App.addEventListener(EventType.open_input, __bind(function(data) {
      var hhmm, hour, minute;
      hhmm = this._model.convertToHHMM(data.time);
      hour = hhmm[0];
      minute = hhmm[1];
      this._inputDialog.setData(data.timeType, hour, minute, data.day);
      this._inputDialog.open();
    }, this));
    Ti.App.addEventListener(EventType.click_box, __bind(function(e) {
      var day;
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
    this.win.addEventListener('focus', __bind(function(e) {}, this));
  };
  return CalendarWindow;
})();
exports.CalendarWindow = CalendarWindow;
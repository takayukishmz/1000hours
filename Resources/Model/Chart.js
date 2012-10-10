var Chart, Const, EventType, db;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
db = require('DB/Record').Record;
Const = require('Lib/Const').Const;
EventType = require('Event/EventType').EventType;
Chart = (function() {
  Chart.prototype.MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  Chart.prototype.GOAL_HOUR = 1000;
  Chart.prototype.WEEK_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function Chart() {
    this.getSnsShareText = __bind(this.getSnsShareText, this);
    this.getTotalTimeByHHMM = __bind(this.getTotalTimeByHHMM, this);
    this._setCirCleGraph = __bind(this._setCirCleGraph, this);
    this._setBarGragh = __bind(this._setBarGragh, this);
    this.getTotalTime = __bind(this.getTotalTime, this);
    this._setTimeData = __bind(this._setTimeData, this);    this._times = {
      write: 0,
      read: 0,
      listen: 0,
      speak: 0
    };
  }
  Chart.prototype.setGraphData = function() {
    this._times = {
      write: 0,
      read: 0,
      listen: 0,
      speak: 0
    };
    this._setTimeData();
    this._setBarGragh();
    return this._setCirCleGraph();
  };
  Chart.prototype._setTimeData = function() {
    var data, i, _i, _len;
    data = db.getRawData();
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      i = data[_i];
      if (i.write) {
        this._times.write += i.write;
      }
      if (i.read) {
        this._times.read += i.read;
      }
      if (i.listen) {
        this._times.listen += i.listen;
      }
      if (i.speak) {
        this._times.speak += i.speak;
      }
    }
  };
  Chart.prototype.getTotalTime = function() {
    var key, total, value, _ref;
    total = 0;
    _ref = this._times;
    for (key in _ref) {
      value = _ref[key];
      total += value;
    }
    return total;
  };
  Chart.prototype._setBarGragh = function() {
    var time, timeData;
    time = this.getTotalTime();
    timeData = this._convertToHourAndMinute(time);
    info('total', time);
    return Ti.App.fireEvent(EventType.update_bar_graph, timeData);
  };
  Chart.prototype._setCirCleGraph = function() {
    if (!this._times) {
      return;
    }
    return Ti.App.fireEvent(EventType.update_circle_graph, this._times);
  };
  Chart.prototype._convertToHourAndMinute = function(time) {
    var hour, minute;
    hour = Math.floor(time / 60);
    minute = time - hour * 60;
    return {
      hour: hour,
      minute: minute
    };
  };
  Chart.prototype.getTotalTimeByHHMM = function() {
    var hhmm, total;
    total = this.getTotalTime();
    hhmm = this._convertToHourAndMinute(total);
    return hhmm;
  };
  Chart.prototype._calcWillFinishDate = function(hour) {
    var data, dd, diff, first, goalDay, last, ratio, unixFirst, unixLast;
    data = db.getRawData();
    first = data[0];
    last = data[data.length - 1];
    if (!hour || hour <= 0 || !first || !last) {
      info('ERROR hour:' + hour + ' first:' + JSON.stringify(first) + ' last:' + JSON.stringify(last));
      return false;
    }
    unixFirst = new Date(first.year, first.month - 1, first.day).getTime();
    unixLast = new Date(last.year, last.month - 1, last.day).getTime();
    diff = unixLast - unixFirst;
    ratio = hour ? Math.floor(this.GOAL_HOUR / hour) : 0;
    if (!diff || !ratio) {
      info('ERROR diff:' + diff + ' ratio:' + ratio);
      return false;
    }
    dd = new Date();
    dd.setTime(unixFirst + ratio * diff);
    goalDay = {
      year: dd.getYear() + 1900,
      month: dd.getMonth() + 1,
      day: dd.getDate()
    };
    info(goalDay);
    return goalDay;
  };
  Chart.prototype.getSnsShareText = function(defaultMessage) {
    var goalDay, hhmm, text;
    hhmm = this.getTotalTimeByHHMM();
    goalDay = this._calcWillFinishDate(hhmm.hour + hhmm.minute / 60);
    if (!goalDay) {
      defaultMessage = L('message_not_enough_case');
    }
    text = String.format(defaultMessage, hhmm.hour, hhmm.minute, goalDay.year, goalDay.month, goalDay.day);
    return text;
  };
  return Chart;
})();
exports.Chart = Chart;
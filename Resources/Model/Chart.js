var Chart, Const, EventType, db;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
db = require('DB/Record').Record;
Const = require('Lib/Const').Const;
EventType = require('Event/EventType').EventType;
Chart = (function() {
  Chart.prototype.MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  Chart.prototype.WEEK_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function Chart() {
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
    Ti.App.fireEvent('hoge');
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
  return Chart;
})();
exports.Chart = Chart;
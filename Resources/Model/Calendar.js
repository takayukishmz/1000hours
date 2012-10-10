var Calendar, Const, EventType, db;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
db = require('DB/Record').Record;
Const = require('Lib/Const').Const;
EventType = require('Event/EventType').EventType;
Calendar = (function() {
  Calendar.prototype.MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  Calendar.prototype.MONTH_NAME = ['January', 'February', 'March', 'April', 'May', "June", 'July', 'August', 'September', 'October', 'November', 'December'];
  Calendar.prototype.WEEK_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function Calendar() {
    this.getDayIndexFromDay = __bind(this.getDayIndexFromDay, this);
    this.updateTimeData = __bind(this.updateTimeData, this);
    this.setBeforeMonth = __bind(this.setBeforeMonth, this);
    this.setNextMonth = __bind(this.setNextMonth, this);
    this.setCalendarData = __bind(this.setCalendarData, this);
    this.getYear = __bind(this.getYear, this);
    this.getMonthName = __bind(this.getMonthName, this);    this._reference = {};
    this._selectedMonth = null;
    this._selectedDay = null;
    this.date = null;
    this._year = null;
    this._month = null;
    this._calData = [];
  }
  Calendar.prototype.getMonthName = function() {
    return this.MONTH_NAME[this._month - 1];
  };
  Calendar.prototype.getYear = function() {
    return this._year;
  };
  Calendar.prototype.setSelectedDay = function(day) {
    this._selectedDay = day;
  };
  Calendar.prototype.getSelectedDay = function() {
    return this._selectedDay;
  };
  Calendar.prototype.getMockData = function() {
    var i, _i, _len;
    this._reference = {};
    for (_i = 0, _len = mock.length; _i < _len; _i++) {
      i = mock[_i];
      this._reference[i.day] = i;
    }
    return this._reference;
  };
  Calendar.prototype.setMonthlyData = function() {
    var data, i, _i, _len;
    this._reference = {};
    data = db.getMonthlyData(this._year, this._month);
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      i = data[_i];
      this._reference[i.day] = i;
    }
  };
  Calendar.prototype._setMonthLength = function() {
    var leapYear;
    leapYear = (this._year % 4 === 0 && this._year % 100 !== 0) || (this._year % 400 === 0) ? 0 : 1;
    this._monthLength = [31, 28 + leapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  };
  Calendar.prototype.getMonthLength = function(month) {
    return this._monthLength[month - 1];
  };
  Calendar.prototype.getCalDataLength = function() {
    var len, monthLength, weekIndex;
    weekIndex = this.getStartDay();
    monthLength = this.getMonthLength(this._month);
    len = weekIndex + monthLength;
    return weekIndex + monthLength;
  };
  Calendar.prototype.setCalendarData = function() {
    var blanckNum, calArr, day, i, lastDay, max, monthLength, record, weekIndex;
    this.setMonthlyData();
    this.setTodayRecord();
    calArr = [];
    monthLength = this.getMonthLength(this._month);
    for (i = 1; 1 <= monthLength ? i <= monthLength : i >= monthLength; 1 <= monthLength ? i++ : i--) {
      record = this._reference[i];
      calArr.push({
        isSelected: this._selectedDay === i,
        day: i,
        show: true,
        record: record,
        isToday: this.isToday(i)
      });
    }
    weekIndex = this.getStartDay();
    lastDay = this.getMonthLength(this._month);
    day = lastDay;
    for (i = 0; 0 <= weekIndex ? i < weekIndex : i > weekIndex; 0 <= weekIndex ? i++ : i--) {
      calArr.unshift({
        day: day,
        show: false
      });
      day--;
    }
    max = weekIndex + monthLength > 35 ? 42 : 35;
    blanckNum = max - (weekIndex + monthLength);
    for (i = 1; 1 <= blanckNum ? i <= blanckNum : i >= blanckNum; 1 <= blanckNum ? i++ : i--) {
      calArr.push({
        day: i,
        show: false
      });
    }
    this._calData = calArr;
    Ti.App.fireEvent(EventType.update_cal, {
      "data": this._calData
    });
  };
  Calendar.prototype.setTodayRecord = function() {
    var date, day, month, record, year;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    record = db.getSelectOne(year, month, day);
    this._today = {
      year: year,
      month: month,
      day: day,
      record: record
    };
  };
  Calendar.prototype.getTodayRecord = function() {
    var data;
    if (!this._today) {
      this.setTodayRecord();
    }
    data = {
      day: this._today.day,
      show: true,
      record: this._today.record
    };
    return data;
  };
  Calendar.prototype.getWeekNameArray = function() {
    return this.WEEK_NAME;
  };
  Calendar.prototype.getMonthLengthArray = function() {
    return this._monthLength;
  };
  Calendar.prototype.getStartDay　 = function() {
    var d;
    d = new Date(this._year + "/" + this._month + "/" + 1);
    return d.getDay();
  };
  Calendar.prototype.setDate = function(date) {
    this.date = date;
    this._year = date.getFullYear();
    this._month = date.getMonth() + 1;
    this._setMonthLength();
  };
  Calendar.prototype.setNextMonth = function() {
    this._selectedDay = 0;
    if (this._month === 12) {
      this._month = 1;
      this._year++;
    } else {
      this._month++;
    }
  };
  Calendar.prototype.setBeforeMonth = function() {
    this._selectedDay = 0;
    if (this._month === 1) {
      this._month = 12;
      this._year--;
    } else {
      this._month--;
    }
  };
  Calendar.prototype.getDate = function() {
    return this.date;
  };
  Calendar.prototype.updateTimeData = function(type, hour, minute, day) {
    var row, time, ymdArr;
    time = minute + this._convertToMinute(hour);
    ymdArr = [this._year, this._month, day];
    if (this._reference[day]) {
      row = db.updateBy(type, time, ymdArr);
    } else {
      this._insertTimeByType(type, time, ymdArr);
    }
    Ti.App.fireEvent(EventType.update_selected_day, {
      timeType: type,
      day: day,
      time: time
    });
    this.setCalendarData();
  };
  Calendar.prototype._insertTimeByType = function(type, value, ymd) {
    var index, key, types, values, _len;
    values = [];
    types = Const.TIME_TYPE;
    for (index = 0, _len = types.length; index < _len; index++) {
      key = types[index];
      if (key === type) {
        values[index] = value;
      } else {
        values[index] = 0;
      }
    }
    return db.addRecord(values[0], values[1], values[2], values[3], ymd);
  };
  Calendar.prototype._convertToMinute = function(hour) {
    return hour * 60;
  };
  Calendar.prototype._convertToHour = function(minute) {
    var hour;
    hour = Math.floor(minute / 60);
    return hour;
  };
  Calendar.prototype.convertToHHMM = function(minute) {
    var hh, mm;
    hh = this._convertToHour(minute);
    mm = minute - (hh * 60);
    return [hh, mm];
  };
  /*
  		use for only debug
  	*/
  Calendar.prototype.clearDB = function() {
    db.reset("RECORD");
  };
  Calendar.prototype.isPastDay = function(selectedDay) {
    var day, month, selectedYMD, today, todayD, todayM, todayY, todayYMD;
    month = '0' + this._month.toString();
    day = '0' + selectedDay.toString();
    today = new Date();
    todayY = today.getFullYear();
    todayM = today.getMonth() + 1;
    todayD = today.getDate();
    todayM = '0' + todayM.toString();
    todayD = '0' + todayD.toString();
    todayYMD = this._year.toString() + todayM.substr(-2, 2).toString() + todayD.substr(-2, 2).toString();
    selectedYMD = todayY.toString() + month.substr(-2, 2).toString() + day.substr(-2, 2).toString();
    if (selectedYMD > todayYMD) {
      return false;
    }
    return true;
  };
  Calendar.prototype.isPastMonth = function() {
    var today;
    today = new Date();
    if (this._month > (today.getMonth() + 1)) {
      return false;
    }
    return true;
  };
  Calendar.prototype.isToday = function(day) {
    if (this._today.year === this._year && this._today.month === this._month && this._today.day === day) {
      return true;
    }
    return false;
  };
  Calendar.prototype.getDayIndexFromDay = function(day) {
    var d;
    d = new Date(this._year + "/" + this._month + "/" + day);
    return d.getDay();
  };
  return Calendar;
})();
exports.Calendar = Calendar;
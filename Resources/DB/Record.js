var Const, DATABASE_NAME, TABLE;
Const = require('Lib/Const').Const;
DATABASE_NAME = "1000";
TABLE = {
  RECORD: 'record'
};
exports.Record = {
  tableName: 'record',
  createDb: function() {
    Ti.Database.install("record.sqlite", DATABASE_NAME);
  },
  reset: function(table) {
    var db;
    db = Ti.Database.open(DATABASE_NAME);
    db.execute("drop table if exists " + this.tableName);
    db.close();
    this.createTable(table);
  },
  createTable: function(tableName) {
    var db, table;
    table = TABLE[tableName];
    if (!table) {
      return;
    }
    db = Ti.Database.open(DATABASE_NAME);
    db.execute("create table if not exists " + table + " (" + "year integer," + "month integer," + "day integer," + "write integer," + "read integer," + "listen integer," + "speak integer" + ")");
    db.close();
  },
  getRawData: function() {
    var db, retData, rows;
    retData = [];
    db = Ti.Database.open(DATABASE_NAME);
    rows = db.execute("select * from " + this.tableName);
    retData = this._convertToObj(rows);
    retData.sort(function(a, b) {
      var diff;
      diff = a.year - b.year;
      if (diff === 0) {
        diff = a.month - b.month;
        if (diff === 0) {
          diff = a.day - b.day;
        }
      }
      return diff;
    });
    db.close();
    return retData;
  },
  getMonthlyData: function(_year, _month) {
    var db, retData, rows;
    retData = [];
    db = Ti.Database.open(DATABASE_NAME);
    rows = db.execute("select * from " + this.tableName + " where year=? and month=?", _year, _month);
    retData = this._convertToObj(rows);
    db.close();
    return retData;
  },
  getSelectOne: function(_year, _month, _day) {
    var db, retData, rows;
    db = Ti.Database.open(DATABASE_NAME);
    rows = db.execute("select * from " + this.tableName + " where year=? and month=? and day=?", _year, _month, _day);
    retData = this._convertToObj(rows);
    db.close();
    if (retData.length) {
      return retData.shift();
    } else {

    }
  },
  /*
  	 update a Column.
  	*/
  updateBy: function(column, value, ymd) {
    var d, db, m, rows, sql, where, y;
    info('updateBy' + column);
    where = "where year =? and month = ? and day = ?";
    sql = "update " + this.tableName + " set " + column + "=? " + where;
    y = ymd[0];
    m = ymd[1];
    d = ymd[2];
    if (!this._validateDate(ymd[0], ymd[1], ymd[2])) {
      return;
    }
    if (!this._validateRecord(value)) {
      return;
    }
    db = Ti.Database.open(DATABASE_NAME);
    info(sql, value + ":" + y + ":" + m + ":" + d);
    db.execute(sql, value, y, m, d);
    info("select * from " + this.tableName + " " + where, y + ":" + m + ":" + d);
    rows = db.execute("select * from " + this.tableName + " " + where, y, m, d);
    db.close();
    return rows;
  },
  _validateDate: function(y, m, d) {
    if (typeof y !== 'number' || typeof m !== 'number' || typeof d !== 'number') {
      info('Invalid data. not number. y:' + y + ' m:' + m + ' d:' + d);
      return;
    }
    if (y <= 0) {
      info('Invalid year. y:' + y + ' m:' + m + ' d:' + d);
      return false;
    }
    if (m <= 0 || m > 12) {
      info('Invalid month. y:' + y + ' m:' + m + ' d:' + d);
      return false;
    }
    if (d <= 0 || d > Const.MONTH_LENGTH[m - 1]) {
      info('Invalid day. y:' + y + ' m:' + m + ' d:' + d);
      return false;
    }
    return true;
  },
  _validateRecord: function(value) {
    if (value !== '' && value !== void 0 && value >= 0) {
      return true;
    } else {
      info('Invalid data. not number. ' + value);
      return false;
    }
  },
  addRecord: function(w, r, l, s, ymd) {
    var db;
    if (!this._validateDate(ymd[0], ymd[1], ymd[2])) {
      return;
    }
    if (!this._validateRecord(w) || !this._validateRecord(r) || !this._validateRecord(l) || !this._validateRecord(s)) {
      return;
    }
    db = Ti.Database.open(DATABASE_NAME);
    info("insert into record values (?,?,?,?,?,?,?)", ymd[0] + ":" + ymd[1] + ":" + ymd[2] + ":" + w + ":" + r + ":" + l + ":" + s);
    db.execute("insert into record values (?,?,?,?,?,?,?)", ymd[0], ymd[1], ymd[2], w, r, l, s);
    db.close();
  },
  _convertToObj: function(rows) {
    var returnArr;
    returnArr = [];
    while (rows.isValidRow()) {
      returnArr.push({
        year: rows.fieldByName("year"),
        month: rows.fieldByName("month"),
        day: rows.fieldByName("day"),
        write: rows.fieldByName("write"),
        read: rows.fieldByName("read"),
        listen: rows.fieldByName("listen"),
        speak: rows.fieldByName("speak")
      });
      rows.next();
    }
    return returnArr;
  }
};
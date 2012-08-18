var DATABASE_NAME, TABLE;
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
    db = Ti.Database.open(DATABASE_NAME);
    info(sql, value + ":" + y + ":" + m + ":" + d);
    db.execute(sql, value, y, m, d);
    info("select * from " + this.tableName + " " + where, y + ":" + m + ":" + d);
    rows = db.execute("select * from " + this.tableName + " " + where, y, m, d);
    db.close();
    return rows;
  },
  addRecord: function(w, r, l, s, ymd) {
    var db;
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
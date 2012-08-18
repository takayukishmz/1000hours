var DATABASE_NAME, TABLE;
DATABASE_NAME = "1000";
TABLE = {
  RECORD: 'record'
};
exports.Database = {
  hoge: 1,
  createDb: function() {
    return Ti.Database.install("record.sqlite", DATABASE_NAME);
  },
  createTable: function(tableName) {
    var db, table;
    table = TABLE[tableName];
    if (!table) {
      return;
    }
    db = Ti.Database.open(DATABASE_NAME);
    db.execute("create table if not exists " + table + " (" + "year integer," + "month integer," + "day integer," + "writing integer," + "reading integer," + "listening integer," + "speaking integer" + ")");
    db.close();
  },
  getMonthlyData: function(_year, _month) {
    var db, retData, rows;
    retData = [];
    db = Ti.Database.open(DATABASE_NAME);
    rows = db.execute("select * from record where year=? and month=?", _year, _month);
    while (rows.isValidRow()) {
      retData.push({
        year: rows.fieldByName("year"),
        month: rows.fieldByName("month"),
        day: rows.fieldByName("day"),
        writing: rows.fieldByName("writing"),
        reading: rows.fieldByName("reading"),
        listening: rows.fieldByName("listening"),
        speaking: rows.fieldByName("speaking")
      });
      rows.next();
    }
    db.close();
    return retData;
  },
  /*
  	# update a Column.
  	*/
  updateBy: function(column, value, ymd) {
    var d, db, m, rows, sql, where, y;
    where = "where year =? and month = ? and day = ?";
    sql = "update " + TABLE.RECORD + " set writing =? " + where;
    y = ymd[0];
    m = ymd[1];
    d = ymd[2];
    db = Ti.Database.open(DATABASE_NAME);
    db.execute(sql, value, y, m, d);
    rows = db.execute("select * from " + TABLE.RECORD + " " + where, y, m, d);
    db.close();
    return rows;
  },
  addRecord: function(year, month, day, w, r, l, s) {
    var db;
    db = Ti.Database.open(DATABASE_NAME);
    db.execute("insert into record values (?,?,?,?,?,?,?)", year, month, day, w, r, l, s);
    return db.close();
  },
  deleteItem: function(_id) {
    var mydb;
    mydb = Ti.Database.open(DATABASE_NAME);
    mydb.execute("delete from todo where ROWID = ?", _id);
    return mydb.close();
  }
  /*
  	year
  	month
  	day
  	writing
  	reeding
  	lestening
  	speaking
  	
  	*/
};
DATABASE_NAME = "1000"
TABLE = 
	RECORD : 'record'


exports.Record = 
	tableName : 'record'
	#temporary
	# if other table is needed, this method should move common or parent class
	createDb : () ->
		Ti.Database.install "record.sqlite", DATABASE_NAME
		return
	#temporary
	# if other table is needed, this method should move common or parent class
	
	reset : (table) ->
		db = Ti.Database.open(DATABASE_NAME)
		db.execute "drop table if exists "+@tableName
		db.close()
		
		@createTable table
		return 
	
	#temporary
	# if other table is needed, this method should move common or parent class
	createTable : (tableName) ->
		table = TABLE[tableName]
		if !table
			return
		
		db = Ti.Database.open(DATABASE_NAME)
		db.execute "create table if not exists "+table+" ("+
				"year integer,"+
				"month integer,"+
				"day integer,"+
				"write integer,"+
				"read integer,"+	 
				"listen integer,"+ 
				"speak integer"+
			")"
		db.close()
		return 
		
	getRawData :() ->
		retData = []
		db = Ti.Database.open DATABASE_NAME
		rows = db.execute "select * from "+@tableName
		retData = @_convertToObj rows
		db.close()
		retData
		
		
	getMonthlyData : (_year, _month) ->
		retData = []
		db = Ti.Database.open DATABASE_NAME
		rows = db.execute "select * from "+@tableName+" where year=? and month=?", _year, _month
		retData = @_convertToObj rows
		db.close()
		retData
	###
	 update a Column.
	###
	updateBy : (column, value, ymd) ->		
		info 'updateBy'+column
		where ="where year =? and month = ? and day = ?"
		sql = "update "+@tableName+" set "+column+"=? "+where		
		y = ymd[0]
		m = ymd[1]
		d = ymd[2]
		
		db = Ti.Database.open(DATABASE_NAME)
		info sql, value+":"+y+":"+m+":"+d
		db.execute sql, value, y, m, d
		info "select * from "+@tableName+" "+where, y+":"+m+":"+d
		rows = db.execute("select * from "+@tableName+" "+where, y,m,d)		
		db.close()
		rows
		
		
	addRecord : (w, r, l, s, ymd) ->
		db = Ti.Database.open(DATABASE_NAME)
		info "insert into record values (?,?,?,?,?,?,?)", ymd[0]+":"+ymd[1]+":"+ymd[2]+":"+w+":"+r+":"+l+":"+s
		db.execute "insert into record values (?,?,?,?,?,?,?)",ymd[0], ymd[1], ymd[2], w,r,l,s
		db.close()	
		return
		
	_convertToObj : (rows) ->
		returnArr = []
		while rows.isValidRow()
			returnArr.push
				year: rows.fieldByName("year")
				month: rows.fieldByName("month")
				day: rows.fieldByName("day")
				write: rows.fieldByName("write")
				read: rows.fieldByName("read")
				listen: rows.fieldByName("listen")
				speak: rows.fieldByName("speak")
			
			rows.next()
				
		returnArr
	
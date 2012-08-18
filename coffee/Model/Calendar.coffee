db = require('DB/Record').Record
Const = require('Lib/Const').Const
EventType = require('Event/EventType').EventType

class Calendar
	MONTH_LENGTH : [31,28,31,30,31,30,31,31,30,31,30,31]
	MONTH_NAME : ['January','February','March','April','May',"June",'July','August','September','October','November','December']
	WEEK_NAME : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	constructor : () ->
		@_reference = {}
		@_selectedMonth = null
		@_selectedDay = null
		@date = null
		@_year = null
		@_month = null
		@_calData = []
	
	
	getMonthName : () =>
		return @MONTH_NAME[@_month-1]
	
	getYear : () =>
		return @_year
	
	setSelectedDay : (day) ->
		@_selectedDay = day
		return
	
	getSelectedDay : () ->
		return @_selectedDay
		
	getMockData : () ->
		@_reference = {}
		for i in mock
			@_reference[i.day] = i
		return @_reference
		
	setMonthlyData : () ->
		info 'setMonthlyData'
		@_reference = {}
		data = db.getMonthlyData @_year, @_month
		for i in data
			@_reference[i.day] = i
		
		return
	
	_setMonthLength : () ->
		leapYear = if (@_year%4 == 0 && @_year%100 != 0) or (@_year%400 == 0) then 0 else 1
		@_monthLength = [31,28+leapYear,31,30,31,30,31,31,30,31,30,31]
		return
		
	getMonthLength : (month) ->
		return this._monthLength[month-1]
		
	getCalDataLength : () ->
		weekIndex = @getStartDay()
		monthLength = @getMonthLength @_month
		len = weekIndex+monthLength
		info 'len',len
		
		return weekIndex+monthLength
		
	setCalendarData : () =>
		@setMonthlyData()
		monthLength = @getMonthLength @_month
		calArr = []
		
		for	i in [1..monthLength]
			record = @_reference[i]
			calArr.push
				day: i
				show:true
				record:record
		
		weekIndex = @getStartDay()
		lastDay = @getMonthLength @_month
		
		
		day = lastDay
		for i in [0...weekIndex]
			calArr.unshift 
				day:day
				show:false
			day--
		
		max = if weekIndex+monthLength > 35 then 42 else 35
		blanckNum = max - (weekIndex+monthLength)
		
		for i in [1..blanckNum]
			calArr.push 
				day:i
				show:false
		
		@_calData = calArr
		info '#setCalendarData# month', @_month+"year:"+@_year+"weekIndex:"+weekIndex
		info 'setCalendarData',JSON.stringify calArr
		
		Ti.App.fireEvent EventType.update_cal, {"data": @_calData }
		return
		
	getWeekNameArray : () ->
		return @WEEK_NAME
		
	getMonthLengthArray : () ->
		return @_monthLength
		
	getStartDay　: () ->
		# days = 0
		# for i in @_monthLength
		# 	days+=i
		# 
		# return Math.floor((@_year*365.2425+days)%7) #その月の開始曜日を取得
		
		d = new Date(@_year+"/"+@_month+"/"+1)
		return d.getDay()
	
	setDate : (date) ->
		@date = date
		@_year = date.getFullYear()
		@_month = date.getMonth()+1
		
		@_setMonthLength()
		
		return
		
	setNextMonth:() =>
		if @_month == 12
			@_month = 1
			@_year++
		else 
			@_month++
		
		return
		
	setBeforeMonth:() =>
		if @_month == 1
			@_month = 12
			@_year--
		else 
			@_month--
		
		return
		
		
	getDate : () ->
		return @date
	
	updateTimeData : (type,hour, minute, day) =>
		time = minute + @_convertToMinute hour
		ymdArr = [@_year,@_month,day]
		info 'updateTimeData', time
		
		if @_reference[day] 	#update 
			row = db.updateBy type,time,ymdArr
		else # when record not exists, insert new record
			@_insertTimeByType type, time, ymdArr
		
		@setCalendarData()
		return
		
	_insertTimeByType : (type,value,ymd) ->
		values = []
		types = Const.TIME_TYPE
		
		for key, index in types
			info key
			if key == type
				info 'match'
				values[index] = value
			else
				values[index] = 0
				
		db.addRecord values[0], values[1],values[2], values[3], ymd
		
	_convertToMinute : (hour) ->
		return hour * 60
	
	_convertToHour : (minute) ->
		hour = Math.floor(minute / 60)
		return hour
		
	convertToHHMM : (minute) ->
		hh = @_convertToHour minute
		mm = minute-(hh*60)
		
		return [hh,mm]
	
			
	###
		use for only debug
	###
	clearDB : () ->
		db.reset("RECORD")
		return
	
	#check day is past or future
	isPastDay : (day) ->
		today = new Date()
		
		if @_month > (today.getMonth()+1)
			return false
		
		if day > today.getDate()
			return false
		
		return true
	
	isPastMonth : () ->
		today = new Date()
		if @_month > (today.getMonth()+1)
			return false
		
		return true
	
	getDayIndexFromDay : (day) =>
		d = new Date(@_year+"/"+@_month+"/"+day)
		return d.getDay()
	
	
		
exports.Calendar = Calendar



mock = [
	{day:1, listening:10, writing:0,speaking:0,reading:0}
	{day:2, listening:10, writing:20,speaking:0,reading:0}
	{day:3, listening:10, writing:20,speaking:30,reading:0}
	{day:4, listening:10, writing:20,speaking:30,reading:40}
	{day:5, listening:10, writing:20,speaking:30,reading:40}
	{day:6, listening:10, writing:20,speaking:30,reading:0}
	{day:7, listening:0, writing:0,speaking:30,reading:40}
	{day:8, listening:10, writing:20,speaking:30,reading:40}
	{day:9, listening:10, writing:20,speaking:30,reading:40}
	{day:10, listening:0, writing:0,speaking:0,reading:0}
	{day:12, listening:10, writing:20,speaking:30,reading:40}
	{day:15, listening:10, writing:20,speaking:30,reading:40}
	{day:18, listening:0, writing:20,speaking:0,reading:40}
	{day:19, listening:0, writing:0,speaking:30,reading:40}
	{day:21, listening:10, writing:20,speaking:30,reading:40}
	{day:22, listening:10, writing:20,speaking:0,reading:40}
	{day:26, listening:0, writing:0,speaking:30,reading:40}
	{day:29, listening:10, writing:0,speaking:30,reading:0}
	{day:30, listening:10, writing:20,speaking:30,reading:0}
]
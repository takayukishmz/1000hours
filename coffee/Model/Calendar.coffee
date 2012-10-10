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
		# @_today = {}
	
	
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
		
		return weekIndex+monthLength
		
	setCalendarData : () =>
		@setMonthlyData()
		@setTodayRecord()
		calArr = []
		monthLength = @getMonthLength @_month
		
		for	i in [1..monthLength]
			record = @_reference[i]
			
			calArr.push
				isSelected: @_selectedDay == i
				day: i
				show:true
				record:record
				isToday : @isToday i
		
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
		# info '#setCalendarData# month', @_month+"year:"+@_year+"weekIndex:"+weekIndex
		# info 'setCalendarData',JSON.stringify calArr
		
		Ti.App.fireEvent EventType.update_cal, {"data": @_calData }
		return
		
	setTodayRecord : () ->
		date = new Date()
		year = date.getFullYear()
		month = date.getMonth()+1		
		day = date.getDate()
		record = db.getSelectOne year, month, day
				
		@_today = 
			year : year
			month : month
			day : day
			record : record
		
		return
		
	getTodayRecord : () ->
		if !@_today
			@setTodayRecord()
		
		data = 
			day: @_today.day
			show:true
			record:@_today.record
		
		return data
		
	getWeekNameArray : () ->
		return @WEEK_NAME
		
	getMonthLengthArray : () ->
		return @_monthLength
		
	getStartDay　: () ->
		d = new Date(@_year+"/"+@_month+"/"+1)
		return d.getDay()
	
	setDate : (date) ->
		@date = date
		@_year = date.getFullYear()
		@_month = date.getMonth()+1
		
		@_setMonthLength()
		
		return
		
	setNextMonth:() =>
		@_selectedDay = 0
		if @_month == 12
			@_month = 1
			@_year++
		else 
			@_month++
		
		return
		
	setBeforeMonth:() =>
		@_selectedDay = 0
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
		# info 'updateTimeData', time
		
		if @_reference[day] 	#update 
			row = db.updateBy type,time,ymdArr
		else # when record not exists, insert new record
			@_insertTimeByType type, time, ymdArr
		
		Ti.App.fireEvent EventType.update_selected_day, {timeType:type, day:day, time:time}
		
		@setCalendarData()
		return
		
	_insertTimeByType : (type,value,ymd) ->
		values = []
		types = Const.TIME_TYPE
		
		for key, index in types
			if key == type
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
	isPastDay : (selectedDay) ->
		#selected day
		month = '0'+@_month.toString()
		day = '0'+selectedDay.toString()
		
		#today
		today = new Date()
		todayY = today.getFullYear()
		todayM = today.getMonth()+1
		todayD = today.getDate()
		todayM = '0'+todayM.toString()
		todayD = '0'+todayD.toString()
		
		todayYMD = @_year.toString()+todayM.substr(-2,2).toString()+todayD.substr(-2,2).toString()
		selectedYMD = todayY.toString()+month.substr(-2,2).toString()+day.substr(-2,2).toString()
		
		if selectedYMD > todayYMD
			return false
			
		return true
	
	isPastMonth : () ->
		today = new Date()
		if @_month > (today.getMonth()+1)
			return false
		
		return true
	
	isToday : (day) ->
		if @_today.year == @_year and @_today.month == @_month and @_today.day == day
			return true
			
		return false
	
	getDayIndexFromDay : (day) =>
		d = new Date(@_year+"/"+@_month+"/"+day)
		return d.getDay()
	
	
	
		
exports.Calendar = Calendar
db = require('DB/Record').Record
Const = require('Lib/Const').Const
EventType = require('Event/EventType').EventType

class Chart
	MONTH_LENGTH : [31,28,31,30,31,30,31,31,30,31,30,31]
	GOAL_HOUR:1000,
	WEEK_NAME : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	constructor : () ->
		@_times = 
			write:0
			read:0
			listen:0
			speak:0
	
	setGraphData : () ->
		@_times = 
			write:0
			read:0
			listen:0
			speak:0
		
		@_setTimeData()
		@_setBarGragh()
		@_setCirCleGraph()
	
	_setTimeData : () =>
		data = db.getRawData()
		
		for	i in data
			@_times.write += i.write if i.write
			@_times.read += i.read if i.read
			@_times.listen += i.listen if i.listen
			@_times.speak += i.speak if i.speak
			
		# info 'ChartModel#_setTimeData', JSON.stringify @_times
		return
	
	getTotalTime : () =>
		total = 0
		for key,value of @_times
			total += value	
		return total
	
	_setBarGragh : () =>
		time = @getTotalTime()
		timeData = @_convertToHourAndMinute time
		info 'total', time
		Ti.App.fireEvent EventType.update_bar_graph, timeData
		
	_setCirCleGraph : () =>
		if !@_times
			return
		
		Ti.App.fireEvent EventType.update_circle_graph, @_times
		
	_convertToHourAndMinute : (time) ->
		hour = Math.floor(time / 60)
		minute = time - hour * 60
		return  { hour : hour, minute : minute }  
		
	getTotalTimeByHHMM : () =>
		total = @getTotalTime()
		hhmm = @_convertToHourAndMinute total
		return hhmm
	
	_calcWillFinishDate : (hour) ->
		data = db.getRawData()
		len = data.length
		first = data[0]
		last =  data[data.length-1]
		
		if !hour or hour <= 0 or !first or !last
			info 'ERROR hour:'+hour+' first:'+JSON.stringify(first)+' last:'+JSON.stringify(last)
			return false
		
		#to calc diff
		unixFirst = new Date(first.year, first.month-1, first.day).getTime()
		if len != 1
			unixLast = new Date(last.year, last.month-1, last.day).getTime()
			diff = unixLast - unixFirst
		else
			diff = 24*60*60*1000# iday
		
		#to calc ratio
		ratio  = if hour then Math.floor @GOAL_HOUR/hour else 0
		
		if !diff or !ratio
			info 'ERROR hour:'+hour+' first:'+JSON.stringify(first)+' last:'+JSON.stringify(last)
			info 'ERROR diff:'+diff+' ratio:'+ratio
			return false
		
		dd = new Date()
		dd.setTime unixFirst+ratio*diff #set goal unixtime
		
		goalDay = 
			year:dd.getYear()+1900
			month:dd.getMonth()+1
			day:dd.getDate()
		
		info goalDay
				
		return goalDay
	
	getSnsShareText : (defaultMessage) =>
		# alert defaultMessage
		hhmm = @getTotalTimeByHHMM()
		goalDay = @_calcWillFinishDate hhmm.hour+hhmm.minute/60
		
		# in case calculating is not abailable, change default message.
		if !goalDay
			defaultMessage = L 'message_not_enough_case'
		
		text = String.format defaultMessage, hhmm.hour, hhmm.minute,goalDay.year,goalDay.month,goalDay.day
		return text
	
		
exports.Chart = Chart
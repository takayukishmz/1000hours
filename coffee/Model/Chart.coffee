db = require('DB/Record').Record
Const = require('Lib/Const').Const
EventType = require('Event/EventType').EventType

class Chart
	MONTH_LENGTH : [31,28,31,30,31,30,31,31,30,31,30,31]

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
		
		Ti.App.fireEvent 'hoge'		
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
		
	
		
exports.Chart = Chart
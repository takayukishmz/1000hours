BaseWindow 	  = require('Window/BaseWindow').BaseWindow
TitlePanel    = require('Component/Calendar/TitlePanel').TitlePanel
CalendarView  = require('Component/Calendar/CalendarView').CalendarView
Calendar  	  = require('Model/Calendar').Calendar
ChartWindow   = require('Window/ChartWindow').ChartWindow
InputTimeWindow   = require('Window/InputTimeWindow').InputTimeWindow
EventType = require('Event/EventType').EventType

class CalendarWindow extends BaseWindow
	WEEK_COLOR : ["reds","#fff","#fff","#fff","#fff","#fff","#fff"]
	constructor : () ->
		super title : getText 'title_calendar'
		
		@_model = new Calendar()
		@_model.setDate new Date()
		
		@_calendar = new CalendarView(@_model)
		
		@_model.setMonthlyData()
		
		@win.add @_calendar.getNodeView()		
		@win.hideTabBar()
		return @win
	setView: () ->
		
		return
		
	setButton: () =>
		rightBtn = Ti.UI.createButton
			top:0
			right:0
			width:66
			height:44
			backgroundImage : global.getImagePath 'Calendar/btn_chart'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_chart_dw'
		
		rightBtn.addEventListener 'click', (e) ->
			global.tabs.currentTab.open new ChartWindow(),{animated:true}
			return
		
		
		@win.rightNavButton = rightBtn
	
	setEvent: () =>
		Ti.App.addEventListener EventType.update_target_time, (data) =>
			
			info 'update_target_time', data.day
			@_model.updateTimeData(data.key, data.hour, data.minute, data.day)
			return

		Ti.App.addEventListener EventType.open_input, (data) =>
			info 'handle:open_input',JSON.stringify data
			hhmm = @_model.convertToHHMM data.time
			hour = hhmm[0]
			minute = hhmm[1]
			
			newWindow = new InputTimeWindow(data.timeType, hour, minute, data.day)
			newWindow.open()
			return		
			
		Ti.App.addEventListener EventType.click_box, (e) =>
			info 'click_box'
			day = 0
			
			#toggle new selected day
			if @_model.isPastDay e.day
				@_model.setSelectedDay e.day
				day = e.day
			#toggle aleady selected day
			else if @_model.isPastMonth()
				day = @_model.getSelectedDay()
			#reset selected
			else 
				day = 0
			
			Ti.App.fireEvent EventType.set_unselect, {day:day}	
			return
		
exports.CalendarWindow = CalendarWindow
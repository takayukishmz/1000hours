BaseWindow 	  = require('Window/BaseWindow').BaseWindow
TitlePanel    = require('Component/Calendar/TitlePanel').TitlePanel
CalendarView  = require('Component/Calendar/CalendarView').CalendarView
Calendar  	  = require('Model/Calendar').Calendar
ChartWindow   = require('Window/ChartWindow').ChartWindow
SettingNavWindow = require('Window/SettingNavWindow').SettingNavWindow
Input   = require('Component/Calendar/Input').Input
EventType = require('Event/EventType').EventType
TutorialWindow 	= require('Window/TutorialWindow').TutorialWindow
class CalendarWindow extends BaseWindow
	WEEK_COLOR : ["reds","#fff","#fff","#fff","#fff","#fff","#fff"]
	constructor : () ->
		super 
			title : getText 'title_calendar'
		
		@_model = new Calendar()
		@_model.setDate new Date()
		
		@_inputDialog = new Input()
		@_calendar = new CalendarView(@_model)
		@_settingNavWindow = new SettingNavWindow()
		@_chartWindow = new ChartWindow()
		
		@_model.setMonthlyData()
		
		@win.add @_calendar.getNodeView()		
		@win.add @_inputDialog.getNodeView()
		
		@win.hideTabBar()
		
		return @win
	
	setView: () =>
		@setHeaderTitleImage
			backgroundImage : global.getImagePath 'Calendar/title_calendar'
			height:21
			width:120
			left:100
			top:12
		
		return
		
	setButton: () =>
		rightBtn = Ti.UI.createButton
			top:0
			left:263
			width:57
			height:45
			backgroundImage : global.getImagePath 'Calendar/btn_chart'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_chart_dw'
		
		rightBtn.addEventListener 'click', (e) =>
			global.tabs.currentTab.open @_chartWindow,{animated:true}
			return
		
		
		# @win.rightNavButton = rightBtn
		@win.add rightBtn
		
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:57
			height:45
			backgroundImage : global.getImagePath 'Calendar/btn_setting'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_setting_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			# global.tabs.currentTab.open new ChartWindow(),{animated:true}
			@_settingNavWindow.open modal:true
			return
			
		# @win.rightNavButton = rightBtn
		@win.add leftBtn
		return
	setEvent: () =>
		Ti.App.addEventListener EventType.update_target_time, (data) =>
			
			@_model.updateTimeData(data.key, data.hour, data.minute, data.day)
			return

		Ti.App.addEventListener EventType.open_input, (data) =>
			hhmm = @_model.convertToHHMM data.time
			hour = hhmm[0]
			minute = hhmm[1]
			
			@_inputDialog.setData data.timeType, hour, minute, data.day
			@_inputDialog.open()
			return		
			
		Ti.App.addEventListener EventType.click_box, (e) =>
			# info 'click_box'
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
		
		@win.addEventListener 'focus', (e) =>
			# info '1'
			if !global.tutorialManager.isDone global.tutorialManager.LIST.START
				# info '2'
				@_tutorialWindow = new TutorialWindow {standAlone:true}
				@_tutorialWindow.open modal:true
			# 		
		return
	
exports.CalendarWindow = CalendarWindow
BaseWindow 	= require('Window/BaseWindow').BaseWindow
EventType = require('Event/EventType').EventType

class InputTimeWindow extends BaseWindow
	
	HOUR : [0..23]
	MINUTE : [0..59]
	
	constructor : (@timeType, @hour, @minute,@day) ->		
		@params = 
			# navBarHidden:true
			# modal:true
			backgroundColor :'red'
			opacity : 0.5
			title: getText 'title_Input'
			top:0
			height:350
			width:'auto'
		
		super @params		
		
		return @win
		
	setView:() =>	
		pickerBase = Ti.UI.createView
			bottom:0
			height:270
		
		@picker = Ti.UI.createPicker
			left:100
			# format24:true
			# type:Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER 
		
		@picker.selectionIndicator = true
		hourColumn = Ti.UI.createPickerColumn()
		minuteColumn = Ti.UI.createPickerColumn()
		
		
		for value in @HOUR
			row = Ti.UI.createPickerRow title:value.toString()
			hourColumn.addRow row
			
		for value in @MINUTE
			row = Ti.UI.createPickerRow title: value.toString()
			minuteColumn.addRow row
		
		@picker.add [hourColumn,minuteColumn]
		
		@win.add @picker
		
		# Ti.App.nav = Ti.UI.iPhone.createNavigationGroup 
		# 	window:@subWin
		# 
		# @win.add Ti.App.nav
		
		
		return
		
	setEvent : () ->
		@win.addEventListener 'open', () =>
			@picker.setSelectedRow 0, @hour, true
			@picker.setSelectedRow 1, @minute, true
			return
		
	setButton : () =>
		save = Ti.UI.createButton
			bottom:10
			height:44
			width:300
			left:10
			color :'blue'
			title:'save'
		
		@win.add save
		
		save.addEventListener 'click', () =>
			hourIndex = @picker.getSelectedRow(0).title
			minIndex = @picker.getSelectedRow(1).title
			data = 
				day:@day
				key : @timeType
				hour:@HOUR[hourIndex]
				minute:@MINUTE[minIndex]
			
			Ti.App.fireEvent EventType.update_target_time, data
			
			@win.close()
			return
			
		
exports.InputTimeWindow = InputTimeWindow

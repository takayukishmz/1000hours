BaseWindow 	= require('Window/BaseWindow').BaseWindow
EventType = require('Event/EventType').EventType

class InputTimeWindow extends BaseWindow
	
	HOUR : [0..23]
	MINUTE : [0..59]
	
	constructor : (@timeType, @hour, @minute,@day) ->		
		@params = 
			title:'rootWindow'
			navBarHidden:true
			modal:true
			
		super @params		
		Ti.App.rootWindow = @win		
		return @win
		
	setView:() =>
		@subWin = Ti.UI.createWindow 
			title: getText 'title_Input'
			backgroundColor:'#333'
			barColor: '#333'	
		
		@subWin.barImage = global.getImagePath 'Common/topbar'		
			
		pickerBase = Ti.UI.createView
			bottom:0
			height:270
		
		@picker = Ti.UI.createPicker()
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
				
		@subWin.add @picker
		
		Ti.App.nav = Ti.UI.iPhone.createNavigationGroup 
			window:@subWin
		
		@win.add Ti.App.nav
		
		
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
		
		@subWin.add save
		
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

BaseComponent = require('Component/Common/BaseComponent').BaseComponent
EventType = require('Event/EventType').EventType

class Input extends BaseComponent
	HOUR : [0..23]
	MINUTE : [0..59]
	
	ROW_NO :
		HOUR:1
		MINUTE:2
	
	constructor : () ->
		super 
			top:-480
			left:0
			height:480
			width:'auto'
	
	setData : (@timeType, @hour, @minute,@day) ->
		@_title.backgroundImage = global.getImagePath 'Calendar/Input/tm_'+@timeType

		# @picker.value=new Date(2012,1,1)		
		# info new Date(2012,1,1)	
		# @picker.countDownDuration = 60000*(minute+(@hour*60))

		return
		
	setView: () ->
		
		@_bg = Ti.UI.createView
			top:0
			left:0
			height:480
			width:320
			backgroundColor:'black'
			opacity:0.5
		
		@_panel = Ti.UI.createView
			top:-480
			left:0
			height:385
			width:320
			backgroundImage : global.getImagePath 'Calendar/Input/bg_modal'
		
		@_title = Ti.UI.createView
			width:140
			height:25
			top:12
			left:(320-125)/2
		
		@add @_bg		
		@add @_panel
		@_panel.add @_title
			
		@_buildPicker()
			
		return
	setEvent:() ->
		
	setButton:() =>
		saveBtn = Ti.UI.createButton
			backgroundImage : global.getImagePath 'Calendar/Input/btn_save_modal'
			backgroundSelectedImage : global.getImagePath 'Calendar/Input/btn_save_modal_dw'
			width:320
			height:50
			top:272
			left:0
		
		saveBtn.addEventListener 'click', (e) =>
			hourIndex = @picker.getSelectedRow(0).index
			minIndex = @picker.getSelectedRow(1).index
			
			data = 
				day:@day
				key : @timeType
				hour:@HOUR[hourIndex]
				minute:@MINUTE[minIndex]
			
			Ti.App.fireEvent EventType.update_target_time, data
			@close()
			return
		
		@_panel.add saveBtn		
		
		cancelBtn = Ti.UI.createButton
			backgroundImage : global.getImagePath 'Calendar/Input/btn_cancel_modal'
			backgroundSelectedImage : global.getImagePath 'Calendar/Input/btn_cancel_modal_dw'
			width:320
			height:50
			top:327
			left:0
	
		cancelBtn.addEventListener 'click', () =>
			@close()
			return
		
		@_panel.add cancelBtn
		return
	
	_buildPicker : () =>
		@picker = Ti.UI.createPicker
			left:15
			top:46
			width:290
			height:188
			selectionIndicator:true
			# type:Ti.UI.PICKER_TYPE_COUNT_DOWN_TIMER
			# countDownDuration:60000*60
			# value:new Date(2012,1,1)
		  
			
		
		hourColumn = Ti.UI.createPickerColumn()
		minuteColumn = Ti.UI.createPickerColumn()
		
		
		for value, i in @HOUR
			row = Ti.UI.createPickerRow
				title:"    "+value.toString()
				index:i
				fontSize:22
				rowNo:@ROW_NO.HOUR
						
			hourColumn.addRow row
			
		for value, j in @MINUTE
			row = Ti.UI.createPickerRow 
				fontSize:22
				index:j
				title: "    "+value.toString()
				rowNo:@ROW_NO.MINUTE
				
			minuteColumn.addRow row
		
		@picker.add [hourColumn,minuteColumn]
		
		@_panel.add @picker
		
		
		hour = Ti.UI.createLabel
			top:141.5
			left:91
			width: 72
			height: 30
			text: 'hours'
			# color: 'red',
			textAlign : 'left'
			font: {fontSize: 18,fontFamily: 'Helvetica Neue', fontWeight:'bold'}
		
		@_panel.add hour
		
		
		min = Ti.UI.createLabel
			top:141.5
			left:225
			width: 72
			height: 30
			text: 'mins'
			textAlign : 'left'
			font: {fontSize: 18,fontFamily: 'Helvetica Neue', fontWeight:'bold'}
		
		@_panel.add min
		
		@picker.addEventListener 'change',(e) =>
			row = e.row
			
			if row.rowNo == @ROW_NO.HOUR 
				if row.index == 1
					hour.text = 'hour'
				else 
					hour.text = 'hours'
			else if row.rowNo == @ROW_NO.MINUTE
				if row.index == 1
					min.text = 'min'
				else 
					min.text = 'mins'
			  # body...
			return
		
		return
	
	open:() =>
		@_view.setTop 0
		action = Titanium.UI.createAnimation
			top:0
			left:0
			duration:300
			curve:Titanium.UI.ANIMATION_CURVE_EASE_OUT
			
		@_panel.animate action
		@_setup()
		return

	_setup : () =>
		@picker.setSelectedRow 0, @hour, true
		@picker.setSelectedRow 1, @minute, true
		return
	
	close:() =>
		action = Titanium.UI.createAnimation
			top:-480
			left: 0
			duration:300
			curve:Titanium.UI.ANIMATION_CURVE_EASE_IN
		
		@_panel.animate action
		
		action.addEventListener 'complete',() =>
			@_view.setTop -480
			return
			
		return
	
exports.Input = Input


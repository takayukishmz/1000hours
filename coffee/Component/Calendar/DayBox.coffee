BaseComponent = require('Component/Common/BaseComponent').BaseComponent
Const = require('Lib/Const').Const
EventType = require('Event/EventType').EventType

class DayBox extends BaseComponent
	_ICON_NAME : ['write','read', 'listen', 'speak']
	_ICON_SIZE : [15,15]
	_ICON_MARGIN:6

	constructor : (@frame) ->
		@icons = []
		@time_types = Const.TIME_TYPE
		@_record = {}
		@_isSelected = false
		super
			left:@frame[0]
			top:@frame[1]
			width:@frame[2]
			height:@frame[3]
	
	setView: () =>
		@_button = Titanium.UI.createButton
			top:0
			left:0
			width:@frame[2]
			height:@frame[3]
			backgroundImage:global.getImagePath 'Calendar/bg_calender'
			backgroundSelectedImage:global.getImagePath 'Calendar/bg_calender_dw'
		
		
		@add @_button
		

		@day = Ti.UI.createLabel
			right: 5,
			top: 2,
			width: 30,
			height: 20,
			text: ''
			textAlign:"right"
			color: '#333333'
			shadowColor:'#ffffff'
			shadowOffset:{x:0,y:1},
			font: {fontFamily: 'American Typewriter', fontSize: 13}
		
		
		@_button.add @day
		
		@_buildIcons()
		return
	
	getState : () ->
		return @_isSelected
	
	toggle : (@_isSelected) =>	
		
		if @_isSelected
			@_button.backgroundImage = global.getImagePath 'Calendar/bg_calender_dw'
			
			if @_data.show
				@day.color = '#ffffff'
				@day.shadowColor = '#7a4822'
				@day.shadowOffset = {x:0,y:-1}
			
		else
			if @_data.isToday
				@_button.backgroundImage = global.getImagePath 'Calendar/bg_calender_today'
			else 
				@_button.backgroundImage = global.getImagePath 'Calendar/bg_calender'
			
			if @_data.show
				@day.color = '#333333'
				@day.shadowColor = '#ffffff'
				@day.shadowOffset = {x:0,y:1}
	
	setDay : (num) ->
		@day.text = num
		return
		
	hide : () ->
		@day.color = '#CCCCCC'
		@_button.setTouchEnabled false
		return
		
	show : () ->
		if @_isSelected
			@day.color = '#ffffff'
		else
			@day.color = '#333333'
		
		@_button.setTouchEnabled true
		return
	
	###
	data format is this:
	 {
		day: 1
		show:true
		record:record obj
		isToday : true
	}
	###
	setData : (data) ->
		@_data = data
		@setDay data.day
		@_record = data.record
		@
				
		if data.show
			@show()
		else 
			@hide()		
		
		for value, i in @time_types
			if !@_record or !@_record[@time_types[i]]
				@icons[i].setVisible false
			else
				@icons[i].setVisible true
		
		
		@toggle @_data.isSelected
		
		return
		
	setEvent:() ->
		# Ti.App.addEventListener EventType.set_unselect, (e) =>
		# 	if @day.text != e.day || !@_data.show
		# 		@toggle false
		# 	else 
		# 		@toggle true
		# 	return
		@_button.addEventListener 'touchstart', () =>
			@toggle true
			Ti.App.fireEvent EventType.click_box, @_data
			# @toggle true
			return
		
	_buildIcons : () ->
		cols = 0
		rows = 0
		width = @_ICON_SIZE[0]
		height = @_ICON_SIZE[1]
		margin = @_ICON_MARGIN
		for value, i in @_ICON_NAME
			top = 0 + height * rows -  rows  #各日付の表示位置制御
			left = 0 + width * cols -  cols 		
			
			icon = Ti.UI.createView
				top: 17+margin+(margin/2+width)*cols
				left:margin+(margin/2+height)*rows
				width:height
				height:width
				backgroundImage:global.getImagePath 'Calendar/mark_'+value.toLowerCase()
			
			icon.setVisible false
			
			@_button.add icon
			@icons.push icon
			
			if cols != 1
				cols++
			else
				cols = 0
				rows++

	
		
exports.DayBox = DayBox

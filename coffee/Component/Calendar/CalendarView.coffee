BaseComponent = require('Component/Common/BaseComponent').BaseComponent
DayBox 		  = require('Component/Calendar/DayBox').DayBox
Const 		  = require('Lib/Const').Const
EventType     = require('Event/EventType').EventType

class CalendarView extends BaseComponent
	SAMPLE_VALUE : [15,0,30, 0]	
	TYPE_NAMES :['write','read','listen','speak']
	WEEK_NAME : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	constructor :(@_model)->
		@times = []
		@boxes  = []
		@boxesScroll = []		
		@isNormalBg = false
		@isScrollBg = false
		@time_types = Const.TIME_TYPE
		super 
			contentWidth:'auto'
			contentHeight:'auto'
			top:0
			height:430
			width:320
		
		@switchCal()
		@_model.setCalendarData()
		@_title.text = @_model.getMonthName()
		@_year.text = @_model.getYear()
		
	setView : ()->
		@_buildDetailPanel()
		@_buildTitlePanel()
		@_buildScrollCal()
		@_buildNormalCal()
			
	setEvent : ()->
		#update selected day number 
		Ti.App.addEventListener EventType.click_box, (params) =>
			@setDetailPanel params
			return
		
		Ti.App.addEventListener EventType.update_cal, (e) =>
			info 'update_cal', JSON.stringify e.data
			@_data = e.data
			@updateCal()
			return
		
		@backMonthButton.addEventListener 'click', () =>
			@_model.setBeforeMonth()
			@switchCal()
			@_model.setCalendarData()
			@_title.text = @_model.getMonthName()
			@_year.text = @_model.getYear()
			return		
		
		@forwardMonthButton.addEventListener 'click', () =>
			@_model.setNextMonth()
			@switchCal()
			@_model.setCalendarData()
			@_title.text = @_model.getMonthName()
			@_year.text = @_model.getYear()
			return
		
		return
	
	setDetailPanel : (data) ->
		#validate day.
		if !@_model.isPastDay data.day
			alert 'Select past days'
			return
		
		@dayNum.text = data.day
		
		dayIndex = @_model.getDayIndexFromDay data.day
		@dayName.text = @WEEK_NAME[dayIndex]
		
		for value, i in @time_types
			if !data.record or !data.record[@time_types[i]]
				info i, value
				@times[i].text = 0	
				continue
				
			time = data.record[@time_types[i]]
			@_updateTime time,i
		return
	
	
	setButton : ()->
		
		
	updateCal : () =>
		len = @_model.getCalDataLength()
		if len <= 35 
			for	box, i in @boxes
				data = @_data[i]
				info 'normal setData', data.day+" daynum:"+@dayNum.text
				box.setData data
				
		else 
			for	box, i in @boxesScroll
				info 'scroll setData', i
				box.setData @_data[i]
		
		return
		
	_buildScrollCal : () ->
		@calScrollBg = Titanium.UI.createScrollView
			top:45
			height:300
			width:320
			contentWidth:320
			contentHeight:60*6-6
		
		cols = 0
		rows = 0
		
		for i in [0...42]
			box = @_buildBox(rows,cols)
			@calScrollBg.add box.getNodeView() 
			@boxesScroll.push box
			
			if cols != 6  #各日付は横6列まで
				cols++
			else
				cols = 0
				rows++			
		
		return
		
	_buildBox : (rows,cols) ->
		width = 46.7
		height = 60
		top = 0 + height * rows -  rows  #各日付の表示位置制御
		left = 0 + width * cols -  cols 				
		box = new DayBox [left,top,width, height]
		return box
		
	_buildNormalCal : () ->
		@calBg = Titanium.UI.createView
			top:45
			height:322
			width:320
		
		cols = 0
		rows = 0
		
		for i in [0...35]
			box = @_buildBox(rows,cols)
			@calBg.add box.getNodeView() 
			@boxes.push box
			
			if cols != 6  #各日付は横6列まで
				cols++
			else
				cols = 0
				rows++
			
		return
		
	switchCal : ()=>
		len = @_model.getCalDataLength()
		
		@resetDetail()
		if len <= 35
			@add @calBg
			@isNormalBg = true
			
			if @isScrollBg
				@remove @calScrollBg
				@isScrollBg = false
			
		
		else
			@add @calScrollBg
			@isScrollBg = true
			
			if @isNormalBg
				@remove @calBg
				@isNormalBg = false
							
		
		return
	

	_buildTitlePanel : () ->
		@_title = Ti.UI.createLabel
			top : 2
			left:30
			width: 150,
			height: 24,
			text: 'June'
			color: '#383838'
			textAlign:'right'
			font: {fontFamily: 'Helvetica Neue', fontSize: 22,fontWeight:"bold"}
		
		@add @_title
		
		
		@_year = Ti.UI.createLabel
			top : 6
			left:185
			width: 40
			height: 16
			text: ''
			color: '#999999'
			textAlign:'center'
			font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
		
		@add @_year
		
		#今日という日
		now = new Date()
		now.setHours(12)
		Y = now.getYear()+1900
		M = now.getMonth()+1
		
		#月を戻すボタン
		@backMonthButton = Ti.UI.createView
			color:"#fff",
			top:0, left:0, height:33, width:46,
			backgroundImage : global.getImagePath "Calendar/btn_before"
			
		@add @backMonthButton
			
		#月を進めるボタン
		@forwardMonthButton = Ti.UI.createLabel
			color:"#fff",
			top:0, right:0, height:33, width:46,
			backgroundImage : global.getImagePath "Calendar/btn_next"
		
		@add @forwardMonthButton
		
		@_setDaylabels()
	

	_setDaylabels : () ->
		for value, index in @WEEK_NAME

			title = Ti.UI.createLabel
				top:33
				left:45*index
				width:45
				height:12
				text: value
				color: '#333333'
				shadowColor:'#FFFFFF'
				textAlign:'center'
				font: {fontFamily: 'Helvetica Neue', fontSize: 12}
			@add title
		return
	

	_buildDetailPanel : () =>
		selectedBox = Titanium.UI.createView
			left: 0,
			top: 343,
			width: 76,
			height: 76,
			backgroundImage:global.getImagePath 'Calendar/bottom_date'
			
		@dayNum = Titanium.UI.createLabel
			left: 0,
			top: 8,
			width: 76,
			height: 33,
			text: '0',
			color: '#333333',
			textAlign : 'center'
			font: {fontFamily: 'American Typewriter', fontSize: 27}
			shadowColor:'#ffffff'
			shadowOffset:{x:0,y:2}
		
		@dayName = Titanium.UI.createLabel
			left: 0
			top: 43
			width: 76
			height: 21
			text: 'Mon'
			color: '#333333',
			textAlign : 'center'
			font: {fontFamily: 'American Typewriter', fontSize: 15}
			shadowColor:'#ffffff'
			shadowOffset:{x:0,y:2}
			
		@add selectedBox
		selectedBox.add @dayNum		
		selectedBox.add @dayName

		for category, i in @TYPE_NAMES
			categoryBox = Titanium.UI.createButton
				left: 76+62*i
				top: 343
				width: 62
				height: 76
				backgroundImage:global.getImagePath 'Calendar/bottom_'+category
				backgroundSelectedImage:global.getImagePath 'Calendar/bottom_'+category+'_dw'
				timeType : category
				index : i
			
			text = @SAMPLE_VALUE[i]
			
			@time = Titanium.UI.createLabel
				left:0
				top:24
				width:62
				height:26
				textAlign :'center'
				text: text
				color:'#333333'
				minimumFontSize:16
				font: {fontFamily: 'Helvetica Neue', fontSize:22,fontWeight:"bold"}
			
			@times.push @time
				
			@categoryLebel = Titanium.UI.createLabel
				left: 0,
				bottom:10,
				width: 62,
				height: 20,
				text: 'min'
				textAlign :'center'
				color:'#808080'
				font: {fontFamily: 'Helvetica Neue', fontSize: 11,fontWeight:"semibold"}
			
			icon = Titanium.UI.createLabel
				right: 2,
				top: 35,
				width: 62,
				height: 10,
				color:"#808080"
				textAlign :'right'
				text: '▼'
				font: {fontFamily: 'Helvetica', fontSize: 8}

			@add categoryBox

			categoryBox.add @time

			categoryBox.add @categoryLebel
			categoryBox.add icon
			
			categoryBox.addEventListener 'click', (e) =>			
				info 'categoryBox click',JSON.stringify e
				
				data = 
					timeType : e.source.timeType.toLowerCase()
					day : @dayNum.text
					time : @times[e.source.index].text
				
				Ti.App.fireEvent EventType.open_input, data
				return
		return			
	
	resetDetail : () =>
		@dayNum.text = '-'
		@dayName.text = '-'
		for time in @times
			time.text = '-'
		
		return
		
	_updateTime : (time, index) =>
		if !time
			return
		
		@times[index].text = time
		if time.toString().length > 3
			info JSON.stringify @times[index].font.fontSize
			@times[index].font = {fontFamily: 'Helvetica Neue', fontSize:18,fontWeight:"bold"}
		else 
			info JSON.stringify @times[index].font.fontSize, 'short'
			@times[index].font = {fontFamily: 'Helvetica Neue', fontSize:22,fontWeight:"bold"}
		
		return
	
		
exports.CalendarView = CalendarView


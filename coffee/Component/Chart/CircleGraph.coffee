BaseComponent = require('Component/Common/BaseComponent').BaseComponent
Const = require('/Lib/Const').Const
EventType = require('Event/EventType').EventType

class CircleGraph extends BaseComponent
	
	_ICON_SIZE:[35,29]
	_ICON_MARGIN:10
	_ICON_POS:[180,180]

	_WEBVIEW_URL_CIRCLE :"onethousandhours.site44.com?"
	constructor : () ->
		@_hours = []
		@_mins = []
		@paramCache = ""
		super
			top:45
			height:'333'
		
		
		return
	
	setView : () =>
		timeTypes = Const.TIME_TYPE
		
		for value, i in timeTypes
			left = @_ICON_POS[0]
			top = @_ICON_POS[1]+i*(@_ICON_SIZE[1]+@_ICON_MARGIN)
			
			icon = Ti.UI.createView
				top: top
				left:left
				width:@_ICON_SIZE[0]
				height:@_ICON_SIZE[1]
				backgroundImage:global.getImagePath 'Chart/icon_'+value.toLowerCase()
			
			@add icon
			
			hour = Ti.UI.createLabel
				top: top
				left:217
				width:30
				height:25
				text: ''
				textAlign:'right'
				color: '#000'
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add hour
			@_hours.push hour
			
			h = Ti.UI.createLabel
				top: top
				left:250
				width:30
				height:25
				text: 'h.'
				color: '#333333'
				shadowColor:"#FFFFFF"
				shadowOffset:{x:0,y:2}
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add h
			
			min = Ti.UI.createLabel
				top: top
				left:256
				width:30
				height:25
				text: ''	
				textAlign :'right'
				color: '#000'
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add min
			@_mins.push min
			
			m = Ti.UI.createLabel
				top: top
				left:288
				width:100
				height:25
				text: 'm'
				color: '#333333'
				shadowColor:"#FFFFFF"
				shadowOffset:{x:0,y:2}
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			@add m
				
		
		@webviewMsg = Ti.UI.createLabel
			top:235
			left:20
			width:160
			height:50
			text : ''
			textAlign : 'center'
			color: '#444'
			font: {fontFamily: 'Helvetica Neue', fontSize: 16}
			
		@webview = Ti.UI.createWebView
			backgroundColor: 0
			# borderRadius: 1
			# borderWidth : 5
			# borderColor :0 
			# scalesPageToFit:true
			# touchEnabled: false
			loading:false
			top:175
			left:10
			width:140
			height:140
			# center = 90:245
		
		@circleCover = Ti.UI.createView
			top:178
			left:13
			width:140
			height:140
			backgroundImage : global.getImagePath 'Chart/circle'
		
		@circleCover.setVisible false
		
		@webview.addEventListener 'beforeload', (e) =>
			info 'WEBVIEW beforeload'
			@circleCover.setVisible false
			@webviewMsg.text = L 'webview_load'
			return
		
		@webview.addEventListener 'error', (e) =>
			info 'WEBVIEW error'
			@circleCover.setVisible false
			@webviewMsg.text =  L 'webview_error'
			return
		
		@webview.addEventListener 'load', (e) =>
			info 'WEBVIEW load'
			@webviewMsg.text = ''
			@circleCover.setVisible true
			return
		
		
		@webview.addEventListener 'touchmove', () ->
			return
		
		
		@webview.url = 'https://'+@_WEBVIEW_URL_CIRCLE
		
		@add @webview
		@add @webviewMsg
		@add @circleCover
		return
	
	_setTime: (times) =>
		timeTypes = Const.TIME_TYPE
		
		for value, i in timeTypes
			hourValue = Math.floor(times[value]/60)
			minuteValue = times[value] - hourValue*60 
			
			left = @_ICON_POS[0]
			top = @_ICON_POS[1]+i*(@_ICON_SIZE[1]+@_ICON_MARGIN)
			
			@_hours[i].text = hourValue
			@_mins[i].text = minuteValue
		
		param = ""
		for value, i in timeTypes
			param += value+'='+times[value]+'&'
		
		# info @paramCache
		# info param
		# info @paramCache == param
		if @paramCache and @paramCache == param
			info 'use cache'
		else 
			@paramCache = param
			@webview.url = 'https://'+@_WEBVIEW_URL_CIRCLE+param
		
		return 
		
	setEvent : () ->
		Ti.App.addEventListener EventType.update_circle_graph, (times) =>
			@_setTime times
			return

	
exports.CircleGraph = CircleGraph


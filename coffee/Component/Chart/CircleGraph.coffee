BaseComponent = require('Component/Common/BaseComponent').BaseComponent
Const = require('/Lib/Const').Const
EventType = require('Event/EventType').EventType

class CircleGraph extends BaseComponent
	
	_ICON_SIZE:[35,29]
	_ICON_MARGIN:10
	_ICON_POS:[185,180]

	_WEBVIEW_URL_CIRCLE :"https://dl.dropbox.com/u/15300991/circle.html?"
	constructor : () ->
		super
			top:0
			height:'333'
				
		
	_setTime: (times) =>
		timeTypes = Const.TIME_TYPE
		
		for value, i in timeTypes
			hourValue = Math.floor(times[value]/60)
			minuteValue = times[value] - hourValue*60 
			
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
				right:68
				width:30
				height:25
				text: hourValue
				textAlign:'right'
				color: '#000'
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add hour
			
			
			h = Ti.UI.createLabel
				top: top
				left:255
				width:30
				height:25
				text: 'h.'
				color: '#CCCCCC'
				shadowColor:"#FFFFFF"
				shadowOffset:{x:0,y:2}
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add h
			
			min = Ti.UI.createLabel
				top: top
				right:29
				width:30
				height:25
				text: minuteValue	
				textAlign :'right'
				color: '#000'
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add min
			
			m = Ti.UI.createLabel
				top: top
				left:293
				width:100
				height:25
				text: 'm'
				color: '#CCCCCC'
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
			top:175
			left:10
			width:160
			height:160
		
		
		@webview.addEventListener 'beforeload', (e) =>
			info 'WEBVIEW beforeload'
			@webviewMsg.text = L 'webview_load'
			return
		
		@webview.addEventListener 'error', (e) =>
			info 'WEBVIEW error'
			@webviewMsg.text =  L 'webview_error'
			return
		
		@webview.addEventListener 'load', (e) =>
			info 'WEBVIEW load'
			@webviewMsg.text = ''
			return
		
		
		@webview.addEventListener 'touchmove', () ->
			return
		
		
			
		@add @webview
		@add @webviewMsg
		
		param = ""
		for value, i in timeTypes
			param += value+'='+times[value]+'&'
		
		@webview.url = @_WEBVIEW_URL_CIRCLE+param
		
		return 
		
	setEvent : () ->
		Ti.App.addEventListener EventType.update_circle_graph, (times) =>
			@_setTime times
			return

	
exports.CircleGraph = CircleGraph


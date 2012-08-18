BaseComponent = require('Component/Common/BaseComponent').BaseComponent
Const = require('/Lib/Const').Const
EventType = require('Event/EventType').EventType

class CircleGraph extends BaseComponent
	
	_ICON_SIZE:[35,29]
	_ICON_MARGIN:10
	_ICON_POS:[185,180]
	
	constructor : () ->
		super
			top:0
			height:'333'
		
		
		
		@webview = Ti.UI.createWebView
			backgroundColor: '#fff'
			# borderRadius: 1
			# borderWidth : 5
			# borderColor : '#ddd'
			scalesPageToFit:true
			top:185
			left:0
			width:160
			height:160	
			# url:'Component/Chart/circle.html'
			# url:'Component/circle	.html'
			
			# html: '<html><body><div style="color:red;">Hello from inline HTML. You should see red text and yellow background</div></body></html>'
		
		@webview.addEventListener 'beforeload', (e) ->
			alert 'beforeload'
			return
		
		@webview.addEventListener 'error', (e) ->
			alert 'error'
			return
		
		@webview.addEventListener 'load', (e) ->
			alert 'load'
			return
		
		# webview.html = html
		@add @webview
		
		
	_setTime: (times) ->
		timeTypes = Const.TIME_TYPE
		param = ""
		for value, i in timeTypes
			param += value+'='+times[value]+'&'
		
		alert param
		@webview.url = "https://dl.dropbox.com/u/15300991/circle.html?"+param
		

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
				width:100
				height:25
				text: 'h.'
				color: '#CCCCCC'
				shadowColor:"#FFFFFF"
				shadowOffset:{x:0,y:2}
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add h
			
			min = Ti.UI.createLabel
				top: top
				left:268
				width:100
				height:25
				text: minuteValue	
				color: '#000'
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
			@add min
			
			m = Ti.UI.createLabel
				top: top
				left:290
				width:100
				height:25
				text: 'm'
				color: '#CCCCCC'
				shadowColor:"#FFFFFF"
				shadowOffset:{x:0,y:2}
				font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			@add m
				
		return 
	setEvent : () ->
		Ti.App.addEventListener EventType.update_circle_graph, (times) =>
			@_setTime times
			return

	
exports.CircleGraph = CircleGraph


BaseComponent = require('Component/Common/BaseComponent').BaseComponent
BarMeter    = require('/Component/Common/BarMeter').BarMeter
Const    = require('/Lib/Const').Const
EventType = require('Event/EventType').EventType

class TotalTimeBarGraph extends BaseComponent
	_BAR_RECT : 
		left:15
		top:103
		width:290
		height:45

	constructor : () ->
		super({top:45,left:0,width:320,height:200})
		
		@_bar = new BarMeter @_BAR_RECT
		@_bar.buildBar [290,45]
		@_bar.setValue(44, Const.MAX_HOUR)
		
		@setMarkPosition()
		
		@add @_bar.getNodeView()
		
	setView: () ->
		bg = Ti.UI.createView
			left:0
			top:5
			width:'auto'
			align:'right'
			height:155
			backgroundImage : global.getImagePath 'Chart/bg_barArea'
		
		@add bg
		
		total = Ti.UI.createView
			left:17
			top:22
			width:60
			align:'right'
			height:18
			backgroundImage : global.getImagePath 'Chart/txt_total'
		
		@add total
		
		@hour = Ti.UI.createLabel
			left:25
			bottom:113
			width:75
			height:35
			text: '000'
			textAlign:'right'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 35,fontWeight:"bold"}
		
		@add @hour
		
		h = Ti.UI.createLabel
			left:105
			bottom:113
			width:100
			height:27
			text: 'h.'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 27,fontWeight:"bold"}
				
		@add h
		
		@minute = Ti.UI.createLabel
			left:126
			bottom:113
			width:35
			height:26			
			textAlign:'right'
			text:'0'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 26,fontWeight:"bold"}				
		
		@add @minute
		
		m = Ti.UI.createLabel
			left:166
			bottom:113
			width:40
			height:18
			text: 'm'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 18,fontWeight:"bold"}
				
		@add m
		
		slash = Ti.UI.createView
			left:190
			bottom:113
			width:17
			height:21
			backgroundImage : global.getImagePath 'Chart/slash'
			
		@add slash
		
		max = Ti.UI.createLabel
			left:211
			bottom:113
			width :40
			height:16
			text : Const.MAX_HOUR
			textAlign:'right'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
		@add max
		
		hourUnit = Ti.UI.createLabel
			left:256
			bottom:113
			width :200
			height:16
			text : 'h'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			
		@add hourUnit
		
		
		@goal = Ti.UI.createView
			left:290
			top :89
			width :17
			height:16
			# text : '▼'
			# color: '#000'
			# font : {fontFamily: 'Helvetica Neue', fontSize:10}
			backgroundImage : global.getImagePath 'Chart/mark_flag'
			SelectedBackgroundImage : global.getImagePath 'Chart/mark_flag_dw'
		
		@add @goal
		
		@goalAchieve = Ti.UI.createView
			left:281
			top :87
			width :26
			height:18
			backgroundImage : global.getImagePath 'Chart/mark_goal'
			SelectedBackgroundImage : global.getImagePath 'Chart/mark_goal_dw'
		
		@add @goalAchieve
		
		@goalAchieve.setVisible false
		
		@mark = Ti.UI.createView
			left:25
			top :91
			width :20
			height:15
			# text : '▼'
			# color: '#000'
			# font : {fontFamily: 'Helvetica Neue', fontSize:10}
			backgroundImage : global.getImagePath 'Chart/mark_turtle'
			SelectedBackgroundImage : global.getImagePath 'Chart/mark_turtle_dw'
		
		@add @mark
		
		
		
	setEvent:() ->
		Ti.App.addEventListener EventType.update_bar_graph, (e) =>
			timeFormatedAsHour = e.hour + e.minute / 60
			@_bar.setValue timeFormatedAsHour, Const.MAX_HOUR
			@setMarkPosition()
			@hour.text = e.hour
			@minute.text = e.minute
		
	setButton:() ->
		
		
	setMarkPosition : () =>
		barPosX = @_BAR_RECT.left+@_bar.getCoverWitdh()-7
		@mark.left = barPosX
		
		ratio = @_bar.getRatio()
		
		if ratio >= 1
			@goalAchieve.setVisible true
			@goal.setVisible false
			@mark.setVisible false
		else 
			@goalAchieve.setVisible false
			@goal.setVisible true
			@mark.setVisible true
		
		return
	
	
exports.TotalTimeBarGraph = TotalTimeBarGraph


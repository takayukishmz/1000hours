BaseComponent = require('Component/Common/BaseComponent').BaseComponent

class TitlePanel extends BaseComponent
	WEEK_NAME : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	constructor : () ->		
		super 
			top:0
			width:320
			height:45
			backgroundImage:global.getImagePath 'Common/bg'
			
	setView: () ->
		@title = Ti.UI.createLabel
			top : 2
			width: 100,
			height: 18,
			text: 'June'
			color: '#383838'
			textAlign:'center'
			font: {fontFamily: 'Condenced-Bold', fontSize: 22}
		
		this.add @title
		
		#今日という日
		now = new Date()
		now.setHours(12)
		Y = now.getYear()+1900
		M = now.getMonth()+1

		#月を戻すボタン
		backMonthButton = Ti.UI.createView
			color:"#fff",
			top:0, left:0, height:33, width:46,
			backgroundImage : global.getImagePath "Calendar/btn_before"
			
		
		backMonthButton.addEventListener 'click', () ->
			date = new Date(Y,parseInt(M)-1-1)
			Y_ = date.getYear()+1900
			M_ = date.getMonth()+1
			whenLabel.text = Y_+"年"+M_+"月"
			cal date
			return		
		@add backMonthButton

		#月を進めるボタン
		forwardMonthButton = Ti.UI.createLabel
			color:"#fff",
			top:0, right:0, height:33, width:46,
			backgroundImage : global.getImagePath "Calendar/btn_next"
		
		
		forwardMonthButton.addEventListener 'click', () ->		
			date = new Date(Y,parseInt(M)-1+1)
			Y_ = date.getYear()+1900;
			M_ = date.getMonth()+1;
			whenLabel.text = Y_+"年"+M_+"月";
			cal date
			return
		
		@add forwardMonthButton
		
		@_setDaylabels()
		return
	setEvent:() ->
	setButton:() ->
	
	_setDaylabels : () ->
		for value, index in @WEEK_NAME

			title = Ti.UI.createLabel
				bottom:2
				left:45*index
				width:45
				height:12
				text: value
				color: '#333333'
				shadowColor:'#FFFFFF'
				textAlign:'center'
				font: {fontFamily: 'Regular', fontSize: 12}
			this.add title
		return
	
		
exports.TitlePanel = TitlePanel

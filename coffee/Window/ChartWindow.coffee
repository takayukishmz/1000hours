BaseWindow 		= require('Window/BaseWindow').BaseWindow
TotalTimeBarGraph	= require('/Component/Chart/TotalTimeBarGraph').TotalTimeBarGraph
CircleGraph    	= require('/Component/Chart/CircleGraph').CircleGraph
Chart 			= require('Model/Chart').Chart
FontWindow 		= require('Window/Debug/FontWindow').FontWindow

class ChartWindow extends BaseWindow
		
	constructor : () ->
		super title : getText 'title_chart'
		@_model = new Chart()
		@_total = new TotalTimeBarGraph()
		@_circle = new CircleGraph()
		@win.add @_total.getNodeView()
		@win.add @_circle.getNodeView()
		
		@_model.setGraphData()
		
		return @win
	
	setView: () ->
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:72
			height:44
			backgroundImage : global.getImagePath 'Chart/btn_back'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_back_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			@win.close 	animated:true
			return
		
		
		@win.leftNavButton = leftBtn
		
		fbBtn = Ti.UI.createButton
			top:348
			left:20
			width:134
			height:38
			backgroundImage : global.getImagePath 'Chart/btn_share'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_share_dw'
		
		@win.add fbBtn
		
		twBtn = Ti.UI.createButton
			top:348
			right:20
			width:134
			height:38
			backgroundImage : global.getImagePath 'Chart/btn_tweet'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_tweet_dw'
		
		@win.add twBtn
		
		return
			
	setEvent: () ->	
	
exports.ChartWindow = ChartWindow
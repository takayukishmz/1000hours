BaseComponent = require('Component/Common/BaseComponent').BaseComponent

class BarMeter extends BaseComponent	
	MARGIN : 10
	SIZE_DEFAULT : [274,50]
	
	constructor : (@param) ->
		@currentValue = 0		
		@maxValue = 0
		super @param
		
	setView: () ->
	setEvent:() ->
	setButton:() ->
		
	buildBar : (size) =>
		scale = size[1]/@SIZE_DEFAULT[1]
		margin = scale * @MARGIN
		@maxWidth = size[0]-margin*2
		base = Ti.UI.createView
			top:0
			left:0
			width:size[0]		
			height:size[1]
			backgroundImage : global.getImagePath "Chart/bg_bar"
		
		@add base
		
		@cover = Ti.UI.createView
			top:margin
			left:margin
			width:@maxWidth
			height:size[1]-margin*2	
			backgroundImage : global.getImagePath "Chart/bar"
		
		@add @cover
		return
		
	setValue: (current, max) =>
		@currentValue = current
		if max
			@setMaxValue max
		
		ratio = @_ajustValue @currentValue/@maxValue
		@cover.width = ratio * @maxWidth
		return 
		
	setMaxValue : (max) =>
		@maxValue = max
		return 
	
	_ajustValue : (ratio) ->
		if ratio > 1 
			ratio = 1
		else if ratio < 0
			ratio = 0
		
		return ratio
	
	getCoverWitdh :() =>
		return @cover.width
	
	
exports.BarMeter = BarMeter


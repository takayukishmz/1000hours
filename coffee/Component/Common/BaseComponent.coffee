class BaseComponent
	constructor : (param) ->
		if !param
			param = 
				top:0
				left:0
				width:320
				height:480
			
		@_view = Ti.UI.createView param 	
		
		
		@setView()
		@setEvent()
		@setButton()
		
	setView: () ->
	setEvent:() ->
	setButton:() ->
	getNodeView : () =>
		return @_view
	add:(node) ->
		@_view.add node
		return
		
	remove : (node) ->
		@_view.remove node
		return
		
	
	setPosition : (pos)->
		@_view.setLeft pos[0]
		@_view.setTop pos[1]		
	

		
exports.BaseComponent = BaseComponent

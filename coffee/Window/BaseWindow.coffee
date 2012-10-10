class BaseWindow
	constructor : (@params) ->
		@win = Ti.UI.createWindow @params
		info 'BaseWindow', @params.title
		@win.backgroundImage = global.getImagePath 'Common/bg'
		@win.barColor ='#333'
		# @win.barImage = global.getImagePath 'Common/topbar'
		@win.hideNavBar()
		@setHeaderBg global.getImagePath 'Common/topbar'
		@setView()
		@setButton()
		@setEvent()
	
	setView: () ->
	setButton: () ->
	setEvent: () ->
	
	open :(args) ->
		@win.open(args)
		return
		
	close : (args) ->
		@win.close(args)
		return
		
	setHeaderBg : (path) ->
		if !@header
			@header = Ti.UI.createView
				top:0
				left:0
				width:'auto'
				height:45
			@win.add @header
		
		@header.backgroundImage = path
		
		return
	
	setHeaderTitleImage : (param) ->
		titleImg = Ti.UI.createView param
		@win.add titleImg
		return
		
		
exports.BaseWindow = BaseWindow
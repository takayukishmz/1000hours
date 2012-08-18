class BaseWindow
	constructor : (@params) ->
		@win = Ti.UI.createWindow @params
		info 'BaseWindow', @params.title
		@win.backgroundImage = global.getImagePath 'Common/bg'
		@win.barColor ='#333'
		@win.barImage = global.getImagePath 'Common/topbar'
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
		
		
		
exports.BaseWindow = BaseWindow
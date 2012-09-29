BaseWindow  = require('Window/BaseWindow').BaseWindow
SettingWindow  = require('Window/SettingWindow').SettingWindow

class SettingNavWindow extends BaseWindow
	constructor : () ->
		@params = 
			title:'navi group'
			navBarHidden:true
			modal:true
			
		super @params
		
		# Ti.App.rootWindow = null
		# Ti.App.rootWindow = @win		
		return @win
		
		
	setView:() ->
		@subWin = new SettingWindow(@win)
		
		Ti.App.nav = Ti.UI.iPhone.createNavigationGroup 
			window:@subWin
		
		@win.add Ti.App.nav
	
	setEvent : () ->
		Ti.App.addEventListener 'close_setting_nav_window', () =>
			@win.close()
			return
		
		return
	
exports.SettingNavWindow = SettingNavWindow
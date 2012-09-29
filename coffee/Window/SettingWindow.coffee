BaseWindow 	= require('Window/BaseWindow').BaseWindow
TutorialWindow 	= require('Window/TutorialWindow').TutorialWindow

class SettingWindow extends BaseWindow
	constructor : () ->
		super
			title:L 'title_setting'
			height:'auto'
			width:'auto'
			top:0
			left:0
		
		@_tutorialWindow = new TutorialWindow()
		
		return @win
	setView: () =>
		@setHeaderTitleImage
			backgroundImage : global.getImagePath 'Setting/title_setting'
			height:28
			width:90
			left:115
			top:8.5
		
		inputData = []
		
		@tutorial = Ti.UI.createTableViewRow 
			height:40
			title:L 'setting_subtitle_tutorial'
			clickName:'tutorial'
		
		@requestBox = Ti.UI.createTableViewRow 
			height:40
			title:L 'setting_subtitle_request'
			clickName:'requestBox'
					
		inputData[0] = @tutorial
		inputData[1] = @requestBox
		
		@tableView = Titanium.UI.createTableView 
			top:45
			data:inputData
			style:Ti.UI.iPhone.TableViewStyle.GROUPED
			backgroundImage:global.getImagePath 'Common/bg'
		
		@win.add @tableView
		
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:78
			height:45
			backgroundImage : global.getImagePath 'Calendar/btn_cancel'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_cancel_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			# @win.close()
			# Ti.App.nav.close @win, {animated:true}
			Ti.App.fireEvent 'close_setting_nav_window'
			return
			
		@win.add leftBtn
		return
		
	setEvent: () ->
		@tableView.addEventListener 'click', (e) =>
			switch e.source.clickName
				when @tutorial.clickName
					# @_tutorialWindow.open animated:true, modal:true
					Ti.App.nav.open @_tutorialWindow, modal:true
					return
				else
					info ''
		return
		
		
exports.SettingWindow = SettingWindow
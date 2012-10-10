BaseWindow 	= require('Window/BaseWindow').BaseWindow
TutorialWindow 	= require('Window/TutorialWindow').TutorialWindow

class SettingWindow extends BaseWindow
	constructor : () ->
		super
			title:L 'title_setting'
			height:320
			width:480
			top:0
			left:0
		
		@_tutorialWindow = new TutorialWindow()
		
		return @win
		
	setView: () =>
		# @setHeaderTitleImage
		# 	backgroundImage : global.getImagePath 'Setting/title_setting'
		# 	height:28
		# 	width:90
		# 	left:115
		# 	top:8.5
		
		inputData = []
		
		@tutorial = Ti.UI.createTableViewRow 
			height:44
			# title:L 'setting_subtitle_tutorial'
			width:320
			clickName:'tutorial'
			backgroundImage : global.getImagePath 'Setting/list_top'
			selectedBackgroundImage : global.getImagePath 'Setting/list_top'
		
		
		tutorialLabel = Ti.UI.createLabel
			top:7
			left:20
			width:200
			height:30
			text: L 'setting_subtitle_tutorial'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			clickName:'tutorial'
		
		@tutorial.add tutorialLabel
		
		@requestBox = Ti.UI.createTableViewRow 
			height:44
			left : 30
			clickName:'requestBox'
			backgroundImage : global.getImagePath 'Setting/list_bottom'
			selectedBackgroundImage : global.getImagePath 'Setting/list_bottom'
		
		requestLabel = Ti.UI.createLabel
			top:7
			left:20
			width:200
			height:30
			text: L 'setting_subtitle_request'
			color: '#333333'
			shadowColor:"#FFFFFF"
			shadowOffset:{x:0,y:2}
			font: {fontFamily: 'Helvetica Neue', fontSize: 16,fontWeight:"bold"}
			clickName:'requestBox'
		
		@requestBox.add requestLabel
		
		inputData[0] = @tutorial
		inputData[1] = @requestBox
		
		@tableView = Titanium.UI.createTableView 
			top:45
			width:320
			left:0
			data:inputData
			style:Ti.UI.iPhone.TableViewStyle.GROUPED
			backgroundImage:global.getImagePath 'Common/bg'
		
		@win.add @tableView
		
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:1
			left:0
			width:57
			height:44
			backgroundImage : global.getImagePath 'Common/btn_batsu'
			backgroundSelectedImage : global.getImagePath 'Common/btn_batsu_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			Ti.App.fireEvent 'close_setting_nav_window'
			return
			
		@win.add leftBtn
		return
		
	setEvent: () ->
		@tableView.addEventListener 'click', (e) =>
			@_handleTableEvent(e)
		return
		
	
	_handleTableEvent : (e) ->
		switch e.source.clickName
			when @tutorial.clickName
				# @_tutorialWindow.open animated:true, modal:true
				Ti.App.nav.open @_tutorialWindow, modal:true
				return
			when @requestBox.clickName
				@_sendMail()
			else
				info ''
	
	_sendMail : () ->
		emailDialog = Ti.UI.createEmailDialog()		
		emailDialog.setSubject L 'mail_subject'
		emailDialog.setToRecipients ['support@1000english.com']
		emailDialog.setMessageBody L 'mail_body'
		
		emailDialog.open()
		return
		
exports.SettingWindow = SettingWindow
BaseWindow 	= require('Window/BaseWindow').BaseWindow

class TutorialWindow extends BaseWindow
	_TUTORIAL_NUM:7
	constructor : (@opt) ->
		super
			title: 'tutorial'
		
		return @win
		
	setView: () ->
		@setScrollView()
	setScrollView : () ->
		views = []
		for	i in [1..@_TUTORIAL_NUM]
			view = Ti.UI.createView
				top:0
				left:0
				width:320
				height:372
				backgroundImage : global.getImagePath('Jp/Tutorial/t'+i)
			
			views.push view
		
		bottombar = Titanium.UI.createView
			left: 0
			top: 417
			width: 320
			height: 75
			backgroundImage:global.getImagePath 'Common/bottombar'
		
		@win.add bottombar	
		
		scrollView = Titanium.UI.createScrollableView
			views:views
			top:45
			pagingControlColor:'transparent'
			showPagingControl:true
			pagingControlHeight:40
			maxZoomScale:1.0
			currentPage:0
		
		@win.add scrollView
		return
		
	setButton: () =>
		if @opt and @opt.standAlone
			@setRightBtn()
		else
			@setLeftBtn()
		
		@setHeaderTitleImage
			backgroundImage : global.getImagePath 'Tutorial/title_turtorial'
			height:21
			width:120
			left:100
			top:12
		
		# rightBtn = Ti.UI.createButton
		# 	top:0
		# 	right:0
		# 	width:78
		# 	height:45
		# 	backgroundImage : global.getImagePath 'Calendar/btn_cancel'
		# 	backgroundSelectedImage : global.getImagePath 'Calendar/btn_cancel_dw'
		# 
		return
	
	setRightBtn : () ->
		rightBtn = Ti.UI.createButton
			top:1
			left:0
			width:57
			height:44
			backgroundImage : global.getImagePath 'Common/btn_batsu'
			backgroundSelectedImage : global.getImagePath 'Common/btn_batsu_dw'
		
		rightBtn.addEventListener 'click', (e) =>
			global.tutorialManager.done global.tutorialManager.LIST.START
			@win.close()
			return
		
		@win.add rightBtn
		return
	
	setLeftBtn : () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:62 
			height:44
			backgroundImage : global.getImagePath 'Chart/btn_back'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_back_dw'
				
		
		leftBtn.addEventListener 'click', (e) =>
			Ti.App.nav.close @win, {animated:true}
			return
		
		@win.add leftBtn
		return
	
	setEvent: () ->
		
exports.TutorialWindow = TutorialWindow
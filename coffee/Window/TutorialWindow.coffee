BaseWindow 	= require('Window/BaseWindow').BaseWindow

class TutorialWindow extends BaseWindow
	_TUTORIAL_NUM:7
	constructor : () ->
		super
			title: 'tutorial'
		
		return @win
		
	setView: () ->
		@setScrollView()
	setScrollView : () ->
		views = []
		for	i in [1..@_TUTORIAL_NUM]
			info i
			view = Ti.UI.createView
				top:0
				width:'auto'
				height:365
				backgroundImage : global.getImagePath('Jp/Tutorial/t'+i)
			
			views.push view
		
		bottombar = Titanium.UI.createView
			left: 0,
			bottom: -30,
			width: 320,
			height: 75,
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
		
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:62 
			height:45
			backgroundImage : global.getImagePath 'Chart/btn_back'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_back_dw'
				
		# rightBtn = Ti.UI.createButton
		# 	top:0
		# 	right:0
		# 	width:78
		# 	height:45
		# 	backgroundImage : global.getImagePath 'Calendar/btn_cancel'
		# 	backgroundSelectedImage : global.getImagePath 'Calendar/btn_cancel_dw'
		# 
		leftBtn.addEventListener 'click', (e) =>
			# @win.close()
			Ti.App.nav.close @win, {animated:true}
			return
			
		@win.add leftBtn
		return
	setEvent: () ->
		
exports.TutorialWindow = TutorialWindow
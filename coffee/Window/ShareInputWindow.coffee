BaseWindow 	= require('Window/BaseWindow').BaseWindow

class ShareInputWindow extends BaseWindow
	TYPE:
		TWITTER:1
		FACEBOOK:2
	
	constructor : () ->
		super title:'share'
	
	open:(params, type) ->
		@win.open(params)
		@_type = type
		return
	
	setView: () ->
		textBg = Ti.UI.createView
			top:45
			left:0
			width:'auto'
			height:'154'
			backgroundImage:global.getImagePath 'Chart/Share/bg_tweet'
		
		@win.add textBg
		
		@textArea = Ti.UI.createTextArea
			# color:'#336699',
			backgroundColor:'transparent'
			height:150,
			top:50,
			left:5,
			width:290,
			# hintText:'',
			value:'test',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
		
		@win.add @textArea	
		
	
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:78
			height:45
			backgroundImage : global.getImagePath 'Calendar/btn_cancel'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_cancel_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			@win.close()
			return
			
		@win.add leftBtn
		
		rightBtn = Ti.UI.createButton
			top:0
			right:0
			width:78
			height:45
			backgroundImage : global.getImagePath 'Calendar/btn_send'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_send_dw'
		
		rightBtn.addEventListener 'click', (e) =>
			@_post()
			return
		
		@win.add rightBtn
		
	setEvent: () ->
		@win.addEventListener 'focus', () =>
			@textArea.focus()
			@textArea.value = L 'tw_default_message', '1',1,1,1,1
			return
			
		return
	
	_post : () =>
		msg = @textArea.value
		
		if !msg
			info 'ERROR. textArea is empty.'
		
		if @_type == @TYPE.TWITTER
			@_postOnTwitter(msg)
			
	
	_postOnTwitter : (message) ->
		info message
		Ti.App.twitterApi.statuses_update
			onSuccess:(response) =>
				alert L 'tw_success'
				this.close()
			onError:(error) ->
				alert L 'tw_error'
				Ti.API.error error
			parameters:
				status:message
		return

	
	
exports.ShareInputWindow = ShareInputWindow

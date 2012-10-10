BaseWindow 	= require('Window/BaseWindow').BaseWindow

class ShareInputWindow extends BaseWindow
	MAX_TEXT_NUM_TWITTER :140
	TYPE:
		TWITTER:1
		FACEBOOK:2
	
	constructor : (@_model) ->
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
		
		
		@textCnt = Ti.UI.createLabel
			height:30
			top:202
			right:10
			width:20
			text : 0
			textAlign :'center'
			font: {fontFamily: 'Helvetica Neue', fontSize: 11}
			color: '#333333'
			shadowColor:'#ffffff'
			shadowOffset:{x:0,y:1},
			
		@win.add @textCnt
		
		@textArea = Ti.UI.createTextArea
			# color:'#336699',
			backgroundColor:'transparent'
			height:150,
			top:50,
			left:10,
			width:300,
			# hintText:'',
			value:'',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
			font : {fontSize:14}
		
		@win.add @textArea	
	
	
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:78
			height:44
			backgroundImage : global.getImagePath 'Calendar/btn_cancel'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_cancel_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			@win.close()
			return
			
		@win.add leftBtn
		
		@rightBtn = Ti.UI.createButton
			top:0
			right:0
			width:78
			height:44
			backgroundImage : global.getImagePath 'Calendar/btn_send'
			backgroundSelectedImage : global.getImagePath 'Calendar/btn_send_dw'
		
		@rightBtn.addEventListener 'click', (e) =>
			if !@_canPost()
				alert L 'tw_limit'
			
			@_post()
			return
		
		@win.add @rightBtn
	
	
	setEvent: () ->
		@win.addEventListener 'focus', () =>
			@textArea.focus()
			
			if @_type == @TYPE.TWITTER
				defaultMessage = L 'tw_default_message'
			else
				defaultMessage = L 'fb_default_message'
			
			text = @_model.getSnsShareText defaultMessage
			
			@textArea.value = text
			@_updateTextNum text
			return
		
		@textArea.addEventListener 'change', (e) =>
			@_updateTextNum e.value
			return
			
		return
	
	_updateTextNum : (text) =>
		len = text.length
		
		#update text count
		if @_type == @TYPE.TWITTER
			count = @MAX_TEXT_NUM_TWITTER-len
		else 	
			count = len
		
		@textCnt.text = count
		#update text color
		if count < 0
			@rightBtn.setEnabled false
			@textCnt.color = 'red'
		else
			@rightBtn.setEnabled true
			@textCnt.color = '#333333'
		
		return
	
	_canPost : () =>
		if @_type == @TYPE.TWITTER
			len = @textArea.value.length 
			if len < 0 or len > @MAX_TEXT_NUM_TWITTER
				return false
		
		return true
		
	
	
	_post : () =>
		msg = @textArea.value
		
		if !msg
			info 'ERROR. textArea is empty.'
		
		if @_type == @TYPE.TWITTER
			@_postOnTwitter(msg)
		
		else if @_type == @TYPE.FACEBOOK
			@_postFbWall(msg)
			
		return
	
	_postFbWall : (msg) ->
		info 'start postWall'
		
		requestData = 
			message:msg
			picture : "https://dl.dropbox.com/u/15300991/icon_114.png"
			name : L 'appname'
			# message : "Checkout this cool open source project for creating mobile apps",
			caption : L 'share_fb_caption'
			description : L 'share_fb_description'
		# alert requestData.accessToken
		
		# if Ti.App.dryrun
		# 	info 'dryrun share FB'
		# 	info 'message:'+msg
		# 	return
		Ti.Facebook.requestWithGraphPath 'me/feed',requestData,"POST",(e) ->
			info 'callback fb postWall'
			if e.success
				# alert "Success!  From FB: " + e.result
				alert L 'fb_success'
				this.close()
			else 
				if e.error
					alert L 'fb_failure'
				else
					alert "Unkown result"
			
		return
	
	
	_postOnTwitter : (message) ->
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

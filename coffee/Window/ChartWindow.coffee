BaseWindow 		= require('Window/BaseWindow').BaseWindow
TotalTimeBarGraph	= require('/Component/Chart/TotalTimeBarGraph').TotalTimeBarGraph
CircleGraph    	= require('/Component/Chart/CircleGraph').CircleGraph
Chart 			= require('Model/Chart').Chart
# FontWindow 		= require('Window/Debug/FontWindow').FontWindow
ShareInputWindow 		= require('Window/ShareInputWindow').ShareInputWindow

Ti.Facebook.appid = '347563875338453'
Ti.Facebook.permissions = ['publish_stream']

Ti.include("Lib/Twitter/twitter_api.js");
		
class ChartWindow extends BaseWindow
		
	constructor : () ->
		super title : getText 'title_chart'
		@_model = new Chart()
		@_total = new TotalTimeBarGraph()
		@_circle = new CircleGraph()
		@_shareInputWindow = new ShareInputWindow(@_model)
		@win.add @_total.getNodeView()
		@win.add @_circle.getNodeView()
		
		return @win
	
	setView: () ->
		@setHeaderTitleImage
			backgroundImage : global.getImagePath 'Chart/title_chart'
			height:21
			width:80
			left:120
			top:12		
		
		bottombar = Titanium.UI.createView
			left:0,
			top:388,
			width:320,
			height:72,
			backgroundImage:global.getImagePath 'Common/bottombar'
		
		@win.add bottombar
		
		return
	
	
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:62 
			height:44
			backgroundImage : global.getImagePath 'Chart/btn_back'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_back_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			@win.close 	animated:true
			return
		
		@win.add leftBtn
		
		fbBtn = Ti.UI.createButton
			top:396
			left:12
			width:145
			height:56
			backgroundImage : global.getImagePath 'Chart/btn_share'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_share_dw'
		
		@win.add fbBtn
		
		
		@setupSNS()
		
		twBtn = Ti.UI.createButton
			top:396
			left:163
			width:145
			height:56
			backgroundImage : global.getImagePath 'Chart/btn_tweet'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_tweet_dw'
		
		@win.add twBtn
		
		# Ti.App.twitterApi.clear_accesstoken()
		twBtn.addEventListener 'click',() =>
			# Ti.App.twitterApi.init()
			# Ti.App.twitterApi.init()			
			if Ti.App.twitterApi.isAuthorized()
				info 'twitter already login'
				@_shareInputWindow.open({modal:true}, @_shareInputWindow.TYPE.TWITTER)
			else
				info 'twitter login'
				# Ti.App.twitterLogin = true
				Ti.App.twitterApi.init()
			
			return
			
		
		# Ti.Facebook.logout()
		fbBtn.addEventListener 'click', () =>
			if Ti.Facebook.loggedIn
				info 'fb already login'
				@_shareInputWindow.open({modal:true}, @_shareInputWindow.TYPE.FACEBOOK)
				# @_showFbDialog()
				
			else
				info 'fb login'
				Ti.Facebook.authorize()
			
			return
			
		
		
		return
	
	# _showFbDialog : () ->
	# 	data = 
	# 		link : "http://www.appcelerator.com"
	# 		name : @_model.getSnsShareText L 'tw_default_message_fb'#{}"Appcelerator Titanium Mobile"
	# 		message : "Checkout this cool open source project for creating mobile apps"
	# 		caption : "Appcelerator Titanium Mobile"
	# 		picture : "https://dl.dropbox.com/u/15300991/icon_114.png"
	# 		description : @_model.getSnsShareText L 'tw_default_message'
	# 	    # description : "You've got the ideas, now you've got the power. Titanium translates " +
	# 	    #               "your hard won web skills into native applications..."
	# 
	# 	
	# 	Titanium.Facebook.dialog "feed", data, (e) ->
	# 	    if e.success && e.result
	# 	        alert("Success! New Post ID: " + e.result)
	# 	    else 
	# 	        if e.error
	# 	            alert(e.error)
	# 	        else 
	# 	            alert("User canceled dialog.")
	# 	        
	# 		
	# 	
	# 
	# 
	
	setEvent: () ->	
		@win.addEventListener 'focus', (e) =>
			@_model.setGraphData()
			return
	
	
	setupSNS : () ->
		Ti.App.twitterApi = new TwitterApi
			consumerKey:'Oc8B1N6kitWFhfHSZ8i8w',
			consumerSecret: 'z81i4T1kgwgj2jN4b4IkQ12ugzqygngHSUAAYRED6Z4'
			# consumerKey:'gjIaSeyEHXC2R9jEEaUbQg',
			# consumerSecret: 'f5cdvqzkK2VeDfQ8eFqcvDmmymZ0zb0P7lqqT391l0'
		return
		


	
	
exports.ChartWindow = ChartWindow
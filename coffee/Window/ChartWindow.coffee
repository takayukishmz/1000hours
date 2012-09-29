BaseWindow 		= require('Window/BaseWindow').BaseWindow
TotalTimeBarGraph	= require('/Component/Chart/TotalTimeBarGraph').TotalTimeBarGraph
CircleGraph    	= require('/Component/Chart/CircleGraph').CircleGraph
Chart 			= require('Model/Chart').Chart
# FontWindow 		= require('Window/Debug/FontWindow').FontWindow
ShareInputWindow 		= require('Window/ShareInputWindow').ShareInputWindow

Ti.Facebook.appid = '347563875338453'
Ti.include("Lib/Twitter/twitter_api.js");
		
class ChartWindow extends BaseWindow
		
	constructor : () ->
		super title : getText 'title_chart'
		@_model = new Chart()
		@_total = new TotalTimeBarGraph()
		@_circle = new CircleGraph()
		@_shareInputWindow = new ShareInputWindow()
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
			left: 0,
			bottom: 0,
			width: 320,
			height: 75,
			backgroundImage:global.getImagePath 'Common/bottombar'
		
		@win.add bottombar
		
		return
	
	setButton: () ->
		leftBtn = Ti.UI.createButton
			top:0
			left:0
			width:62 
			height:45
			backgroundImage : global.getImagePath 'Chart/btn_back'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_back_dw'
		
		leftBtn.addEventListener 'click', (e) =>
			@win.close 	animated:true
			return
		
		@win.add leftBtn
		
		fbBtn = Ti.UI.createButton
			bottom:9
			left:12
			width:145
			height:56
			backgroundImage : global.getImagePath 'Chart/btn_share'
			backgroundSelectedImage : global.getImagePath 'Chart/btn_share_dw'
		
		@win.add fbBtn
		
		
		@setupSNS()
		
		twBtn = Ti.UI.createButton
			bottom:9
			right:12
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
			
		
		fbBtn.addEventListener 'click', () =>
			if Ti.Facebook.loggedIn
				info 'fb already login'
				@_shareInputWindow.open({modal:true}, @_shareInputWindow.TYPE.FACEBOOK)
			else
				info 'fb login'
				Ti.Facebook.authorize()
			
			return
			
		
		
		return
			
	setEvent: () ->	
		
		Ti.App.addEventListener 'hoge', () ->
			info Ti.Platform.availableMemory
			return
			
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
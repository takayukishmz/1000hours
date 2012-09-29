basePath = 'Content/'
JsonText = require('Content/Jp/Text').Text

util = {}

exports.getImagePath = (path) ->
	if path.match /^Jp/
		Ti.API.info 'jp path'
		path = basePath + path+'.png'
	else
		path = basePath + "Common/" + path+'.png'

	# info 'ImagePath:',path
	return path


exports.info = () ->
	if arguments.length > 1
		Ti.API.info "<"+arguments[0]+">"+arguments[1]
	else 
		Ti.API.info arguments[0]
		
	return


exports.getText = (key) ->
	if JsonText[key]
		return JsonText[key]
	
	return ""


exports.util = 
	setRightButton : (win,callback,style) ->
			if !callback
				alert 'You have to set callback func '
			#default setting
			# no test for android
			if !style 
				style =
					title:'再読込'
					systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
					backgroundColor:'black'
			
			if Titanium.Platform.osname == 'android' 
				activity = Titanium.Android.currentActivity
				if activity 
					acitivity.onCreateOptionsMenu = (e) ->
						menu = e.menu
						menuItem = menu.add {title: "再読込"}
						menuItem.setIcon "dark_refresh.png"
						menuItem.addEventListener "click", (e) ->
							callback
							return
						return
			else
				rightButton = Titanium.UI.createButton style
				win.rightNavButton = rightButton
				rightButton.addEventListener 'click', () ->
					# Ti.API.info 'click right button:'+callback
					callback()
					return
				return rightButton
	
	setLeftButton : (win,callback, style) ->
			
			if !callback
				alert 'You have to set callback func '
			#default setting
			# no test for android
			if !style 
				style =
					# backgroundImage:'../images/titlebar_red.png'
					title:'update'
					systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
			
			
			if Titanium.Platform.osname == 'android' 
				activity = Titanium.Android.currentActivity
				if activity 
					acitivity.onCreateOptionsMenu = (e) ->
						menu = e.menu
						menuItem = menu.add {title: "再読込"}
						menuItem.setIcon "dark_refresh.png"
						menuItem.addEventListener "click", (e) ->
							callback

			else

				leftButton = Titanium.UI.createButton style
				win.leftNavButton = leftButton
				leftButton.addEventListener 'click', () ->
					Ti.API.info 'click right button:'+callback
					callback()
					return
				return
class TutorialManager
	LIST : 
		START:1
	
	constructor : () ->
		@file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + '../Documents/tutorial.txt')
		if @file.read()
			try
				info 'file content exists'
				@contents = JSON.parse @file.read()
				info @contents
			catch error
				info 'Parse Error', error
				@contents = []
		else 
			info 'create new File Content'
			@file.write JSON.stringify([])
			@contents = []
			
	getIdList : () ->
		return @contents
	
		
	isDone:(number) ->
		# info 'Tutorial check', number
		index = @contents.indexOf number
		
		if index != -1 # already readed
			return true
		else 
			return false #yet
		
		
	done:(number) ->
		# info 'Tutorial done', number
		index = @contents.indexOf number
		
		if index == -1 #new
			@contents.push number
			try
			  info @contents
			  @file.write JSON.stringify(@contents)
			catch error
				alert 'hoge'
				info 'Parse Error', error			  
	
	# 
	# unselect : (number) ->		
	# 	index = @contents.indexOf number
	# 	
	# 	if index != -1 #new
	# 		@contents.splice index, 1			
	# 		try
	# 		  @file.write JSON.stringify(@contents)
	# 		  Ti.App.fireEvent 'check_fav_status', {num:number, isSelected:false}
	# 		  @showMessage 'お気に入り', '削除しました'
	# 		catch error
	# 			info 'Parse Error', error
	# 			
	# 	return
	# 		
	# clear : () ->
	# 	@contents = []
	# 	@file.write JSON.stringify([])
	# 	return
	# 
	
	# checkFavStatus : (num) ->
	# 	isSelected = @isSelected num
	# 	info 'checkFavStatus:'+num+':'+isSelected
	# 	Ti.App.fireEvent 'check_fav_status', {isSelected:isSelected}
	# 	return
	# 	
	# showMessage : (title, msg) =>
	# 	if !@confirm
	# 		@confirm = Titanium.UI.createAlertDialog()
	# 	
	# 	@confirm.setTitle title
	# 	@confirm.setMessage msg
	# 	
	# 	@confirm.show()	
	# 	
	# 	return		
exports.TutorialManager = TutorialManager


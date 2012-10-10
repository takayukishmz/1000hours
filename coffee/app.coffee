# global -----------------------------------------------------#
global = {}
info = require('Lib/Util').info
util = require('Lib/Util').util
getText = require('Lib/Util').getText
global.getImagePath = require('Lib/Util').getImagePath
# RW = require('Lib/Util').responsiveWidth
# RH = require('Lib/Util').responsiveHeight
# info RW 5
#-------------------------------------------------------------#
do->
	
	TabGroup = require('Component/Common/TabGroup').TabGroup
	Calendar = require('Window/CalendarWindow').CalendarWindow
	TutorialManager = require('Lib/TutorialManager').TutorialManager
	db = require('DB/Record').Record
	db.createTable "RECORD"
	
	
	global.tabs = new TabGroup(
		icon: global.getImagePath 'KS_nav_views.png'
		title:'Tab 1'
		window: new Calendar
	)
	
	global.tutorialManager = new TutorialManager()
	
	# db.createDb()
	#TODO: temporary.choose best process to create database when app init

	global.tabs.open()	
	return
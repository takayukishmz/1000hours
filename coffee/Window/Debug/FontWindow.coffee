BaseWindow 	= require('Window/BaseWindow').BaseWindow

class FontWindow extends BaseWindow
	constructor : () ->	
		#set layout
		@tableview = Titanium.UI.createTableView
			separatorColor:'#000'
			backgroundColor:'transparent'
		
		super 
			title: 'font list'
		
		#loadList
		@loadListView()		
		#add
		@win.add @tableview
		return @win
		
	setView : () ->
	setEvent : () ->
	setButton: () ->	
	loadListView : () =>
		data = []
		for i in fontArr
			data.push @createListView(i)
			@tableview.data = data
		
		return
		
	
	createListView : (font) ->
		section = Ti.UI.createTableViewSection()
		row = Titanium.UI.createTableViewRow 
			height:80
			backgroundImage:'#000000'
		
		text = Titanium.UI.createLabel
			top:0
			left:0
			text:font+":"
			width:320
			height:30
			font: { fontSize: 14}
			
		row.add text
		
		text = Titanium.UI.createLabel
			top:30
			left:10
			text:'abcdefghijklm 1234567890'
			width:320
			height:30
			font: {fontFamily: font, fontSize: 22}
			
		row.add text
		section.add row
		return section
		
exports.FontWindow = FontWindow


fontArr = [
	"Academy Engraved LET",
	"American Typewriter",
	"Apple Color Emoji",
	"AppleGothic",
	"Arial",
	"Arial Hebrew",
	"Arial Rounded MT Bold",
	"Bangla Sangam MN",
	"Baskerville",
	"Bodoni 72",
	"Bodoni 72 Oldstyle",
	"Bodoni 72 Smallcaps",
	"Bodoni Ornaments",
	"Bradley Hand",
	"Chalkboard SE",
	"Chalkduster",
	"Cochin",
	"Copperplate",
	"Courier",
	"Courier New",
	"Devanagari Sangam MN",
	"Didot",
	"Euphemia UCAS",
	"Futura",
	"Geeza Pro",
	"Georgia",
	"Gill Sans",
	"Gujarati Sangam MN",
	"Gurmukhi MN",
	"Heiti SC",
	"Heiti TC",
	"Helvetica",
	"Helvetica Neue",
	"Hiragino Kaku Gothic ProN",
	"Hiragino Mincho ProN",
	"Hoefler Text",
	"Kailasa",
	"Kannada Sangam MN",
	"Malayalam Sangam MN",
	"Marion",
	"Marker Felt",
	"Noteworthy",
	"Optima",
	"Oriya Sangam MN",
	"Palatino",
	"Papyrus",
	"Party LET",
	"Sinhala Sangam MN",
	"Snell Roundhand",
	"Tamil Sangam MN",
	"Telugu Sangam MN",
	"Thonburi",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana",
	"Zapf Dingbats",
	"Zapfino",
]
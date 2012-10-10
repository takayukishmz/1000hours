var getText, global, info, util;
global = {};
info = require('Lib/Util').info;
util = require('Lib/Util').util;
getText = require('Lib/Util').getText;
global.getImagePath = require('Lib/Util').getImagePath;
(function() {
  var Calendar, TabGroup, TutorialManager, db;
  TabGroup = require('Component/Common/TabGroup').TabGroup;
  Calendar = require('Window/CalendarWindow').CalendarWindow;
  TutorialManager = require('Lib/TutorialManager').TutorialManager;
  db = require('DB/Record').Record;
  db.createTable("RECORD");
  global.tabs = new TabGroup({
    icon: global.getImagePath('KS_nav_views.png'),
    title: 'Tab 1',
    window: new Calendar
  });
  global.tutorialManager = new TutorialManager();
  global.tabs.open();
})();
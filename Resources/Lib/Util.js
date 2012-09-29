var JsonText, basePath, util;
basePath = 'Content/';
JsonText = require('Content/Jp/Text').Text;
util = {};
exports.getImagePath = function(path) {
  if (path.match(/^Jp/)) {
    Ti.API.info('jp path');
    path = basePath + path + '.png';
  } else {
    path = basePath + "Common/" + path + '.png';
  }
  return path;
};
exports.info = function() {
  if (arguments.length > 1) {
    Ti.API.info("<" + arguments[0] + ">" + arguments[1]);
  } else {
    Ti.API.info(arguments[0]);
  }
};
exports.getText = function(key) {
  if (JsonText[key]) {
    return JsonText[key];
  }
  return "";
};
exports.util = {
  setRightButton: function(win, callback, style) {
    var activity, rightButton;
    if (!callback) {
      alert('You have to set callback func ');
    }
    if (!style) {
      style = {
        title: '再読込',
        systemButton: Titanium.UI.iPhone.SystemButton.REFRESH,
        backgroundColor: 'black'
      };
    }
    if (Titanium.Platform.osname === 'android') {
      activity = Titanium.Android.currentActivity;
      if (activity) {
        return acitivity.onCreateOptionsMenu = function(e) {
          var menu, menuItem;
          menu = e.menu;
          menuItem = menu.add({
            title: "再読込"
          });
          menuItem.setIcon("dark_refresh.png");
          menuItem.addEventListener("click", function(e) {
            callback;
          });
        };
      }
    } else {
      rightButton = Titanium.UI.createButton(style);
      win.rightNavButton = rightButton;
      rightButton.addEventListener('click', function() {
        callback();
      });
      return rightButton;
    }
  },
  setLeftButton: function(win, callback, style) {
    var activity, leftButton;
    if (!callback) {
      alert('You have to set callback func ');
    }
    if (!style) {
      style = {
        title: 'update',
        systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
      };
    }
    if (Titanium.Platform.osname === 'android') {
      activity = Titanium.Android.currentActivity;
      if (activity) {
        return acitivity.onCreateOptionsMenu = function(e) {
          var menu, menuItem;
          menu = e.menu;
          menuItem = menu.add({
            title: "再読込"
          });
          menuItem.setIcon("dark_refresh.png");
          return menuItem.addEventListener("click", function(e) {
            return callback;
          });
        };
      }
    } else {
      leftButton = Titanium.UI.createButton(style);
      win.leftNavButton = leftButton;
      leftButton.addEventListener('click', function() {
        Ti.API.info('click right button:' + callback);
        callback();
      });
    }
  }
};
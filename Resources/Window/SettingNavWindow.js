var BaseWindow, SettingNavWindow, SettingWindow;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BaseWindow = require('Window/BaseWindow').BaseWindow;
SettingWindow = require('Window/SettingWindow').SettingWindow;
SettingNavWindow = (function() {
  __extends(SettingNavWindow, BaseWindow);
  function SettingNavWindow() {
    this.params = {
      title: 'navi group',
      navBarHidden: true,
      modal: true
    };
    SettingNavWindow.__super__.constructor.call(this, this.params);
    return this.win;
  }
  SettingNavWindow.prototype.setView = function() {
    this.subWin = new SettingWindow(this.win);
    Ti.App.nav = Ti.UI.iPhone.createNavigationGroup({
      window: this.subWin
    });
    return this.win.add(Ti.App.nav);
  };
  SettingNavWindow.prototype.setEvent = function() {
    Ti.App.addEventListener('close_setting_nav_window', __bind(function() {
      this.win.close();
    }, this));
  };
  return SettingNavWindow;
})();
exports.SettingNavWindow = SettingNavWindow;
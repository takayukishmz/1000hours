var BaseWindow, SettingWindow, TutorialWindow;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
TutorialWindow = require('Window/TutorialWindow').TutorialWindow;
SettingWindow = (function() {
  __extends(SettingWindow, BaseWindow);
  function SettingWindow() {
    this.setView = __bind(this.setView, this);    SettingWindow.__super__.constructor.call(this, {
      title: L('title_setting'),
      height: 'auto',
      width: 'auto',
      top: 0,
      left: 0
    });
    this._tutorialWindow = new TutorialWindow();
    return this.win;
  }
  SettingWindow.prototype.setView = function() {
    var inputData;
    this.setHeaderTitleImage({
      backgroundImage: global.getImagePath('Setting/title_setting'),
      height: 28,
      width: 90,
      left: 115,
      top: 8.5
    });
    inputData = [];
    this.tutorial = Ti.UI.createTableViewRow({
      height: 40,
      title: L('setting_subtitle_tutorial'),
      clickName: 'tutorial'
    });
    this.requestBox = Ti.UI.createTableViewRow({
      height: 40,
      title: L('setting_subtitle_request'),
      clickName: 'requestBox'
    });
    inputData[0] = this.tutorial;
    inputData[1] = this.requestBox;
    this.tableView = Titanium.UI.createTableView({
      top: 45,
      data: inputData,
      style: Ti.UI.iPhone.TableViewStyle.GROUPED,
      backgroundImage: global.getImagePath('Common/bg')
    });
    return this.win.add(this.tableView);
  };
  SettingWindow.prototype.setButton = function() {
    var leftBtn;
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 78,
      height: 45,
      backgroundImage: global.getImagePath('Calendar/btn_cancel'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_cancel_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      Ti.App.fireEvent('close_setting_nav_window');
    }, this));
    this.win.add(leftBtn);
  };
  SettingWindow.prototype.setEvent = function() {
    this.tableView.addEventListener('click', __bind(function(e) {
      switch (e.source.clickName) {
        case this.tutorial.clickName:
          Ti.App.nav.open(this._tutorialWindow, {
            modal: true
          });
          break;
        default:
          return info('');
      }
    }, this));
  };
  return SettingWindow;
})();
exports.SettingWindow = SettingWindow;
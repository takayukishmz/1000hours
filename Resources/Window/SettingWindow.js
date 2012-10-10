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
      height: 320,
      width: 480,
      top: 0,
      left: 0
    });
    this._tutorialWindow = new TutorialWindow();
    return this.win;
  }
  SettingWindow.prototype.setView = function() {
    var inputData, requestLabel, tutorialLabel;
    inputData = [];
    this.tutorial = Ti.UI.createTableViewRow({
      height: 44,
      width: 320,
      clickName: 'tutorial',
      backgroundImage: global.getImagePath('Setting/list_top'),
      selectedBackgroundImage: global.getImagePath('Setting/list_top')
    });
    tutorialLabel = Ti.UI.createLabel({
      top: 7,
      left: 20,
      width: 200,
      height: 30,
      text: L('setting_subtitle_tutorial'),
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "bold"
      },
      clickName: 'tutorial'
    });
    this.tutorial.add(tutorialLabel);
    this.requestBox = Ti.UI.createTableViewRow({
      height: 44,
      left: 30,
      clickName: 'requestBox',
      backgroundImage: global.getImagePath('Setting/list_bottom'),
      selectedBackgroundImage: global.getImagePath('Setting/list_bottom')
    });
    requestLabel = Ti.UI.createLabel({
      top: 7,
      left: 20,
      width: 200,
      height: 30,
      text: L('setting_subtitle_request'),
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: "bold"
      },
      clickName: 'requestBox'
    });
    this.requestBox.add(requestLabel);
    inputData[0] = this.tutorial;
    inputData[1] = this.requestBox;
    this.tableView = Titanium.UI.createTableView({
      top: 45,
      width: 320,
      left: 0,
      data: inputData,
      style: Ti.UI.iPhone.TableViewStyle.GROUPED,
      backgroundImage: global.getImagePath('Common/bg')
    });
    return this.win.add(this.tableView);
  };
  SettingWindow.prototype.setButton = function() {
    var leftBtn;
    leftBtn = Ti.UI.createButton({
      top: 1,
      left: 0,
      width: 57,
      height: 44,
      backgroundImage: global.getImagePath('Common/btn_batsu'),
      backgroundSelectedImage: global.getImagePath('Common/btn_batsu_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      Ti.App.fireEvent('close_setting_nav_window');
    }, this));
    this.win.add(leftBtn);
  };
  SettingWindow.prototype.setEvent = function() {
    this.tableView.addEventListener('click', __bind(function(e) {
      return this._handleTableEvent(e);
    }, this));
  };
  SettingWindow.prototype._handleTableEvent = function(e) {
    switch (e.source.clickName) {
      case this.tutorial.clickName:
        Ti.App.nav.open(this._tutorialWindow, {
          modal: true
        });
        break;
      case this.requestBox.clickName:
        return this._sendMail();
      default:
        return info('');
    }
  };
  SettingWindow.prototype._sendMail = function() {
    var emailDialog;
    emailDialog = Ti.UI.createEmailDialog();
    emailDialog.setSubject(L('mail_subject'));
    emailDialog.setToRecipients(['support@1000english.com']);
    emailDialog.setMessageBody(L('mail_body'));
    emailDialog.open();
  };
  return SettingWindow;
})();
exports.SettingWindow = SettingWindow;
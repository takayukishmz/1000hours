var BaseWindow, ShareInputWindow;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
ShareInputWindow = (function() {
  __extends(ShareInputWindow, BaseWindow);
  ShareInputWindow.prototype.TYPE = {
    TWITTER: 1,
    FACEBOOK: 2
  };
  function ShareInputWindow() {
    this._post = __bind(this._post, this);    ShareInputWindow.__super__.constructor.call(this, {
      title: 'share'
    });
  }
  ShareInputWindow.prototype.open = function(params, type) {
    this.win.open(params);
    this._type = type;
  };
  ShareInputWindow.prototype.setView = function() {
    var textBg;
    textBg = Ti.UI.createView({
      top: 45,
      left: 0,
      width: 'auto',
      height: '154',
      backgroundImage: global.getImagePath('Chart/Share/bg_tweet')
    });
    this.win.add(textBg);
    this.textArea = Ti.UI.createTextArea({
      backgroundColor: 'transparent',
      height: 150,
      top: 50,
      left: 5,
      width: 290,
      value: 'test',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    return this.win.add(this.textArea);
  };
  ShareInputWindow.prototype.setButton = function() {
    var leftBtn, rightBtn;
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 78,
      height: 45,
      backgroundImage: global.getImagePath('Calendar/btn_cancel'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_cancel_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      this.win.close();
    }, this));
    this.win.add(leftBtn);
    rightBtn = Ti.UI.createButton({
      top: 0,
      right: 0,
      width: 78,
      height: 45,
      backgroundImage: global.getImagePath('Calendar/btn_send'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_send_dw')
    });
    rightBtn.addEventListener('click', __bind(function(e) {
      this._post();
    }, this));
    return this.win.add(rightBtn);
  };
  ShareInputWindow.prototype.setEvent = function() {
    this.win.addEventListener('focus', __bind(function() {
      this.textArea.focus();
      this.textArea.value = L('tw_default_message', '1', 1, 1, 1, 1);
    }, this));
  };
  ShareInputWindow.prototype._post = function() {
    var msg;
    msg = this.textArea.value;
    if (!msg) {
      info('ERROR. textArea is empty.');
    }
    if (this._type === this.TYPE.TWITTER) {
      return this._postOnTwitter(msg);
    }
  };
  ShareInputWindow.prototype._postOnTwitter = function(message) {
    info(message);
    Ti.App.twitterApi.statuses_update({
      onSuccess: __bind(function(response) {
        alert(L('tw_success'));
        return this.close();
      }, this),
      onError: function(error) {
        alert(L('tw_error'));
        return Ti.API.error(error);
      },
      parameters: {
        status: message
      }
    });
  };
  return ShareInputWindow;
})();
exports.ShareInputWindow = ShareInputWindow;
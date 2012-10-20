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
  ShareInputWindow.prototype.MAX_TEXT_NUM_TWITTER = 140;
  ShareInputWindow.prototype.TYPE = {
    TWITTER: 1,
    FACEBOOK: 2
  };
  function ShareInputWindow(_model) {
    this._model = _model;
    this._postOnTwitter = __bind(this._postOnTwitter, this);
    this._postFbWall = __bind(this._postFbWall, this);
    this._post = __bind(this._post, this);
    this._canPost = __bind(this._canPost, this);
    this._updateTextNum = __bind(this._updateTextNum, this);
    ShareInputWindow.__super__.constructor.call(this, {
      title: 'share'
    });
    this._alertDialog = Titanium.UI.createAlertDialog();
  }
  ShareInputWindow.prototype.open = function(params, type) {
    this.win.open(params);
    this._type = type;
  };
  ShareInputWindow.prototype.setView = function() {
    var textBg;
    this.setHeaderTitleImage({
      backgroundImage: global.getImagePath('Chart/Share/title_share'),
      height: 21,
      width: 85,
      left: 235 / 2,
      top: 12
    });
    textBg = Ti.UI.createView({
      top: 51,
      left: 0,
      width: 320,
      height: '154',
      backgroundImage: global.getImagePath('Chart/Share/bg_tweet')
    });
    this.win.add(textBg);
    this.textCnt = Ti.UI.createLabel({
      height: 30,
      top: 180,
      left: 255,
      width: 50,
      text: 0,
      textAlign: 'right',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 11
      },
      color: '#333333',
      shadowColor: '#ffffff',
      shadowOffset: {
        x: 0,
        y: 1
      }
    });
    this.win.add(this.textCnt);
    this.textArea = Ti.UI.createTextArea({
      backgroundColor: 'transparent',
      height: 132,
      top: 56,
      left: 10,
      width: 300,
      value: '',
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
      font: {
        fontSize: 14
      }
    });
    return this.win.add(this.textArea);
  };
  ShareInputWindow.prototype.setButton = function() {
    var leftBtn;
    leftBtn = Ti.UI.createButton({
      top: 1,
      left: 0,
      width: 78,
      height: 44,
      backgroundImage: global.getImagePath('Calendar/btn_cancel'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_cancel_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      this.win.close();
    }, this));
    this.win.add(leftBtn);
    this.rightBtn = Ti.UI.createButton({
      top: 1,
      right: 0,
      width: 78,
      height: 44,
      backgroundImage: global.getImagePath('Calendar/btn_send'),
      backgroundSelectedImage: global.getImagePath('Calendar/btn_send_dw')
    });
    this.rightBtn.addEventListener('click', __bind(function(e) {
      if (!this._canPost()) {
        alert(L('tw_limit'));
      }
      this._post();
    }, this));
    return this.win.add(this.rightBtn);
  };
  ShareInputWindow.prototype.setEvent = function() {
    this.win.addEventListener('focus', __bind(function() {
      var defaultMessage, text;
      this.textArea.focus();
      if (this._type === this.TYPE.TWITTER) {
        defaultMessage = L('tw_default_message');
      } else {
        defaultMessage = L('fb_default_message');
      }
      text = this._model.getSnsShareText(defaultMessage);
      this.textArea.value = text;
      this._updateTextNum(text);
    }, this));
    this.textArea.addEventListener('change', __bind(function(e) {
      this._updateTextNum(e.value);
    }, this));
  };
  ShareInputWindow.prototype._updateTextNum = function(text) {
    var count, len;
    len = text.length;
    if (this._type === this.TYPE.TWITTER) {
      this.textCnt.setVisible(true);
      count = this.MAX_TEXT_NUM_TWITTER - len;
    } else {
      this.textCnt.setVisible(false);
    }
    this.textCnt.text = count;
    if (count < 0) {
      this.rightBtn.setEnabled(false);
      this.textCnt.color = 'red';
    } else {
      this.rightBtn.setEnabled(true);
      this.textCnt.color = '#333333';
    }
  };
  ShareInputWindow.prototype._canPost = function() {
    var len;
    if (this._type === this.TYPE.TWITTER) {
      len = this.textArea.value.length;
      if (len < 0 || len > this.MAX_TEXT_NUM_TWITTER) {
        return false;
      }
    }
    return true;
  };
  ShareInputWindow.prototype._post = function() {
    var msg;
    msg = this.textArea.value;
    if (!msg) {
      info('ERROR. textArea is empty.');
    }
    if (this._type === this.TYPE.TWITTER) {
      this._postOnTwitter(msg);
    } else if (this._type === this.TYPE.FACEBOOK) {
      this._postFbWall(msg);
    }
  };
  ShareInputWindow.prototype._postFbWall = function(msg) {
    var requestData;
    info('start postWall');
    requestData = {
      message: msg,
      picture: "https://dl.dropbox.com/u/15300991/icon_114.png",
      name: L('appname'),
      caption: L('share_fb_caption'),
      description: L('share_fb_description')
    };
    this.rightBtn.setEnabled(false);
    Ti.Facebook.requestWithGraphPath('me/feed', requestData, "POST", __bind(function(e) {
      info('callback fb postWall');
      this.rightBtn.setEnabled(true);
      if (e.success) {
        this._alertDialog.setTitle(L('post_success'));
        this._alertDialog.setMessage(L('fb_success'));
        this._alertDialog.show();
        return this.close();
      } else {
        if (e.error) {
          return alert(L('fb_failure'));
        } else {
          return alert("Unkown result");
        }
      }
    }, this));
  };
  ShareInputWindow.prototype._postOnTwitter = function(message) {
    this.rightBtn.setEnabled(false);
    Ti.App.twitterApi.statuses_update({
      onSuccess: __bind(function(response) {
        this.rightBtn.setEnabled(true);
        this._alertDialog.setTitle(L('post_success'));
        this._alertDialog.setMessage(L('tw_success'));
        this._alertDialog.show();
        return this.close();
      }, this),
      onError: function(error) {
        this.rightBtn.setEnabled(true);
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
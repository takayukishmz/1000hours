var BaseComponent, TitlePanel;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
TitlePanel = (function() {
  __extends(TitlePanel, BaseComponent);
  TitlePanel.prototype.WEEK_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function TitlePanel() {
    TitlePanel.__super__.constructor.call(this, {
      top: 0,
      width: 320,
      height: 45,
      backgroundImage: global.getImagePath('Common/bg')
    });
  }
  TitlePanel.prototype.setView = function() {
    var M, Y, backMonthButton, forwardMonthButton, now;
    this.title = Ti.UI.createLabel({
      top: 2,
      width: 100,
      height: 18,
      text: 'June',
      color: '#383838',
      textAlign: 'center',
      font: {
        fontFamily: 'Condenced-Bold',
        fontSize: 22
      }
    });
    this.add(this.title);
    now = new Date();
    now.setHours(12);
    Y = now.getYear() + 1900;
    M = now.getMonth() + 1;
    backMonthButton = Ti.UI.createView({
      color: "#fff",
      top: 0,
      left: 0,
      height: 33,
      width: 46,
      backgroundImage: global.getImagePath("Calendar/btn_before")
    });
    backMonthButton.addEventListener('click', function() {
      var M_, Y_, date;
      date = new Date(Y, parseInt(M) - 1 - 1);
      Y_ = date.getYear() + 1900;
      M_ = date.getMonth() + 1;
      whenLabel.text = Y_ + "年" + M_ + "月";
      cal(date);
    });
    this.add(backMonthButton);
    forwardMonthButton = Ti.UI.createLabel({
      color: "#fff",
      top: 0,
      right: 0,
      height: 33,
      width: 46,
      backgroundImage: global.getImagePath("Calendar/btn_next")
    });
    forwardMonthButton.addEventListener('click', function() {
      var M_, Y_, date;
      date = new Date(Y, parseInt(M) - 1 + 1);
      Y_ = date.getYear() + 1900;
      M_ = date.getMonth() + 1;
      whenLabel.text = Y_ + "年" + M_ + "月";
      cal(date);
    });
    this.add(forwardMonthButton);
    this._setDaylabels();
  };
  TitlePanel.prototype.setEvent = function() {};
  TitlePanel.prototype.setButton = function() {};
  TitlePanel.prototype._setDaylabels = function() {
    var index, title, value, _len, _ref;
    _ref = this.WEEK_NAME;
    for (index = 0, _len = _ref.length; index < _len; index++) {
      value = _ref[index];
      title = Ti.UI.createLabel({
        bottom: 2,
        left: 45 * index,
        width: 45,
        height: 12,
        text: value,
        color: '#333333',
        shadowColor: '#FFFFFF',
        textAlign: 'center',
        font: {
          fontFamily: 'Regular',
          fontSize: 12
        }
      });
      this.add(title);
    }
  };
  return TitlePanel;
})();
exports.TitlePanel = TitlePanel;
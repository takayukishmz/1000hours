var BaseWindow, TutorialWindow;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
TutorialWindow = (function() {
  __extends(TutorialWindow, BaseWindow);
  TutorialWindow.prototype._TUTORIAL_NUM = 7;
  function TutorialWindow(opt) {
    this.opt = opt;
    this.setButton = __bind(this.setButton, this);
    TutorialWindow.__super__.constructor.call(this, {
      title: 'tutorial'
    });
    return this.win;
  }
  TutorialWindow.prototype.setView = function() {
    return this.setScrollView();
  };
  TutorialWindow.prototype.setScrollView = function() {
    var bottombar, i, scrollView, view, views, _ref;
    views = [];
    for (i = 1, _ref = this._TUTORIAL_NUM; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
      view = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 320,
        height: 372,
        backgroundImage: global.getImagePath('Jp/Tutorial/t' + i)
      });
      views.push(view);
    }
    bottombar = Titanium.UI.createView({
      left: 0,
      top: 417,
      width: 320,
      height: 75,
      backgroundImage: global.getImagePath('Common/bottombar')
    });
    this.win.add(bottombar);
    scrollView = Titanium.UI.createScrollableView({
      views: views,
      top: 45,
      pagingControlColor: 'transparent',
      showPagingControl: true,
      pagingControlHeight: 40,
      maxZoomScale: 1.0,
      currentPage: 0
    });
    this.win.add(scrollView);
  };
  TutorialWindow.prototype.setButton = function() {
    if (this.opt && this.opt.standAlone) {
      this.setRightBtn();
    } else {
      this.setLeftBtn();
    }
    this.setHeaderTitleImage({
      backgroundImage: global.getImagePath('Tutorial/title_turtorial'),
      height: 21,
      width: 120,
      left: 100,
      top: 12
    });
  };
  TutorialWindow.prototype.setRightBtn = function() {
    var rightBtn;
    rightBtn = Ti.UI.createButton({
      top: 1,
      left: 0,
      width: 57,
      height: 44,
      backgroundImage: global.getImagePath('Common/btn_batsu'),
      backgroundSelectedImage: global.getImagePath('Common/btn_batsu_dw')
    });
    rightBtn.addEventListener('click', __bind(function(e) {
      global.tutorialManager.done(global.tutorialManager.LIST.START);
      this.win.close();
    }, this));
    this.win.add(rightBtn);
  };
  TutorialWindow.prototype.setLeftBtn = function() {
    var leftBtn;
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 62,
      height: 44,
      backgroundImage: global.getImagePath('Chart/btn_back'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_back_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      Ti.App.nav.close(this.win, {
        animated: true
      });
    }, this));
    this.win.add(leftBtn);
  };
  TutorialWindow.prototype.setEvent = function() {};
  return TutorialWindow;
})();
exports.TutorialWindow = TutorialWindow;
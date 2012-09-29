var BaseWindow, Chart, ChartWindow, CircleGraph, ShareInputWindow, TotalTimeBarGraph;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BaseWindow = require('Window/BaseWindow').BaseWindow;
TotalTimeBarGraph = require('/Component/Chart/TotalTimeBarGraph').TotalTimeBarGraph;
CircleGraph = require('/Component/Chart/CircleGraph').CircleGraph;
Chart = require('Model/Chart').Chart;
ShareInputWindow = require('Window/ShareInputWindow').ShareInputWindow;
Ti.Facebook.appid = '347563875338453';
Ti.include("Lib/Twitter/twitter_api.js");
ChartWindow = (function() {
  __extends(ChartWindow, BaseWindow);
  function ChartWindow() {
    ChartWindow.__super__.constructor.call(this, {
      title: getText('title_chart')
    });
    this._model = new Chart();
    this._total = new TotalTimeBarGraph();
    this._circle = new CircleGraph();
    this._shareInputWindow = new ShareInputWindow();
    this.win.add(this._total.getNodeView());
    this.win.add(this._circle.getNodeView());
    return this.win;
  }
  ChartWindow.prototype.setView = function() {
    var bottombar;
    this.setHeaderTitleImage({
      backgroundImage: global.getImagePath('Chart/title_chart'),
      height: 21,
      width: 80,
      left: 120,
      top: 12
    });
    bottombar = Titanium.UI.createView({
      left: 0,
      bottom: 0,
      width: 320,
      height: 75,
      backgroundImage: global.getImagePath('Common/bottombar')
    });
    this.win.add(bottombar);
  };
  ChartWindow.prototype.setButton = function() {
    var fbBtn, leftBtn, twBtn;
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 62,
      height: 45,
      backgroundImage: global.getImagePath('Chart/btn_back'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_back_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      this.win.close({
        animated: true
      });
    }, this));
    this.win.add(leftBtn);
    fbBtn = Ti.UI.createButton({
      bottom: 9,
      left: 12,
      width: 145,
      height: 56,
      backgroundImage: global.getImagePath('Chart/btn_share'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_share_dw')
    });
    this.win.add(fbBtn);
    this.setupSNS();
    twBtn = Ti.UI.createButton({
      bottom: 9,
      right: 12,
      width: 145,
      height: 56,
      backgroundImage: global.getImagePath('Chart/btn_tweet'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_tweet_dw')
    });
    this.win.add(twBtn);
    twBtn.addEventListener('click', __bind(function() {
      if (Ti.App.twitterApi.isAuthorized()) {
        info('twitter already login');
        this._shareInputWindow.open({
          modal: true
        }, this._shareInputWindow.TYPE.TWITTER);
      } else {
        info('twitter login');
        Ti.App.twitterApi.init();
      }
    }, this));
    fbBtn.addEventListener('click', __bind(function() {
      if (Ti.Facebook.loggedIn) {
        info('fb already login');
        this._shareInputWindow.open({
          modal: true
        }, this._shareInputWindow.TYPE.FACEBOOK);
      } else {
        info('fb login');
        Ti.Facebook.authorize();
      }
    }, this));
  };
  ChartWindow.prototype.setEvent = function() {
    Ti.App.addEventListener('hoge', function() {
      info(Ti.Platform.availableMemory);
    });
    return this.win.addEventListener('focus', __bind(function(e) {
      this._model.setGraphData();
    }, this));
  };
  ChartWindow.prototype.setupSNS = function() {
    Ti.App.twitterApi = new TwitterApi({
      consumerKey: 'Oc8B1N6kitWFhfHSZ8i8w',
      consumerSecret: 'z81i4T1kgwgj2jN4b4IkQ12ugzqygngHSUAAYRED6Z4'
    });
  };
  return ChartWindow;
})();
exports.ChartWindow = ChartWindow;
var BaseWindow, Chart, ChartWindow, CircleGraph, FontWindow, TotalTimeBarGraph;
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
FontWindow = require('Window/Debug/FontWindow').FontWindow;
ChartWindow = (function() {
  __extends(ChartWindow, BaseWindow);
  function ChartWindow() {
    ChartWindow.__super__.constructor.call(this, {
      title: getText('title_chart')
    });
    this._model = new Chart();
    this._total = new TotalTimeBarGraph();
    this._circle = new CircleGraph();
    this.win.add(this._total.getNodeView());
    this.win.add(this._circle.getNodeView());
    this._model.setGraphData();
    return this.win;
  }
  ChartWindow.prototype.setView = function() {};
  ChartWindow.prototype.setButton = function() {
    var fbBtn, leftBtn, twBtn;
    leftBtn = Ti.UI.createButton({
      top: 0,
      left: 0,
      width: 72,
      height: 44,
      backgroundImage: global.getImagePath('Chart/btn_back'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_back_dw')
    });
    leftBtn.addEventListener('click', __bind(function(e) {
      this.win.close({
        animated: true
      });
    }, this));
    this.win.leftNavButton = leftBtn;
    fbBtn = Ti.UI.createButton({
      top: 348,
      left: 20,
      width: 134,
      height: 38,
      backgroundImage: global.getImagePath('Chart/btn_share'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_share_dw')
    });
    this.win.add(fbBtn);
    twBtn = Ti.UI.createButton({
      top: 348,
      right: 20,
      width: 134,
      height: 38,
      backgroundImage: global.getImagePath('Chart/btn_tweet'),
      backgroundSelectedImage: global.getImagePath('Chart/btn_tweet_dw')
    });
    this.win.add(twBtn);
  };
  ChartWindow.prototype.setEvent = function() {};
  return ChartWindow;
})();
exports.ChartWindow = ChartWindow;
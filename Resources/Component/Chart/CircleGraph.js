var BaseComponent, CircleGraph, Const, EventType;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
Const = require('/Lib/Const').Const;
EventType = require('Event/EventType').EventType;
CircleGraph = (function() {
  __extends(CircleGraph, BaseComponent);
  CircleGraph.prototype._ICON_SIZE = [35, 29];
  CircleGraph.prototype._ICON_MARGIN = 10;
  CircleGraph.prototype._ICON_POS = [185, 180];
  CircleGraph.prototype._WEBVIEW_URL_CIRCLE = "https://dl.dropbox.com/u/15300991/circle.html?";
  function CircleGraph() {
    this._setTime = __bind(this._setTime, this);    CircleGraph.__super__.constructor.call(this, {
      top: 0,
      height: '333'
    });
  }
  CircleGraph.prototype._setTime = function(times) {
    var h, hour, hourValue, i, icon, left, m, min, minuteValue, param, timeTypes, top, value, _len, _len2;
    timeTypes = Const.TIME_TYPE;
    for (i = 0, _len = timeTypes.length; i < _len; i++) {
      value = timeTypes[i];
      hourValue = Math.floor(times[value] / 60);
      minuteValue = times[value] - hourValue * 60;
      left = this._ICON_POS[0];
      top = this._ICON_POS[1] + i * (this._ICON_SIZE[1] + this._ICON_MARGIN);
      icon = Ti.UI.createView({
        top: top,
        left: left,
        width: this._ICON_SIZE[0],
        height: this._ICON_SIZE[1],
        backgroundImage: global.getImagePath('Chart/icon_' + value.toLowerCase())
      });
      this.add(icon);
      hour = Ti.UI.createLabel({
        top: top,
        right: 68,
        width: 30,
        height: 25,
        text: hourValue,
        textAlign: 'right',
        color: '#000',
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 16,
          fontWeight: "bold"
        }
      });
      this.add(hour);
      h = Ti.UI.createLabel({
        top: top,
        left: 255,
        width: 30,
        height: 25,
        text: 'h.',
        color: '#CCCCCC',
        shadowColor: "#FFFFFF",
        shadowOffset: {
          x: 0,
          y: 2
        },
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 16,
          fontWeight: "bold"
        }
      });
      this.add(h);
      min = Ti.UI.createLabel({
        top: top,
        right: 29,
        width: 30,
        height: 25,
        text: minuteValue,
        textAlign: 'right',
        color: '#000',
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 16,
          fontWeight: "bold"
        }
      });
      this.add(min);
      m = Ti.UI.createLabel({
        top: top,
        left: 293,
        width: 100,
        height: 25,
        text: 'm',
        color: '#CCCCCC',
        shadowColor: "#FFFFFF",
        shadowOffset: {
          x: 0,
          y: 2
        },
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 16,
          fontWeight: "bold"
        }
      });
      this.add(m);
    }
    this.webviewMsg = Ti.UI.createLabel({
      top: 235,
      left: 20,
      width: 160,
      height: 50,
      text: '',
      textAlign: 'center',
      color: '#444',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 16
      }
    });
    this.webview = Ti.UI.createWebView({
      backgroundColor: 0,
      top: 175,
      left: 10,
      width: 160,
      height: 160
    });
    this.webview.addEventListener('beforeload', __bind(function(e) {
      info('WEBVIEW beforeload');
      this.webviewMsg.text = L('webview_load');
    }, this));
    this.webview.addEventListener('error', __bind(function(e) {
      info('WEBVIEW error');
      this.webviewMsg.text = L('webview_error');
    }, this));
    this.webview.addEventListener('load', __bind(function(e) {
      info('WEBVIEW load');
      this.webviewMsg.text = '';
    }, this));
    this.webview.addEventListener('touchmove', function() {});
    this.add(this.webview);
    this.add(this.webviewMsg);
    param = "";
    for (i = 0, _len2 = timeTypes.length; i < _len2; i++) {
      value = timeTypes[i];
      param += value + '=' + times[value] + '&';
    }
    this.webview.url = this._WEBVIEW_URL_CIRCLE + param;
  };
  CircleGraph.prototype.setEvent = function() {
    return Ti.App.addEventListener(EventType.update_circle_graph, __bind(function(times) {
      this._setTime(times);
    }, this));
  };
  return CircleGraph;
})();
exports.CircleGraph = CircleGraph;
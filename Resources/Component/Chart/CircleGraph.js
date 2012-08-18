var BaseComponent, CircleGraph, Const, EventType;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
Const = require('/Lib/Const').Const;
EventType = require('Event/EventType').EventType;
CircleGraph = (function() {
  __extends(CircleGraph, BaseComponent);
  CircleGraph.prototype._ICON_SIZE = [35, 29];
  CircleGraph.prototype._ICON_MARGIN = 10;
  CircleGraph.prototype._ICON_POS = [185, 180];
  function CircleGraph() {
    CircleGraph.__super__.constructor.call(this, {
      top: 0,
      height: '333'
    });
    this.webview = Ti.UI.createWebView({
      backgroundColor: '#fff',
      scalesPageToFit: true,
      top: 185,
      left: 0,
      width: 160,
      height: 160
    });
    this.webview.addEventListener('beforeload', function(e) {
      alert('beforeload');
    });
    this.webview.addEventListener('error', function(e) {
      alert('error');
    });
    this.webview.addEventListener('load', function(e) {
      alert('load');
    });
    this.add(this.webview);
  }
  CircleGraph.prototype._setTime = function(times) {
    var h, hour, hourValue, i, icon, left, m, min, minuteValue, param, timeTypes, top, value, _len, _len2;
    timeTypes = Const.TIME_TYPE;
    param = "";
    for (i = 0, _len = timeTypes.length; i < _len; i++) {
      value = timeTypes[i];
      param += value + '=' + times[value] + '&';
    }
    alert(param);
    this.webview.url = "https://dl.dropbox.com/u/15300991/circle.html?" + param;
    for (i = 0, _len2 = timeTypes.length; i < _len2; i++) {
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
        width: 100,
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
        left: 268,
        width: 100,
        height: 25,
        text: minuteValue,
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
        left: 290,
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
  };
  CircleGraph.prototype.setEvent = function() {
    return Ti.App.addEventListener(EventType.update_circle_graph, __bind(function(times) {
      this._setTime(times);
    }, this));
  };
  return CircleGraph;
})();
exports.CircleGraph = CircleGraph;
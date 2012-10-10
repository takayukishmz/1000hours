var BarMeter, BaseComponent, Const, EventType, TotalTimeBarGraph;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseComponent = require('Component/Common/BaseComponent').BaseComponent;
BarMeter = require('/Component/Common/BarMeter').BarMeter;
Const = require('/Lib/Const').Const;
EventType = require('Event/EventType').EventType;
TotalTimeBarGraph = (function() {
  __extends(TotalTimeBarGraph, BaseComponent);
  TotalTimeBarGraph.prototype._BAR_RECT = {
    left: 15,
    top: 103,
    width: 290,
    height: 45
  };
  function TotalTimeBarGraph() {
    this.setMarkPosition = __bind(this.setMarkPosition, this);    TotalTimeBarGraph.__super__.constructor.call(this, {
      top: 45,
      left: 0,
      width: 320,
      height: 200
    });
    this._bar = new BarMeter(this._BAR_RECT);
    this._bar.buildBar([290, 45]);
    this._bar.setValue(44, Const.MAX_HOUR);
    this.setMarkPosition();
    this.add(this._bar.getNodeView());
  }
  TotalTimeBarGraph.prototype.setView = function() {
    var bg, h, hourUnit, m, max, slash, total;
    bg = Ti.UI.createView({
      left: 0,
      top: 5,
      width: 'auto',
      align: 'right',
      height: 155,
      backgroundImage: global.getImagePath('Chart/bg_barArea')
    });
    this.add(bg);
    total = Ti.UI.createView({
      left: 17,
      top: 22,
      width: 60,
      align: 'right',
      height: 18,
      backgroundImage: global.getImagePath('Chart/txt_total')
    });
    this.add(total);
    this.hour = Ti.UI.createLabel({
      left: 25,
      bottom: 113,
      width: 75,
      height: 35,
      text: '000',
      textAlign: 'right',
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 35,
        fontWeight: "bold"
      }
    });
    this.add(this.hour);
    h = Ti.UI.createLabel({
      left: 105,
      bottom: 113,
      width: 100,
      height: 27,
      text: 'h.',
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 27,
        fontWeight: "bold"
      }
    });
    this.add(h);
    this.minute = Ti.UI.createLabel({
      left: 126,
      bottom: 113,
      width: 35,
      height: 26,
      textAlign: 'right',
      text: '0',
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 26,
        fontWeight: "bold"
      }
    });
    this.add(this.minute);
    m = Ti.UI.createLabel({
      left: 166,
      bottom: 113,
      width: 40,
      height: 18,
      text: 'm',
      color: '#333333',
      shadowColor: "#FFFFFF",
      shadowOffset: {
        x: 0,
        y: 2
      },
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 18,
        fontWeight: "bold"
      }
    });
    this.add(m);
    slash = Ti.UI.createView({
      left: 190,
      bottom: 113,
      width: 17,
      height: 21,
      backgroundImage: global.getImagePath('Chart/slash')
    });
    this.add(slash);
    max = Ti.UI.createLabel({
      left: 211,
      bottom: 113,
      width: 40,
      height: 16,
      text: Const.MAX_HOUR,
      textAlign: 'right',
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
      }
    });
    this.add(max);
    hourUnit = Ti.UI.createLabel({
      left: 256,
      bottom: 113,
      width: 200,
      height: 16,
      text: 'h',
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
      }
    });
    this.add(hourUnit);
    this.goal = Ti.UI.createView({
      left: 290,
      top: 89,
      width: 17,
      height: 16,
      backgroundImage: global.getImagePath('Chart/mark_flag'),
      SelectedBackgroundImage: global.getImagePath('Chart/mark_flag_dw')
    });
    this.add(this.goal);
    this.goalAchieve = Ti.UI.createView({
      left: 281,
      top: 87,
      width: 26,
      height: 18,
      backgroundImage: global.getImagePath('Chart/mark_goal'),
      SelectedBackgroundImage: global.getImagePath('Chart/mark_goal_dw')
    });
    this.add(this.goalAchieve);
    this.goalAchieve.setVisible(false);
    this.mark = Ti.UI.createView({
      left: 25,
      top: 91,
      width: 20,
      height: 15,
      backgroundImage: global.getImagePath('Chart/mark_turtle'),
      SelectedBackgroundImage: global.getImagePath('Chart/mark_turtle_dw')
    });
    return this.add(this.mark);
  };
  TotalTimeBarGraph.prototype.setEvent = function() {
    return Ti.App.addEventListener(EventType.update_bar_graph, __bind(function(e) {
      var timeFormatedAsHour;
      timeFormatedAsHour = e.hour + e.minute / 60;
      this._bar.setValue(timeFormatedAsHour, Const.MAX_HOUR);
      this.setMarkPosition();
      this.hour.text = e.hour;
      return this.minute.text = e.minute;
    }, this));
  };
  TotalTimeBarGraph.prototype.setButton = function() {};
  TotalTimeBarGraph.prototype.setMarkPosition = function() {
    var barPosX, ratio;
    barPosX = this._BAR_RECT.left + this._bar.getCoverWitdh() - 7;
    this.mark.left = barPosX;
    ratio = this._bar.getRatio();
    if (ratio >= 1) {
      this.goalAchieve.setVisible(true);
      this.goal.setVisible(false);
      this.mark.setVisible(false);
    } else {
      this.goalAchieve.setVisible(false);
      this.goal.setVisible(true);
      this.mark.setVisible(true);
    }
  };
  return TotalTimeBarGraph;
})();
exports.TotalTimeBarGraph = TotalTimeBarGraph;
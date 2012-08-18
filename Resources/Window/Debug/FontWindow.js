var BaseWindow, FontWindow, fontArr;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BaseWindow = require('Window/BaseWindow').BaseWindow;
FontWindow = (function() {
  __extends(FontWindow, BaseWindow);
  function FontWindow() {
    this.loadListView = __bind(this.loadListView, this);    this.tableview = Titanium.UI.createTableView({
      separatorColor: '#000',
      backgroundColor: 'transparent'
    });
    FontWindow.__super__.constructor.call(this, {
      title: 'font list'
    });
    this.loadListView();
    this.win.add(this.tableview);
    return this.win;
  }
  FontWindow.prototype.setView = function() {};
  FontWindow.prototype.setEvent = function() {};
  FontWindow.prototype.setButton = function() {};
  FontWindow.prototype.loadListView = function() {
    var data, i, _i, _len;
    data = [];
    for (_i = 0, _len = fontArr.length; _i < _len; _i++) {
      i = fontArr[_i];
      info(i);
      data.push(this.createListView(i));
      this.tableview.data = data;
    }
  };
  FontWindow.prototype.createListView = function(font) {
    var row, section, text;
    section = Ti.UI.createTableViewSection();
    row = Titanium.UI.createTableViewRow({
      height: 80,
      backgroundImage: '#000000'
    });
    text = Titanium.UI.createLabel({
      top: 0,
      left: 0,
      text: font + ":",
      width: 320,
      height: 30,
      font: {
        fontSize: 14
      }
    });
    row.add(text);
    text = Titanium.UI.createLabel({
      top: 30,
      left: 10,
      text: 'abcdefghijklm 1234567890',
      width: 320,
      height: 30,
      font: {
        fontFamily: font,
        fontSize: 22
      }
    });
    row.add(text);
    section.add(row);
    return section;
  };
  return FontWindow;
})();
exports.FontWindow = FontWindow;
fontArr = ["Academy Engraved LET", "American Typewriter", "Apple Color Emoji", "AppleGothic", "Arial", "Arial Hebrew", "Arial Rounded MT Bold", "Bangla Sangam MN", "Baskerville", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni Ornaments", "Bradley Hand", "Chalkboard SE", "Chalkduster", "Cochin", "Copperplate", "Courier", "Courier New", "Devanagari Sangam MN", "Didot", "Euphemia UCAS", "Futura", "Geeza Pro", "Georgia", "Gill Sans", "Gujarati Sangam MN", "Gurmukhi MN", "Heiti SC", "Heiti TC", "Helvetica", "Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Kailasa", "Kannada Sangam MN", "Malayalam Sangam MN", "Marion", "Marker Felt", "Noteworthy", "Optima", "Oriya Sangam MN", "Palatino", "Papyrus", "Party LET", "Sinhala Sangam MN", "Snell Roundhand", "Tamil Sangam MN", "Telugu Sangam MN", "Thonburi", "Times New Roman", "Trebuchet MS", "Verdana", "Zapf Dingbats", "Zapfino"];
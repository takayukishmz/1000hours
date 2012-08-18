var BaseWindow;
BaseWindow = (function() {
  function BaseWindow(params) {
    this.params = params;
    this.win = Ti.UI.createWindow(this.params);
    info('BaseWindow', this.params.title);
    this.win.backgroundImage = global.getImagePath('Common/bg');
    this.win.barColor = '#333';
    this.win.barImage = global.getImagePath('Common/topbar');
    this.setView();
    this.setButton();
    this.setEvent();
  }
  BaseWindow.prototype.setView = function() {};
  BaseWindow.prototype.setButton = function() {};
  BaseWindow.prototype.setEvent = function() {};
  BaseWindow.prototype.open = function(args) {
    this.win.open(args);
  };
  BaseWindow.prototype.close = function(args) {
    this.win.close(args);
  };
  return BaseWindow;
})();
exports.BaseWindow = BaseWindow;
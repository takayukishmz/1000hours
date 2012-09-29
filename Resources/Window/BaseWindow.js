var BaseWindow;
BaseWindow = (function() {
  function BaseWindow(params) {
    this.params = params;
    this.win = Ti.UI.createWindow(this.params);
    info('BaseWindow', this.params.title);
    this.win.backgroundImage = global.getImagePath('Common/bg');
    this.win.barColor = '#333';
    this.win.hideNavBar();
    this.setHeaderBg(global.getImagePath('Common/topbar'));
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
  BaseWindow.prototype.setHeaderBg = function(path) {
    if (!this.header) {
      this.header = Ti.UI.createView({
        top: 0,
        left: 0,
        width: 'auto',
        height: 45
      });
      this.win.add(this.header);
    }
    this.header.backgroundImage = path;
  };
  BaseWindow.prototype.setHeaderTitleImage = function(param) {
    var titleImg;
    titleImg = Ti.UI.createView(param);
    this.win.add(titleImg);
  };
  return BaseWindow;
})();
exports.BaseWindow = BaseWindow;
exports.TabGroup = function() {
  var argument, self, tab, _i, _len;
  self = Ti.UI.createTabGroup();
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    argument = arguments[_i];
    tab = Ti.UI.createTab(argument);
    if (_i === 0) {
      self.currentTab = tab;
    }
    self.addTab(tab);
  }
  self.addEventListener("focus", function(e) {
    self.currentTab = e.tab;
  });
  return self;
};
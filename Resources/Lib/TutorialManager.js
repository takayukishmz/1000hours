var TutorialManager;
TutorialManager = (function() {
  TutorialManager.prototype.LIST = {
    START: 1
  };
  function TutorialManager() {
    this.file = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + '../Documents/tutorial.txt');
    if (this.file.read()) {
      try {
        info('file content exists');
        this.contents = JSON.parse(this.file.read());
        info(this.contents);
      } catch (error) {
        info('Parse Error', error);
        this.contents = [];
      }
    } else {
      info('create new File Content');
      this.file.write(JSON.stringify([]));
      this.contents = [];
    }
  }
  TutorialManager.prototype.getIdList = function() {
    return this.contents;
  };
  TutorialManager.prototype.isDone = function(number) {
    var index;
    index = this.contents.indexOf(number);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  TutorialManager.prototype.done = function(number) {
    var index;
    index = this.contents.indexOf(number);
    if (index === -1) {
      this.contents.push(number);
      try {
        info(this.contents);
        return this.file.write(JSON.stringify(this.contents));
      } catch (error) {
        alert('hoge');
        return info('Parse Error', error);
      }
    }
  };
  return TutorialManager;
})();
exports.TutorialManager = TutorialManager;
const extendObservable = require('../libs/mobx').extendObservable;

var systemStore = function() {
  extendObservable(this, {
    statusBarHeight: 44,
    titleBarHeight: 0,
    totalTopHeight: 0,
    systemInfo: {},
    isIpx: false, //是否iPhone X
    isAndroid: false, //是否是Android
  });
}

module.exports = {
  default: new systemStore
}
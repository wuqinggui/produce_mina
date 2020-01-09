var Modal = function () {
  this.show = ({ 
    title = '', 
    content = '', 
    showCancel = true, 
    cancelText = '取消', 
    cancelColor = '#000000', 
    confirmText = '确定',
    confirmColor = '#576B95',
    success = function () {}, 
    fail = function () {}, 
    complete = function () {}
  }) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor,
      success: (res) => {
        success(res);
      },
      fail: (error) => {
        fail(error);
      },
      complete: (res) => {
        complete(res);
      }
    });
  }
};

module.exports = {
  default: new Modal
}

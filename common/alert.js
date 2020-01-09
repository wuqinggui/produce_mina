/* 弹出框 */
module.exports = {
    /* 弹出加载中框 */
    loading: function (title) {
        wx.showLoading({
            title: title || '数据加载中',
            mask: true,
        });
    },

    /* 关闭加载框 */
    closeLoading: function () {
        wx.hideLoading({
            title: '数据加载中',
        });
    },

    /* 消息提示 */
    message: function (msg, title) {
        wx.showModal({
            title: title || '提示信息',
            content: msg,
            showCancel: false
        });
    },
    model(obj, success, error){
        wx.showModal({
            content: obj.content || '提示',
            showCancel: false,
            confirmColor: obj.color || '#F7941D',
            success(res) {
                if (res.confirm){
                    if(success && typeof success === 'function') success()
                }else{
                    if(error && typeof error === 'function') error()
                }
            }
          })
    },
    confirm(obj, success, error){
        wx.showModal({
			title: obj.title || '提示',
            content: obj.content || '确认操作',
            confirmColor: obj.color || '#F7941D',
			success(res) {
                if (res.confirm){
                    if(success && typeof success === 'function') success()
                }else{
                    if(error && typeof error === 'function') error()
                }
                 
			}
		})
    },
    /* 成功提示框 */
    success: function (msg) {
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
        })
    },

    /* 失败提示框 */
    error: function (msg) {
        wx.showToast({
            title: msg,
            image: '/static/images/icon_close.png',
            duration: 2000
        })
    }
};

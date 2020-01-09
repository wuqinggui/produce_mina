const URL = 'https://www.api.yuncjs.cn/debug/submit'
// const URL = 'https://127.0.0.1:7001/debug/submit'
const originApp = App // 保存原有的App方法
const originPage = Page // 保存原有的Page方法
const originRequest = wx.request // 保存原有的request方法

class debugLog {
  constructor() {
    // super()
    this.breadcrumbs = []
    this.config = {
      appKey: '',
      appName: 'test'
    }
    this.systemInfo = this.getSystemInfo()
    this.interceptApp()
    this.interceptPage()
    this.interceptRequest()
  }
  // 劫持小程序App方法
  interceptApp() {
    const _self = this
    App = function (app) {
      let methodArr = ['onLaunch', 'onShow', 'onHide', 'onError']
      methodArr.forEach(methodName => {
        let defineMethod = app[methodName] // 保存用户定义的方法
        app[methodName] = function (options) {
          let breadcrumb = {
            type: 'function', // 类型
            time: Math.floor(+new Date() / 1000), // 触发时间
            belong: 'App', // 来源
            method: methodName, // 方法名
            path: options && options.path, // 页面路径
            query: options && options.query, // 页面参数
            scene: options && options.scene // 场景编号
          }
          _self.pushToBreadCrumbs(breadcrumb)
          methodName === 'onError' && _self.notifyError(options, 1)
          return defineMethod && defineMethod.call(this, options)
        }
      })
      return originApp(app) // 执行用户定义的方法
    }
  }

  // 劫持小程序page方法
  interceptPage() {
    Page = (page) => {
      Object.keys(page).forEach((methodName) => {
        typeof page[methodName] === 'function' && this.recordPageFn(page, methodName)
      })
      // 强制记录onReady 和 onLoad
      page.onReady || this.recordPageFn(page, 'onReady')
      page.onLoad || this.recordPageFn(page, 'onLoad')
      return originPage(page)
    }
  }

  // 劫持小程序request方法
  interceptRequest() {
    let _self = this
    let ignoreCode = [1004, 3001, 3002, 3003, 3004, 3005]
    Object.defineProperty(wx, 'request', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        let config = arguments[0] || {}
        let failFn = config.fail
        let successFn = config.success
        let data = {
          type: 2,
          data: config.data,
          method: config.method || 'GET',
          url: config.url,
          header: config.header,
          status: null,
          statusCode: null,
          msg: ''
        }
        config.fail = function (err) {
          data.msg = err.errMsg
          _self.notifyError(data, 2)
          return failFn.apply(this, arguments)
        }
        config.success = function (res) {
          data.statusCode = res.statusCode
          if (res.statusCode === 500) return
          if (res.statusCode !== 200) {
            data.msg = res.message || ''
            _self.notifyError(data, 2)
          } else if (res.data && res.data.code !== 0 && !ignoreCode.includes(res.data.code)) {
            data.status = res.data.code || null
            data.msg = res.data.msg || ''
            _self.notifyError(data, 2)
          }
          return successFn.apply(this, arguments)
        }
        return originRequest.apply(this, arguments);
      }
    })
  }

  // 上报bug
  notifyError(errRow, type) { // type: 1. script  2. request
    let { appKey, appName } = this.config
    let { brand, model, version, system, platform, SDKVersion } = this.systemInfo
    let data = {
      type,
      appKey,
      appName,
      createTime: Math.floor(+new Date() / 1000),
      errMsg: null,
      errType: null,
      errFn: null,
      errPath: null,
      data: null,
      method: null,
      url: null,
      header: null,
      status: null,
      statusCode: null,
      msg: null,
      brand,
      model,
      version,
      system,
      platform,
      SDKVersion,
      breadcrumbs: this.breadcrumbs
    }
    if (type === 1) {
      let errArr = errRow.split('at ')
      let errType = errArr[1].split('\n')[1].split(':')[0]
      let errMsg = errArr[0].split('\n')[1]
      let errFn = errArr[2].split('(')[0]
      let errPath = errArr[2].split('appservice/')[1].split(':')[0]
      if (errFn.replace(/(^\s*)|(\s*$)/g, '') === 'e') return
      Object.assign(data, {
        errMsg,
        errType,
        errFn,
        errPath
      })
    } else if (type === 2) {
      Object.assign(data, errRow)
    }
    originRequest({
      url: URL,
      data: data,
      method: 'POST'
    })
  }

  // 获取系统信息
  getSystemInfo() {
    return wx.getSystemInfoSync()
  }

  // 记录执行的方法栈, 最多记录20个
  pushToBreadCrumbs(obj) {
    this.breadcrumbs.push(obj)
    this.breadcrumbs.length > 20 && this.breadcrumbs.shift()
  }

  // 获取当前显示的页面
  getActivePage() {
    let curPages = getCurrentPages()
    if (curPages.length) {
      return curPages[curPages.length - 1]
    }
    return {}
  }

  // 记录Page执行信息
  recordPageFn(page, methodName) {
    const _self = this
    const defineMethod = page[methodName]
    page[methodName] = function () {
      if (methodName === 'onLoad' || methodName === 'onShow') {
        _self.activePage = _self.getActivePage()
      }
      let breadcrumb = {
        type: 'function',
        time: Math.floor(+new Date() / 1000),
        belong: 'Page',
        method: methodName,
        route: _self.activePage && _self.activePage.route,
        options: _self.activePage && _self.activePage.options
      }
      methodName === 'onLoad' && (breadcrumb.args = arguments)
      _self.pushToBreadCrumbs(breadcrumb)
      return defineMethod && defineMethod.apply(this, arguments)
    }
  }
}
export default new debugLog()
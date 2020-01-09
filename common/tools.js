const Alert = require('./alert.js');
export default () => {
  // 全局修改page
  const originPage = Page
  const originApp = App
  Page = (page) => {
    let app = getApp()
    // 注入消息弹框
    page['$msg'] = Alert
    // 判断是否为iphoneX
    Object.keys(page).forEach(methodName => {
      (methodName === 'data') && (page[methodName].isIpx = app.globalData.isIpx)
    })
    return originPage(page)
  }
  App = (app) => {
    app['$msg'] = Alert
    return originApp(app)
  }
}
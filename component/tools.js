export default () => {
  // 全局修改page
  const originPage = Page
  Page = (page) => {
    // 判断是否为iphoneX
    Object.keys(page).forEach(methodName => {
      (methodName === 'data') && (page[methodName].isIpx = getApp().globalData.isIpx)
    })
    return originPage(page)
  }
}
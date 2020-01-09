/**
 * 时间戳格式转化
 * 1: yy-mm-dd hh:mm:ss
 * 2: yy/mm/dd hh:mm
 * 3: yy/mm/dd
 * 4: hh:mm:ss
 * 5: yy-mm-dd
 * 6: yy-mm-dd hh:mm
 * 7: yy.mm.dd
 * 8: hh:mm
 */
const formatTime = (date, type) => {
  const time = new Date(date * 1000)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  if (type === 1) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (type === 2) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else if (type === 3) {
    return [year, month, day].map(formatNumber).join('/')
  } else if (type === 4) {
    return [hour, minute, second].map(formatNumber).join(':')
  } else if (type === 5) {
    return [year, month, day].map(formatNumber).join('-')
  } else if (type === 6) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else if (type === 7) {
    return [year, month, day].map(formatNumber).join('.')
  } else if (type === 8) {
    return [hour, minute].map(formatNumber).join(':')
  } else if (type === 9) {
    return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = m => {
  return m < 10 ? '0' + m : m
}

/**
 * 时间戳剩余样式格式化
 * @param timespan
 * @returns {*}
 */
function formatMsgTime(timespan) {

  timeSpanStr = "";

  try {
    var dateTime = new Date(parseInt(timespan) * 1000);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(new Date()) / 1000;  //typescript转换写法

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;
    //console.log("milliseconds", milliseconds);
    var day = Math.abs(Math.floor(milliseconds / 86400));
    var hour = Math.abs(Math.floor(milliseconds % 86400 / 3600));
    var minute = Math.abs(Math.floor(milliseconds % 86400 % 3600 / 60));


    const prex = milliseconds > 0 ? "前" : "后";

    if (day > 0) {
      timeSpanStr = day + '天' + prex;
    } else if (hour > 0) {
      timeSpanStr = hour + '小时' + prex;
    } else if (minute > 0) {
      timeSpanStr = minute + '分钟' + prex;
    } else {
      timeSpanStr = minute + '分钟' + prex;
    }
  } catch (e) {
  }

  return timeSpanStr;
}

/**
 * 日期格式化
 * @param date
 * @returns {String}
 */
function formatDate(date) {
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

/**
 * 正则表达式匹配
 * @param matchType
 * @param value
 * @returns {Boolean}
 */
function matchFn(matchType, value) {
  const match = {
    // 链接
    url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/gi,
    // 固话
    phone: /^((\d{8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/gi,
    // 手机号码
    tel: /^1[345789]\d{9}$/gi,
    // 正整数（不包含0）
    positiveInt: /^[1-9]\d*$/gi,
    // 非负整数（包含0）
    nonnegativeInt: /^[1-9]\d*|0$/gi,
    // 浮点
    float: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/gi,
    // 小数点后不超过两位
    floatFixedTwo: /^\d+(\.\d{1,2})?$/gi,
    // 邮编
    postcode: /^[1-9]\d{5}(?!\d)$/gi,
    // 邮箱
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi,
    // 字母或数字
    letterOrNum: /^[a-zA-Z\d]+$/gi,
    // 10位，第一个不能为0
    // 可以输入中文，字母，数字
    room: /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/gi,
    // 身份证
    identity_no: /^\d{15}|\d{18}$/gi
  }
  return match[matchType].test(value);
}

/**
 * 非空判断
 * @param value
 * @returns {Boolean}
 */
function isBlank(value) {
  return value === null || value === undefined || value === 'null' || value === 'undefined' || value === '';
}

/**
 * 获取当前页url
 */
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage    //当前页面url
  return url
}

module.exports = {
  formatTime,
  matchFn,
  isBlank,
  formatMsgTime,
  formatDate,
  getCurrentPageUrl
}

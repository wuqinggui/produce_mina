/**
 * 时间戳格式转化
 * 1: yyyy-mm-dd hh:mm:ss
 */
const formatTime = (date, type) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  if (type && type == 1) {
    // 获取时分秒
    return [hour, minute, second].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = m => {
  return m < 10 ? '0' + m : m
}

/**
 * 时分秒转成时间戳
 */

 function formatTimeNumber (time) {
  var result = '';
  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];
  result = Number(hour*3600) + Number(min*60) + Number(sec);
  return result;
 }


/**
 * 时间戳剩余样式格式化
 * @param timespan
 * @returns {*}
 * new Date(new Date().getTime()).setHours(10, 0, 0, 0) setHours函数用于基于当地时间设置当前Date对象中的小时值
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

  } catch (e) {}
  return timeSpanStr;
}

/*生成随机数, n代表生成几位的随机数*/
function getRandom(n){
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var nums = '';
  for (var i = 0; i < n; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
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
    url: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
    // 固话
    phone: /^((\d{8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
    // 手机号码
    mobile : /^0?1[3|4|5|7|8][0-9]\d{8}$/,
    // 数字
    number : /^(-?\d+)(\.\d+)?$/,
    // 整数（包含正整数，负整数，0）
    int : /^[-]?([0-9]+\d*)$/,
    // 正整数（不包含0）
    positiveInt : /^([1-9]+\d*)$/,
    // 非负整数（包含0）
    nonnegativeInt: /^[1-9]\d*|0$/,
    // 浮点
    float: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,
    // 小数点后不超过两位
    floatFixedTwo: /^\d+(\.\d{1,2})?$/,
    // 邮编
    postCode:/^[0-9]{6}$/,
    // 邮箱
    email : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    // 字母或数字
    letterOrNum: /^[a-zA-Z\d]+$/,
    // 10位，第一个不能为0，可以输入中文，字母，数字
    room: /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/,
    // 身份证
    idCardNo:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    // 百分数
    percentage: /^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/,
    // 年月日（yyyy-mm-dd）
    date : /^(\d{4})-(\d{2})-(\d{2})$/,
    // 年月日时分秒（yyyy-mm-dd hh:mm:ss）
    datetime : /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/,
    // 汉字
    chn:/^[\u4e00-\u9fa5]+$/,
    // 统一社会信用代码
    unifiedSocialCreditCode:/^[A-Z0-9]{18}$/,
    // 组织代码
    orgCode:/^[A-Z0-9]{8}\-[A-Z0-9]{1}$/,
  }
  return match[matchType].test(value);
}

/**
 * 非空判断
 * @param value
 * @returns {Boolean}
 */
function isBlank(value) {
  return value === null || value === undefined || value === 'null' || value === 'undefined' || value === '' || value === {} || JSON.stringify(value) === '';
}

/**
 * 获取当前页url
 */
function getCurrentPageUrl(type) {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url（不含参数）
  var options = currentPage.options //当前页面的参数
  var pageURL = url;
  var objectIndex = 1;
  for (var i in options) {
    if (objectIndex === 1) {
      // 第一个参数
      pageURL = pageURL + '?' + i + '=' + options[i];
      objectIndex = 2;
    } else {
      pageURL = pageURL + '&' + i + '=' + options[i];
    }
  }
  if (type) {
    // 当前页面url（不含参数）
    return url
  } else {
    // 返回一个完整的url
    return pageURL
  }
}

module.exports = {
  formatTime,
  formatTimeNumber,
  formatMsgTime,
  getRandom,
  matchFn,
  isBlank,
  getCurrentPageUrl
}

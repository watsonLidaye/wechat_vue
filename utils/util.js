
/**
 * 加载SDK库
 */
var common = require('./sdk/common');
var net = require('./sdk/net');
var media = require('./sdk/media');
var file = require('./sdk/file');
var cache = require('./sdk/cache');
var location = require('./sdk/location');
var driver = require('./sdk/driver');
var open = require('./sdk/open');
var ui = require('./sdk/ui');
var md5 = require('./sdk/md5');




/*
 *@: title: 用户登录Login
 *@: params 
 *@: return void
 */
function login(app,userInfo,pages) {
  let that = app
  var url = that.GO.api + "/service/passport/signin"
  let form_data = {}
  let session_id=""
  return new Promise((resolve,reject)=>{
  
    wx.login({
      success: function (res) {
        session_id = cache.getStorage('user_info') ? cache.getStorage('user_info').sessionId : ''
        form_data.clientCode = res.code
        form_data.encryptedKey = userInfo ? userInfo.iv : ''
        form_data.encryptedData = userInfo ? userInfo.encryptedData : ''
        wx.request({
          url: url,
          data: {
            appId: that.GO.app_id,
            formData: form_data,
            sessionId: session_id,

          },
          method: 'POST',
          success: function (res) {
            if (res.data.status == 'success') {
              resolve(res)
              that.GO.user_info = res.data.data
              cache.setStorage('login_auth', 1)
              cache.setStorage('user_info', res.data.data)          //存储用户信
            } else {

              reject(res)
              // cache.setStorage('login_auth', -1)
              // common.systemAlert(res.data.info + '，请重新登陆');
            }

          },
          fail: function (res) {
            reject(res)
            // cache.setStorage('login_auth', -1)
            // common.systemAlert(res.errMsg+'，请重新登陆');
          }
        })

      }
  
    })
  })
 

}

/*
* @:title:统一调用wx.showModal()
* @:param: title: 提示标题
*          content: 提示内容
*          showCancel: 是否显示取消按钮
*          trueFunction: 用户点击 回调函数         
*          falseFunction 用户取消 回调函数
*/
function getUserInfo(that) {
  var user_info = that.GO.user_info;
  if (user_info) {
    return user_info;
  } else {
    return storage('get', 'user_info');
  }
}

/*
* @:title:统一调用wx.showToast() 
* @:param: title: 提示文字
*          icon: 'success'或者'loading'
*          duration: 延迟时间,默认10000(最大)
*/
function showToast(title = '', icon = 'loading', duration = 60000, img) {
  if (img != null && img != '') {
    wx.showToast({
      title: title,
      mask: true,
      icon: icon,
      image: img,
      duration: duration
    })
  } else {
    wx.showToast({
      title: title,
      mask: true,
      icon: icon,
      duration: duration
    })
  }

}

/**
 * @title 判断用户是否登录
 * @param obj 不同的登录判断  shopping: '我的'  ,common: 其他各处
 * @return void
 */
function isLogin(obj) {
  var session_id = storage('get', 'user_info').session_id;
  var result = true;
  switch (obj) {
    case 'shopping':
      var store_id = storage('get', 'store_id');
      if (session_id == null || session_id == '' || typeof (session_id) == "undefined" || store_id == null || typeof (store_id) == "undefined") {
        result = false;
      }
      break;
    case 'common':
      if (session_id == null || session_id == '' || typeof (session_id) == "undefined") {
        result = false;
      }
      break;
  }
  return result;
}
/**
 * @title 字符串转年月日日期
 * @return date
 */
function stringToDate(str) {
  var temper = str;
  str = new Date(temper.replace(/-/, "/"))
  var d = new Date(str);
  str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  return str;
}



/**
 * @title: rpx 转换 px值
 * @params: rpx值
 * @return: px值 
 */

function rpxTopx(rpx) {
  var res = wx.getSystemInfoSync()
  var weight = res.windowWidth
  var transform = 750 / weight
  var transform = transform.toFixed()
  return (rpx * transform)
}

/**
 * 四舍五入函数
 * @param src 表示要转换的值
 * @param pos 保留几位小数
 * @return 转换处理之后的值
 */
function round(src, pos) {

  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);

}

/**
 * 手机绑定提示
 * @return void
 */
function checkSigninId() {
  var user_info = storage('get', 'user_info');
  var signin_id = user_info.signin_id;
  if (signin_id == '未绑定') {
    return false;
  } else {
    console.log('已绑定手机:' + signin_id);
  }
}
/**
 * 跳转手机绑定界面
 * @return void
 */
function goBindPhone() {
  return function () {
    wx.navigateTo({
      url: '/pages/person/bindPhone'
    })
  }
}

module.exports = {
  // SDK库
  common: common,
  net: net,
  media: media,
  file: file,
  cache: cache,
  location: location,
  driver: driver,
  open: open,
  ui: ui,
  login: login,
  showToast: showToast,
  isLogin: isLogin,
  getUserInfo: getUserInfo,
  round: round,
  stringToDate: stringToDate,
  checkSigninId: checkSigninId,
  goBindPhone: goBindPhone
}

//app.js
var util = require('utils/util.js')  //引用公共函数类库
var common = require('utils/common.js');
var config = require('utils/config.js');
// var aldstat = require("utils/ald-stat.js")
App({
  config: config.url,
  //全局可用变量
  GO: {
    app_id: config.app_id,
    mch_id: '',  /* 微信支付商户号 */
    scene: '',             /* 场景值 */
    api: config.url_address.api,                /* 当前使用api接口地址 */
    pay_api: config.url_address.pay_api,            /* 当前支付api接口地址 */
    img_path: config.url_address.img_path,        /* 当前使用图片地址 */
    user_info: [],           /* 鉴权成功返回的数据 */
    store_info: [],         /*当前店铺信息 */
    system_info: [],        /* 手机系统信息 */
    windowHeight: 0,         /* 当前设备的屏幕高 */
    windowWidth: 0,          /* 当前设备的屏幕宽 */
  },

  onLaunch: function (options) {
    let that = this
    /* 根据分支自动识别为正式或者是测试版本 */
    //动态获取ext.json配置信息
    // 获取第三方平台信息
    this.GO.app_id = wx.getExtConfigSync().extAppid;
    /*获取系统信息 包括手机型号 像素比*/
    var res = wx.getSystemInfoSync()
    this.GO.windowHeight = res.windowHeight;
    this.GO.windowWidth = res.windowWidth;
    this.GO.scene = options.scene;  //场景值
    this.GO.util = util
    this.getSystemInfo();
    this.login(this).then(this.loginSu, this.loginFail)
  },

  /*
  * @:title:获取手机系统信息
  * @:author: ghl guhongliang@e2862.com
  */
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.GO.system_info = res;
      }
    })
  },

  //登陆
  login(app) {
    var url = app.GO.api + "/service/passport/signin"
    let form_data = {}
    let session_id = util.cache.getStorage('user_info') != null ? util.cache.getStorage('user_info').sessionId : ''
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          console.log(res.code)
          form_data.clientCode = res.code
          wx.request({
            url: url,
            data: {
              appId: app.GO.app_id,
              formData: form_data,
              sessionId: session_id,
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.status == 'success') {
                resolve(res)
              } else {
                reject(res)
              }
            },
            fail: function (res) {
              reject(res)
            }
          })
        }
      })
    })

    // }
  },
  //登陆成功
  loginSu(res) {
    this.GO.user_info = res.data.data
    util.cache.setStorage('login_auth', 1)
    util.cache.setStorage('user_info', res.data.data)          //存储用户信
  },
  //登陆失败
  loginFail(res) {
    util.cache.setStorage('login_auth', -1)
    util.common.systemAlert(res.data.info);
  },
})
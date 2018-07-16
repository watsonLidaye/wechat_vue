
// 加载通用模组
var common = require('./common');
var cache = require('./cache');




function getUserInfo(callback) {
  common.sdkAuth('1.1.0');
  console.log(callback)
  // 模拟授权
  wx.authorize({
    scope: 'scope.userInfo',
    success: function (result) {
      console.log(result)
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        wx.login({
          success : function (result) {
            var _clientCode = result.code;
            wx.getUserInfo({
              withCredentials: true,
              success: function (result) {
                console.log(result)
                _resultCode = common.getResultCode(result.errMsg);
                if (_resultCode == 'ok' && typeof (callback) == 'function') {
                  console.log('执行成功，开始返回')
                  callback({
                    encryptedInfo : {
                      code: _clientCode,
                      ciphertext: result.encryptedData,
                      key: result.iv
                    },
                     userInfo: result.userInfo,
                     
                  })
        
                } else {
                  common.systemAlert('我已经蒙圈了，找不到回家的路了！');
                }
              }
            });
          }
        })
      }
    },
    fail: function (err) {
      // 用户拒绝授权会调起wx.openSetting
      common.openSetting('open.getUserInfo', callback)
    }
  })
}



/**
 * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
 * @param Function callback 自定义回调函数
 * @return Object 收货地址信息
 */
function chooseAddress(callback) {
  // 模拟授权
  wx.authorize({
    scope: 'scope.address',
    success: function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        wx.chooseAddress({
          success : function (result) {
            var _resultCode = common.getResultCode(result.errMsg);
            if (_resultCode == 'ok' && typeof (callback) == 'function') {
              callback(result);
            } else {
              common.systemAlert('我已经蒙圈了，找不到回家的路了！');
            }
          }
        });
      }
    },
    fail: function (err) {
      // 用户拒绝授权会调起wx.openSetting
      common.openSetting('open.chooseAddress', callback)
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  chooseAddress: chooseAddress,
}
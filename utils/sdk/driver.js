
// 加载通用模组
var common = require('./common');

/**
 * 获取网络类型。
 * @param Function callback 自定义回调函数
 * @return String 网络类型 2g/3g/4g/wifi
 */
function getNetworkType (callback) {
  wx.getNetworkType({
    success: function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        (result.networkType != 'none') ? callback(result.networkType) : common.systemAlert('网络连接已断开。');
      } else {
        common.systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail: function (error) {
      common.outError(error.errMsg);
    }
  });
}

/**
 * 监听网络状态变化。
 * @param Function callback 自定义回调函数
 * @return String 网络类型 2g/3g/4g/wifi
 */
function onNetworkStatusChange(callback) {
  common.sdkAuth('1.1.0');
  wx.onNetworkStatusChange(function(result) {
    if (typeof (callback) == 'function') {
      return (result.isConnected) ? callback(result.networkType) : common.systemAlert('网络连接已断开。');
    } else {
      common.systemAlert('我已经蒙圈了，找不到回家的路了！');
    }
  });
}

/**
 * 拨打电话
 * @param Number phoneNumber 电话号码
 * @return None
 */
function makePhoneCall(phoneNumber) {
  var _replaceRule = new RegExp('-', 'ig');
  var _phoneNumber = phoneNumber.replace(_replaceRule, '');
  wx.makePhoneCall({
    phoneNumber: phoneNumber,
    success : function (result) {
      common.outError(result.errMsg);
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  })
}

/**
 * 调起客户端扫码界面，扫码成功后返回对应的结果
 * @param Function callback 自定义回调函数
 * @return Object 所扫码的内容
 * content : 二维码/条码包含的信息
 * type : 所扫码的类型
 * path : 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
 */
function scanCode(callback) {
  wx.scanCode({
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          content : result.result,
          type: result.scanType,
          path: result.path,
        });
      } else {
        common.systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  })
}

module.exports = {
  getNetworkType: getNetworkType,
  onNetworkStatusChange: onNetworkStatusChange,
  makePhoneCall: makePhoneCall,
  scanCode: scanCode,
}
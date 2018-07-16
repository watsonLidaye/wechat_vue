
/**
 * SDK验证
 * @param String version 调用某API需要的最低SDK版本号，例如：1.2.0
 */
function sdkAuth(version) {
  var _requireVersion = version.split('.');
  var _systemInfo = wx.getSystemInfoSync();
  var _sdkVersion = _systemInfo.SDKVersion.split('.');
  if (parseInt(_sdkVersion[0]) == _requireVersion[0] && parseInt(_sdkVersion[1]) >= _requireVersion[1] && parseInt(_sdkVersion[2]) >= _requireVersion[2]) {
  } else {
    systemAlert('基础版本库需要 1.2.0 或更高版本');
  }
}

/**
 * 系统警告弹出框
 * @param String content 提示内容
 * @param String title 标题，默认：提示信息
 */
function systemAlert(content, title,color,doFunction) {
  wx.showModal({
    title: (title) ? title : '提示信息',
    content: content,
    confirmColor: color ? color:"#ef3939",
    showCancel: false,
    success(res){
      if (res.confirm) {
        doFunction ? doFunction : ''
      } else if (res.cancel) {
        // doFunction ? doFunction : ''
      }
     
    }
  });
}

/**
 * 获取原生API的errMsg的CODE
 * @param String message 原生API的result.errMsg内容
 */
function getResultCode(message) {
  return message.replace(/\w+:/g, '');
}


/**
 * API失败时统一处理的消息(UI)
 * @param String message 原生API的result.errMsg内容
 */
function outError(message) {
  console.log(message);
  var _resultCode = getResultCode(message);
  switch (_resultCode) {
    case 'ok' :
      break;
    case 'fail cancel' :
      break;
    case 'fail auth deny' :
      systemAlert('你拒绝了我，请把我删除。');
      break;
    case 'fail already invoke' :
      systemAlert('我不会告诉你任何信息的。');
      break;
    default : 
      systemAlert('你干了什么？居然还有这种操作');
      break;
  }
}

function openSetting(callClass, callback) {
  var _callClass = callClass.split('.');
  var _callSDK = _callClass[0];
  var _callMethod = _callClass[1];
  wx.openSetting({
    success: function (result) {
      var _resultCode = getResultCode(result.errMsg);
      if (_resultCode == 'ok') {
        var _sdk = require('./' + _callSDK);
        for (var _method in _sdk) {
          if (_method == _callMethod) {
            (callback) ? eval('_sdk.' + _method + '(callback)') : eval('_sdk.' + _method + '()');
            break;
          }
        }
      } else {
        systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail: function (error) {
      outError(error.errMsg);
    }
  })
}

module.exports = {
  sdkAuth: sdkAuth,
  systemAlert: systemAlert,
  getResultCode: getResultCode,
  outError: outError,
  openSetting: openSetting,
}
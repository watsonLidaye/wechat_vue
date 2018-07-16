
// 加载通用模组
var common = require('./common');

/**
 * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
 * @param Function callback 自定义回调函数
 * @return Object 坐标信息
 * longitude 经度
 * latitude 纬度
 */
function getLocation(callback) {
  wx.getLocation({
    type : 'gjc02',
    success: function(result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          longitude: result.longitude,
          latitude: result.latitude
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

/**
 * 打开地图选择位置
 * @param Function callback 自定义回调函数
 * @return Object 坐标信息
 * name 地址名称,
 * address 地址完整信息
 * longitude 经度
 * latitude 纬度
 */
function chooseLocation (callback) {
  wx.chooseLocation({
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          name : result.name,
          address : result.address,
          longitude: result.longitude,
          latitude: result.latitude
        });
      } else {
        common.systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  });
}

/**
 * 使用微信内置地图查看位置
 * @param Object location 地址信息
 * location.latitude 纬度坐标
 * location.longitude 经度坐标
 * location.name 内置地图显示的名称
 * location.address 内置地图显示的地址
 * @return None
 */
function openLocation (location) {
  wx.openLocation({
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
    scale: location.scale,
    address: location.address,
    success : function (result) {
      common.outError(result.errMsg);
    },
    fail: function (error) {
      common.outError(error.errMsg);
    }
  })
}

module.exports = {
  getLocation: getLocation,
  chooseLocation: chooseLocation,
  openLocation: openLocation,
}
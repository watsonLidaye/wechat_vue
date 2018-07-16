
// 加载通用模组
var common = require('./common');

/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 * @param String key 本地缓存中的指定的 key
 * @param Object/String 需要存储的内容
 * @return None
 */
function setStorage(key, data) {
  try {
    wx.setStorageSync(key, data);
  } catch (error) {
    common.systeAlert('写入缓存失败');
  }
}

/**
 * 从本地缓存中获取指定 key 对应的内容
 * @param String key 本地缓存中的指定的 key
 * @return Object/String 指定key的内容
 */
function getStorage(key) {
  try {
    var _storageValue = wx.getStorageSync(key);
    return (_storageValue) ? _storageValue : null;
  } catch (error) {
    return null;
  }
}

/**
 * 从本地缓存中同步移除指定 key 。
 * @param String key 本地缓存中的指定的 key
 * @return None
 */
function removeStorage(key) {
  try {
    wx.removeStorageSync(key);
  } catch (error) {
  }
}

/**
 * 清理本地数据缓存。
 * @param String key 本地缓存中的指定的 key
 * @return None
 */
function clearStorage() {
  try {
    wx.clearStorageSync();
  } catch (error) {
  }
}

module.exports = {
  setStorage: setStorage,
  getStorage: getStorage,
  removeStorage: removeStorage,
  clearStorage: clearStorage,
}
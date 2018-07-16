
// 加载通用模组
var common = require('./common');

/**
 * 从本地相册选择图片或使用相机拍照
 * @param Function callback 自定义回调函数
 * @return String 图片的本地文件路径
 */
function chooseImage(callback,length) {
  wx.chooseImage({
    count: length,
    sizeType: ['compressed'],
    sourceType: ['album','camera'],
    success: function(result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback(result.tempFilePaths);
      } else {
      
      }
    },
    fail : function () {
   
    }
  })
}

/**
 * 预览图片
 * @param String current 当前显示图片的链接，不填则默认为 urls 的第一张
 * @param Array urls 需要预览的图片链接列表
 * @param Function callback 自定义回调函数
 * @return None
 */
function previewImage(current, urls, callback) {
  wx.previewImage({
    current: current,
    urls: urls,
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
      } else {
        common.systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail : function () {
      common.systemAlert('地球太危险，我已经回火星了。');
    }
  })
}

/**
 * 获取图片信息
 * @param String path 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
 * @param Function callback 自定义回调函数
 * @return Object 图片信息
 * width 宽度
 * height 高度
 * path 图片的本地路径
 */
function getImageInfo(path, callback) {
  wx.getImageInfo({
    src: path,
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          width : result.width,
          height: result.height,
          path: result.path,
        });
      } else {
        common.systemAlert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail : function () {
      common.systemAlert('地球太危险，我已经回火星了。');
    }
  })
}

/**
 * 保存图片到系统相册，需要用户授权（scope.writePhotosAlbum）
 * @param String path 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
 * @return None
 */
function saveImageToPhotosAlbum(path) {
  common.sdkAuth('1.2.0');
  wx.authorize({
    scope: 'scope.writePhotosAlbum',
    success: function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok') {
        wx.saveImageToPhotosAlbum({
          filePath: path,
          fail : function (error) {
            common.outError(error.errMsg);
          }
        });
      }
    },
    fail: function (err) {
      // 用户拒绝授权会调起wx.openSetting
      common.openSetting('media.saveImageToPhotosAlbum');
    }
  });
}

/**
 * 开始录音。当主动调用wx.stopRecord，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
 * @param Function callback 自定义回调函数
 * @return String 录音文件的临时路径
 */
function startRecord(callback) {
  wx.startRecord({
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback(result.tempFilePath);
      } else {
        common.systemAlert('地球太危险，我已经回火星了。');
      }
    },
    fail: function (error) {
      common.outError(error.errMsg);
    }
  })
}

/**
 * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
 * @param String path 需要播放的语音文件的文件路径
 * @return None
 */
function playVoice (path) {
  wx.playVoice({
    filePath : path,
    fail : function () {
      common.systemAlert('音频文件播放失败');
    }
  })
}

/**
 * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
 * @param Function callback 自定义回调函数
 * @return Object 视频信息
 * path 选定视频的临时文件路径
 * duration 选定视频的时间长度
 * size 选定视频的数据量大小
 * width 返回选定视频的宽
 * height 返回选定视频的长
 */
function chooseVideo (callback) {
  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    maxDuration : 60,
    camera : 'back',
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          path : result.tempFilePath,
          duration: result.duration,
          size: result.size,
          width : result.width,
          height: result.height
        });
      } else {
        common.systemAlert('地球太危险，我已经回火星了。');
      }
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  })
}

/**
 * 保存视频到系统相册，需要用户授权（scope.writePhotosAlbum）
 * @param String path 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
 * @return None
 */
function saveVideoToPhotosAlbum(path) {
  common.sdkAuth('1.2.0');
  wx.authorize({
    scope: 'scope.writePhotosAlbum',
    success: function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok') {
        wx.saveVideoToPhotosAlbum({
          filePath: path,
          fail: function (error) {
            common.outError(error.errMsg);
          }
        });
      }
    },
    fail: function (err) {
      // 用户拒绝授权会调起wx.openSetting
      common.openSetting('media.saveVideoToPhotosAlbum');
    }
  });
}


module.exports = {
  chooseImage: chooseImage,
  previewImage: previewImage,
  getImageInfo: getImageInfo,
  saveImageToPhotosAlbum: saveImageToPhotosAlbum,
  startRecord: startRecord,
  playVoice: playVoice,
  chooseVideo: chooseVideo,
  saveVideoToPhotosAlbum: saveVideoToPhotosAlbum,
}

// 加载通用模组
var common = require('./common');

/**
 * 保存文件到本地。
 * @param String path 需要保存的文件的临时路径
 * @param Function callback 自定义回调函数
 * @return String 文件的保存路径
 */
function saveFile(path, callback) {
  wx.saveFile({
    tempFilePath: path,
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback(result.savedFilePath);
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
 * 获取文件信息。
 * @param String path 本地文件路径
 * @param Function callback 自定义回调函数
 * @return Object 文件信息
 * size 文件尺寸(字节)
 * digest 文件再要(文件sha1值)
 */
function getFileInfo(path, callback) {
  common.sdkAuth('1.4.0');
  wx.getFileInfo({
    filePath: path,
    digestAlgorithm : sha1,
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          size : result.size,
          digest: result.digest
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
 * 获取本地已保存的文件列表
 * @param Function callback 自定义回调函数
 * @return ObjectArray 文件列表
 */
function getSavedFileList (callback) {
  wx.getSavedFileList({
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback(result.fileList);
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
 * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件
 * @param String path 文件路径
 * @param Function callback 自定义回调函数
 * @return Object 文件信息
 * size 文件尺寸(字节)
 * createTime 文件的保存是的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
 */
function getSavedFileInfo (path, callback) {
  wx.getSavedFileInfo({
    filePath : path,
    success : function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && typeof (callback) == 'function') {
        callback({
          size : result.size,
          createTime: result.createTime
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
 * 删除本地存储的文件
 * @param String path 需要删除的文件路径
 * @return None
 */
function removeSavedFile(path) {
  wx.removeSavedFile({
    filePath : path,
    success : function (result) {
      common.outError(result.errMsg);
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  });
}

/**
 * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
 * @param String path 文件路径，可通过 downFile 获得
 * @return None;
 */
function openDocument(path) {
  common.sdkAuth('1.4.0');
  wx.openDocument({
    filePath : path,
    fileType: 'doc,xls,ppt,pdf,docx,xlsx,pptx',
    success : function (result) {
      common.outError(result.errMsg);
    },
    fail : function (error) {
      common.outError(error.errMsg);
    }
  });
}

module.exports = {
  saveFile: saveFile,
  getFileInfo: getFileInfo,
  getSavedFileList: getSavedFileList,
  getSavedFileInfo: getSavedFileInfo,
  removeSavedFile: removeSavedFile,
  openDocument: openDocument,
}
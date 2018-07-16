
// 加载通用模组
var common = require('./common');
var cache = require('./cache');
var config = require('../config');
/**
 * 发起一个异步请求
 * @param String url 开发者服务器接口地址
 * @param Object data 请求的参数
 * @param Function callback 自定义回调函数
 * @param String method 请求方法，默认POST
 * @return Object 开发者服务器接口返回的数据
 */
function request(obj) {
  var options = {
    url: obj.url,
    data: obj.data,
    method: (obj.method) ? method.toUpperCase() : 'POST',
    success: function (result) {
      obj.callback(result.data);
    },
    fail: function (result) {
      obj.failback(result)
    }
  }
  wx.request(options);
}
/**
 * 发起一个promis异步请求
 * @param String url 开发者服务器接口地址
 * @param Object data 请求的参数
 * @param Function callback 自定义回调函数
 * @param String method 请求方法，默认POST
 * @return Object 开发者服务器接口返回的数据
 */
function requestPromise(obj) {
   return new Promise(function(resolve,reject){
     var options = {
       url: obj.url,
       data: obj.data,
       method: (obj.method) ? method.toUpperCase() : 'POST',
       success: function (result) {
         console.log(result)
         if (result.data.status=='success'){
           resolve(result.data);
         }else{
           console.log(result)
           reject(result.data.info);
         }
        
       },
       fail: function (result) {
         console.log(result)
         reject(result.data.info);
       }
     }
     wx.request(options);
   })

}
/**
 * 将本地资源上传到开发者服务器
 * @param String url 开发者服务器接口地址
 * @param String resource_file 要上传的资源文件，通过chooseImage/downloadFile/getImageInfo获得
 * @param String resource_key 资源标识，必须与form_data.resource_key保持一致
 * @param Object form_data 表单数据
 * 格式：{
 *  "app_id" : "小程序APPID",
 *  "resource_key" : "此处信息与resource_key参数保持一致",
 *  "respurce_path" : "云存储的URI第一级目录，例如myPath",
 * }
 * @param Function callback 自定义回调函数
 */
function uploadFile(url, resource_file, resource_key, form_data, callback, failback) {
  var options = {
    url: url,
    filePath: resource_file,
    name: resource_key,
    formData: form_data,
    success: function (result) {
      var _result = JSON.parse(result.data);
      console.log(_result)
      if (_result.status == 'success') {
        callback(_result.data);
      } else {
        common.systemAlert("图片上传失败了,请重新上传");
      }
    },
    fail: function (result) {
      var _result = JSON.parse(result.data);
      failback(_result.data)
    }
  }
  wx.uploadFile(options);
}
/**
 * 将本地资源上传到开发者服务器promise方法
 * @param String url 开发者服务器接口地址
 * @param String resource_file 要上传的资源文件，通过chooseImage/downloadFile/getImageInfo获得
 * @param String resource_key 资源标识，必须与form_data.resource_key保持一致
 * @param Object form_data 表单数据
 * 格式：{
 *  "app_id" : "小程序APPID",
 *  "resource_key" : "此处信息与resource_key参数保持一致",
 *  "respurce_path" : "云存储的URI第一级目录，例如myPath",
 * }
 * @param Function callback 自定义回调函数
 */
function uploadFilePromise(url, resource_file, resource_key, form_data) {
  return new Promise(function(resolve,reject){
    var options = {
      url: url,
      filePath: resource_file,
      name: resource_key,
      formData: form_data,
      success: function (result) {
        var _result = JSON.parse(result.data);
        console.log(_result)
        if (_result.status == 'success') {
          resolve(_result.data);
        } else {
          var _result = JSON.parse(result.data);
          common.systemAlert("图片上传失败了,请重新上传");
          reject(_result.data)
        }
      },
      fail: function (result) {
        var _result = JSON.parse(result.data);
        common.systemAlert("图片上传失败了,请重新上传");
        reject(_result.data)
      }
    }
    wx.uploadFile(options);
  })

}
/**
 * 下载文件资源到本地
 * @param String url 资源网络地址
 * @param Function callback 自定义回调函数
 * @return String 下载后的文件路径
 */
function downloadFile(url, callback) {
  var options = {
    url: url,
    success: function (result) {
      var _resultCode = common.getResultCode(result.errMsg);
      if (_resultCode == 'ok' && result.statusCode == 200 && typeof (callback) == 'function') {
        callback(result.tempFilePath);
      } else {
        alert('我已经蒙圈了，找不到回家的路了！');
      }
    },
    fail: function () {
      alert('地球太危险，我已经回火星了。');
    }
  }
  wx.downloadFile(options);
}


/**
 * 支付接口
 * author lipeifeng@e2862.com
 * @param obj obj位完成支付需要的参数 （必传）
 * @param complateFunction 为不论执行成功还是失败的执行函数（可选）
 */
function paymentOp(obj,complateFunction){
  return new Promise(function(resolve, reject){
    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.package,
      paySign: obj.paySign,
      success(res) {
        resolve(res)
      }, fail(res) {
        reject(res)
      }, complete() {
        typeof (complateFunction) == "function" && complateFunction()
      }
    })
  })

}





module.exports = {
  request: request,
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  requestPromise: requestPromise,
  uploadFilePromise: uploadFilePromise,
  payment: paymentOp
}
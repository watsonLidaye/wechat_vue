// page/index/index/index.js
///index.js
//获取应用实例
var app = getApp();
import config from '../../../utils/config.js'
var utill = require('../../../utils/util.js')

Page(Object.assign({}, utill,{
  data: {
    show_hide: 0
  },
  //页面初始化
  onLoad: function (options) {
    console.log(this)
    var worker = wx.createWorker('workers/index.js') // 文件名指定 worker 的入口文件路径，绝对路径
    worker.postMessage({
      msg: 'hello worker'
    })
    worker.terminate
    var od = {
      a: 1
    }
    var od2 = {
      a: 2
    }
    var arr = new utill.ObjectCpm(od, od2, this)
    arr.resultOp(0)
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {

  },//重载
  refresh() {
    this.setData({ show_hide: 1 })
  },
  cheange() {
    this.setData({ show_hide: 2 })
  }
  }
  ))


var common = require('common');
var app_id = "";

var serive = {
};
//小程序版本号
var version = "";

//路径
var path = [

]


var url = {
  master: {  /* 正式环境配置 */
    api: '',
    pay: '',
    img_path: ""
  },
  debug: {   /* 测试环境配置 */
    api: '',
    pay: '',
    img_path: ""
  },
}
var url_address = (function () {
  let url_config = {}
  if (common.defaultBranch() == 'master') {

    url_config.api = url.master.api;
    url_config.pay_api = url.master.pay;
    url_config.img_path = url.master.img_path;
  } else {
    url_config.api = url.debug.api;
    url_config.pay_api = url.debug.pay;
    url_config.img_path = url.debug.img_path;
  }
  return url_config
})()


module.exports = {
  serive,
  version,
  path,
  url_address
}
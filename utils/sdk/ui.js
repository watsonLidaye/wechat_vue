
// 加载通用模组
var common = require('./common');
/**
 * 设置导航主题
 * @param String fontColor 前景色
 * @param String backgroundColor 背景色
 * @param Number duration 延迟(ms)
 * @param String timingFunc 动画变化方式
 */
function setNaviTheme(fontColor, backgroundColor, duration, timingFunc) {
  wx.setNavigationBarColor({
    frontColor: fontColor,
    backgroundColor: backgroundColor,
    animation: {
      duration: (duration) ? parseInt(duration) : 0,
      timingFunc: (timingFunc) ? timingFunc : 'linear',
    }
  })
}



module.exports = {
  setNaviTheme: setNaviTheme
}
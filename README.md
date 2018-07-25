# wechat_vue
微信小程序开发项目初始化




。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

文件路劲介绍及其作用



--Component              //自定义组件可以写在这里 
 
 --loadding
    
	...

--model
  
	active.wxss          //自定义通用wxss可以写在这里
  
	empty.wxml            //通用空内容template
  
	logo.wxml             //通用小程序logo template

--page                  //页面写在这里
  
	discovey              //分包加载文件夹，这个是我自己预设的，也可以删除掉，根据自己需求编译
  
tabbar                //分包主包位置

--utils                 
  
	--sdk                 //封装了部分sdk库
    
	...
    
	common.js           //用于服务器切换
    
	config.js           //用于编译统一的配置信息
    
	util.js             //工具口统一出口
 
--workers        //多线程文件夹
app.js
 
app.json
 
app.wxss
 
ext.json               第三方授权需要使用的平台
 
project.config.json
 
 
 
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
 

如何使用，使用微信开发者工具或者支持开发微信小程序的开发工具，使用自己的appid打开项目，即可使用






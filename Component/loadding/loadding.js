// Component/loadding/loadding.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        show_type:{
          type:String,
          value:0         //只接受状态值0,1,2, 0为加载中 ，1为显示正常， 2为显示异常
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadding_height:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
   
    this.setData({ loadding_height: app.GO.windowHeight})
  },
  methods:{
    refresh(){
      this.triggerEvent('refreshLoading', {}) 
    }
  }
})

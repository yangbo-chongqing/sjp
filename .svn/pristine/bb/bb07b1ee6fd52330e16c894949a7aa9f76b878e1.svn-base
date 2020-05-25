// component/top/top.js
const app = getApp(),
  $ = require("../../utils/util.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mytop: {
      type: Object, //类型
      value: 'default value' //默认值
    },
    background: {
      type: String,
      value: "#fff"
    },
    showBack:{
      type:String,
      value:false
    },
    color: {
      type: String,
      value: "black"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    Top: app.globalData.Top,
    

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback() {
      wx.navigateBack({});
    },
    
    

  },
  ready() {
    // console.log(this.properties.mytop)

  },

})
// subPages/gridorganizationdetails/gridorganizationdetails.js
import {
  get
} from "../../assets/js/request"

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    space:"",
    households:"",
    number:"",
    party:"", 
    telList:[],
    organization:''
  },

  // 获取网格组织详情
  getGird() {
    const that = this;
    for (var i = 0; i < that.data.telList.length; i++) {
      let organization = that.data.telList[i].telName
    }
    let data = {
      gridId:that.data.id
    }
    get({
      link: '/grid/info',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          title: msg.data.gridName,
          space: msg.data.gridArea,
          households: msg.data.houseCount,
          number: msg.data.popCount,
          party: msg.data.gridPersonCount,
          telList: msg.data.gridPersons,
          organization: msg.data.gridName
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  handlePhone(e){
    console.log(e)
      var phone = e.currentTarget.dataset.ph;
      //调打手机
      wx.makePhoneCall({
          phoneNumber: phone //仅为示例，并非真实的电话号码
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    //接收id
    this.setData({
      id: options.id,
      ids: options.ids,
    })
    //修改页面标题
    wx.setNavigationBarTitle({
      title:'网格组织详情'
    })
    this.getGird()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
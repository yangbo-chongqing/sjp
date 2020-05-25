// subPages/scorelog/scorelog.js
import {
  get
} from "../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    isActive: 0,
    allscore: [], //全部活动积分
  },
  changeSwiper(e) {
    console.log(e, 111)
    let current = e.currentTarget.dataset.current
    this.setData({
      current: e.currentTarget.dataset.current,
      isActive: 0
    });
    if (current==0){
      this.getscorelist("/integralOrder/inAndOutList", {
        
      })
    }else{
      this.getscorelist("/integralChangeMoney/inAndOutList", {
        
      })
    }

  },
  getscorelist(link, data) {
    get({
      link: link,
      data:data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          allscore: res.data.list

        })
      }
    })
  },

  // 活动积分
  changeActive(e) {
    console.log(e)
    let id = e.currentTarget.dataset.isactive
    this.setData({
      isActive: e.currentTarget.dataset.isactive,
    });
    if(id==0){
      let link = "/integralOrder/inAndOutList"
      let data = {
        
      }
      this.getscorelist(link, data);
    }else if(id==1){
      let link = "/integralOrder/inAndOutList"
      let data = {
        type:1
      }
      this.getscorelist(link, data);
    }else{
      let link = "/integralOrder/inAndOutList"
      let data = {
        type: 2
      }
      this.getscorelist(link, data);
    }
    

  },

  // 兑换积分
  changeActive1(e) {
    console.log(e)
    let id = e.currentTarget.dataset.isactive
    this.setData({
      isActive: e.currentTarget.dataset.isactive,
    });
    if(id==0){
      let link = "/integralChangeMoney/inAndOutList"
      let data = {
        
      }
      this.getscorelist(link, data);
    }else if(id==1){
      let link = "/integralChangeMoney/inAndOutList"
      let data = {
        type:1
      }
      this.getscorelist(link, data);
    }else{
      let link = "/integralChangeMoney/inAndOutList"
      let data = {
        type: 2
      }
      this.getscorelist(link, data);
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getscorelist("/integralOrder/inAndOutList", {})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = wx.getStorageSync("userInfo")
    this.setData({
      ablePerson:userInfo.ablePerson,    //能人 
      market: userInfo.market,    //超市
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
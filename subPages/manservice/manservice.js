// subPages/manservice/manservice.js
import {
  get,
  post
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    manlist: [],
    showStart: false,
    id: ''

  },
  //获取我的能人服务列表
  getmylist() {
    get({
      link: '/housekeeperProjectNeed/list',
      data: {
        getByMe: 1
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          manlist: res.data.list
        })
      }
    })
  },
  //联系能人

  makePhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  //点击评价
  showStar(e) {
    this.setData({
      showStart: true,
      id: e.currentTarget.dataset.id
    })
  },

  //点击每颗星星

  every(e) {
    console.log(e)
    this.setData({
      num: e.currentTarget.dataset.num + 1
    })
    console.log(this.data.num)
  },
  //评价
  addscore() {
    post({
      link: '/housekeeperProjectNeed/score',
      data: {
        needId: this.data.id,
        score: this.data.num
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.getmylist()
        wx.showToast({
          title: "评价成功！",
          icon: "success",
          duration: 1500
        })
        setTimeout(() => {
          this.setData({
            showStart: false,
          })
        }, 1500)
      }
    })
  },
  //提交评价
  submit() {

    this.addscore()
  },

  //取消订单

  cancle(e) {
    post({
      link: '/housekeeperProjectNeed/cancel',
      data: {
        needId: e.currentTarget.dataset.id
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '取消成功',
          icon: "none"
        })
        this.getmylist()
      }
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
  onLoad: function(options) {
    this.getmylist()
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
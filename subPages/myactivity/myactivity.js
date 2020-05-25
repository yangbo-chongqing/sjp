// subPages/myactivity/myactivity.js
import {
  get
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    list: []
  },
  changeSwiper(e) {
    let num = e.currentTarget.dataset.current
    this.setData({
      current: num,
    })
    if (num == 0) {
      this.getmyactivity(1)
    } else if (num == 1) {
      this.getmyactivity(2)

    } else {
      this.getmyactivity(3)

    }
  },
  getmyactivity(type) {
    let data = {
      getJoinActByMe: 1,
      getType: type,
      newsType: 4
    }
    get({
      link: "/information/listActivity",
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let list = res.data.list
        for (var i = 0; i < list.length; i++) {
          if (list[i].newsId === null) {
            list.splice(i, 1)
            
          }else{
            let value = new Date(list[i].startTime.replace(/-/g, '/')) - new Date();
            let day = Math.round(value / 1000 / 60 / 60 / 24);
            console.log(day, value)
            let isSign = value > 0 ? day : false;
            list[i].isSign = isSign;
            list[i].residueday = day;
          }

          


        }
        console.log(list)
        this.setData({
          list: list
        })
      }
    })
  },
  //单条志愿者活动详情
  godetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '/subPages/moreVolunteerActivity/volunteerdetail/volunteerdetail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getmyactivity(1)

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
// subPages/moreVolunteerActivity/moreVolunteerActivity.js
import {
  get
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    pageSize:5,
    pageNum:1,
    viewlist:[],//志愿风采列表
  },
  changeSwiper(e) {
    this.setData({
      current: e.currentTarget.dataset.current,
    });

  },
  //获取活动预告--未开始
  getaclist() {
    var t = this
    let data = {
      pageSize: t.data.pageSize,
      pageNum: t.data.pageNum,
      newsType: 4,
      getType: 1
    }
    get({
      link: '/information/listActivity',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let list = msg.data.list
        for (let i = 0; i < list.length; i++) {
          let value = new Date(list[i].startTime.replace(/-/g, '/')) - new Date();
          let values = new Date(list[i].endTime.replace(/-/g, '/')) - new Date();
          let day = Math.round(value / 1000 / 60 / 60 / 24);
          let isSign = value > 0 ? day : false;
          let isActive = values > 0 ? true : false;
          let isEnd = values < 0 ? true : false;
          list[i].isSign = isSign;
          list[i].residueday = day;
          list[i].isActive = isActive;
          list[i].isEnd = isEnd;
        }  

        t.setData({
          acList: list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取活动预告--进行中
  getaclist1() {
    var t = this
    let data = {
      pageSize: t.data.pageSize,
      pageNum: t.data.pageNum,
      newsType: 4,
      getType: 2
    }
    get({
      link: '/information/listActivity',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let list = msg.data.list
        for (let i = 0; i < list.length; i++) {
          let value = new Date(list[i].startTime.replace(/-/g, '/')) - new Date();
          let values = new Date(list[i].endTime.replace(/-/g, '/')) - new Date();
          let day = Math.round(value / 1000 / 60 / 60 / 24);
          let isSign = value > 0 ? day : false;
          let isActive = values > 0 ? true : false;
          let isEnd = values < 0 ? true : false;
          list[i].isSign = isSign;
          list[i].residueday = day;
          list[i].isActive = isActive;
          list[i].isEnd = isEnd;
        }

        t.setData({
          acListTwo: list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取活动预告--已结束
  getaclist2() {
    var t = this
    let data = {
      pageSize: t.data.pageSize,
      pageNum: t.data.pageNum,
      newsType: 4,
      getType: 3
    }
    get({
      link: '/information/listActivity',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let list = msg.data.list
        for (let i = 0; i < list.length; i++) {
          let value = new Date(list[i].startTime.replace(/-/g, '/')) - new Date();
          let values = new Date(list[i].endTime.replace(/-/g, '/')) - new Date();
          let day = Math.round(value / 1000 / 60 / 60 / 24);
          let isSign = value > 0 ? day : false;
          let isActive = values > 0 ? true : false;
          let isEnd = values < 0 ? true : false;
          list[i].isSign = isSign;
          list[i].residueday = day;
          list[i].isActive = isActive;
          list[i].isEnd = isEnd;
        }

        t.setData({
          acListThree: list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取志愿风采
  getacview() {
    var t = this
    let data = {
      pageSize: t.data.pageSize,
      pageNum: t.data.pageNum,
      newsType: 6,
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        t.setData({
          viewlist: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //单条志愿者活动详情
  godetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/subPages/moreVolunteerActivity/volunteerdetail/volunteerdetail?id=' + e.detail.currentTarget.dataset.id,
    })
  },
  //单条志愿风采详情
  goview(e) {
    console.log(e)
    wx.navigateTo({
      url: '/subPages/moreVolunteerActivity/viewdetail/viewdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getaclist()
    this.getaclist1()
    this.getaclist2()
    this.getacview()
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
// pages/hongyan/hongyan.js
import { get } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[
      { img: "https://webservers.sjpdqfwzx.com/file/icon/Group 195.png", title: "党建要闻", bannerUrl:"/subPages/yaowen/yaowen"},
      { img: "https://webservers.sjpdqfwzx.com/file/icon/Group 196.png", title: "党建相册", bannerUrl: "/subPages/dangPhoto/dangPhoto" },
      { img: "https://webservers.sjpdqfwzx.com/file/icon/Group 197.png", title: "党内公示", bannerUrl: "/subPages/formula/formula" },
      { img: "https://webservers.sjpdqfwzx.com/file/icon/Group 198.png", title: "党员风采", bannerUrl: "/subPages/demeanor/demeanor" }
    ],
    list:[],
    listXian:[],
    num:"",
    list2:[]   //不是党员
  },

  goDetails(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 获取列表
  getList() {
    const that = this;
    let data = {
      memberIntegralType:1
    }
    get({
      link: '/partyMemberIntegralRule/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取列表
  getListXian() {
    const that = this;
    let data = {
      memberIntegralType:2
    }
    get({
      link: '/partyMemberIntegralRule/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          listXian: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取积分统计
  getNum() {
    const that = this;
    let data = {
      
    }
    get({
      link: '/funCodeIntegral/getTotalByMe',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          num: msg.data.thisYearTotal
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取l类型
  getGrade() {
    const that = this;
    let data = {
      dictType:'member_integral_type'
    }
    get({
      link: '/baseDict/get',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  //跳转风采详情
  // godetail(e) {
  //   let { title, newsId } = getDataValue(e).item
  //   let url = "/subPages/demeanorDetails/demeanorDetails?title=" + title + "&id=" + newsId;
  //   wx.navigateTo({
  //     url
  //   })
  // },

  // 获取列表
  getList2() {
    const that = this;
    let data = {
      newsType:7,
      pageNum: 1,
      pageSize: 3,
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list2: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  goNews(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.titl
    wx.navigateTo({
      url: "/subPages/demeanorDetails/demeanorDetails?title=" + title + "&id=" + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.getList()
    this.getNum()
    this.getGrade()
    this.getListXian()
    this.getList2()
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
    let userInfo = wx.getStorageSync("userInfo")
    this.setData({
      partyMember:userInfo.partyMember,    //党员
    })
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
// pages/integral/integral.js
import {
  get
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acList:[],//志愿者活动一条
    studyList:[],//学习初心不改列表
    comList:[],//活动预告列表
    pageSize:5,
    pageNum:1
  },
  //查看更多
  goMore(e){
    // console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //单条志愿者活动详情
  godetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/subPages/moreVolunteerActivity/volunteerdetail/volunteerdetail?id='+e.detail.currentTarget.dataset.id,
    })
  },
  //获取志愿者活动一条
  getnews() {
    var t = this
    let data = {
      pageSize: 1,
      pageNum: 1,
      newsType: 4,
      getType: 1
    }
    get({
      link: '/information/listActivity',
      data: data
    }).then(msg => {
      if (msg.code == 200) {
        console.log(msg)
        let list = msg.data.list
        if(list[0].newsId===null){
          list=[]
        }
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
  //学习初心不改数据列表
  getstudy(){
    var t = this
    let data = {
      pageSize: t.data.pageSize,
      pageNum: t.data.pageNum,
      newsType: 12,

    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let list = msg.data.list
        t.setData({
          studyList: list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //获取活动预告
  getTeaser() {
    var t = this
    let data = {
      pageSize: 1,
      pageNum: 1,
      newsType: 22
    }

    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        t.setData({
          comList: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //初心不改详情跳转
  // gostudydetail(e){
  //   console.log(e)
  //   let newsId=e.detail
  //   wx.navigateTo({
  //     url: '/subPages/studydetails/studydetails?id='+newsId,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnews()
    this.getstudy()
    this.getTeaser()
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
    this.getnews()
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
      this.setData({
        acList:[],//志愿者活动一条
          studyList:[],//学习初心不改列表
          comList:[],//活动预告列表
          pageSize:5,
          pageNum:1
      })
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
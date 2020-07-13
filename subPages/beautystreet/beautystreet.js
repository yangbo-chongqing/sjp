// subPages/beautystreet/beautystreet.js
import {
  get,
  post
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    id: 36 ||'' ,
    navlist: []
  },
  switchTap(e) { //更换地区
    // let screenWidth = wx.getSystemInfoSync().windowWidth;
    // let itemWidth = screenWidth / 3;


    let {
      index,
      id
    } = e.currentTarget.dataset;
    // const {
    //   navlist
    // } = this.data;
    // let scrollX = itemWidth * index - itemWidth * 2;
    // let maxScrollX = (navlist.length + 1) * itemWidth;

    // if (scrollX < 0) {
    //   scrollX = 0;
    // } else if (scrollX >= maxScrollX) {
    //   scrollX = maxScrollX;
    // }


    this.setData({
      // x: scrollX,
      id: e.currentTarget.dataset.id
    })
    this.getlist(this.data.id)

    // e = getSubDataValue(e);
    // let flag = e.index;
    // console.log(flag);
    // this.setData({
    //   flag: flag,
    //   nowDeptId: this.data.navlist[flag].deptId
    // })
    // this.getDetails();
  },
  gopic(e) {
    console.log(e)
    let type=e.currentTarget.dataset.type
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: e.currentTarget.dataset.url+"?id="+type+"&deptid="+this.data.id+"&title="+title,
    })
  },
  getplace(id) {
    get({
      link: "/system/sysDept/getByParentId",
      data: {
        deptId: 35
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          navlist: res.data,
          id: res.data[0].deptId
        })
        this.getlist(this.data.id);
      }
    })
  },
  // gettype() {
  //   get({
  //     link: "/baseDict/get",
  //     data: {
  //       dictType: 'photo_type'
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if (res.code == 200) {

  //     }
  //   })
  // },
  getlist(id) {
    console.log(id)
    get({
      link: "/photoStreet/getList",
      data: {  
        deptId: id
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          list:res.data.list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getplace()
    // this.gettype()
    this.getlist(this.data.id)
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
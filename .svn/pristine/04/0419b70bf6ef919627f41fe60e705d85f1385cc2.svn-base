// subPages/social/social.js
import { get } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [],//社工组织列表
    index: 0,
    id: 0,
    orgId: null,
    content: {
      type: String,
      value: ''
    },
    socList: []
  },
  bindPickerChange(e) {
   
    let index = parseInt(e.detail.value);
    this.setData({
      index: index,
      orgId: this.data.objectArray[index].orgId
    })
    this.getOne()
    this.getProlist()
  },

  // 获取社工组织列表
  getList(e) {
    const that = this;
    let data = {}
    get({
      link: '/social/getOrganizationList',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        var objectArray = msg.data.list;
        var newArray = objectArray.map(item => {　　　　// 此方法名称区分到一个新数组中
          return { orgName: item.orgName, orgId: item.orgId };
          item.orgId;
        });
        console.log(newArray)
        that.setData({
          objectArray: newArray,
          orgId: newArray[0].orgId
        });
        this.getOne()
        this.getProlist()
      }

    }).catch(error => {
      console.log(error)
    })
  },

  // 获取社工组织介绍
  getOne(id) {
    const that = this;
    let data = {
      orgId: that.data.orgId
    }
    get({
      link: '/social/getOrganizationOne',
      data: data
    }).then(msg => {
      //console.log(msg)
      if (msg.code == 200) {
        const content = msg.data.orgDescription.replace(/\<img/gi, '<img style="width:100%;" ');
        that.setData({
          content: content
        });
      }

    }).catch(error => {
      console.log(error)
    })
  },

  // 获取社工服务列表
  getProlist(id) {
    const that = this;
    let data = {
      orgId: that.data.orgId
    }
    get({
      link: '/social/getProList',
      data: data
    }).then(msg => {
      //console.log(msg)
      if (msg.code == 200) {
        that.setData({
          socList: msg.data.list,
        });
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //跳转社工服务详情
  goDetails(e) {
    let id = getDataValue(e).item.social_pro_id;
    // let title = getDataValue(e).item.areaName;
    let url = "/subPages/detailsTwo/detailsTwo?id=" + id;
    wx.navigateTo({
      url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '社工参与促和',
    })
    this.getList()
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
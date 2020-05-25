// subPages/serviceHall/Community/Community.js
import { getSubDataValue } from "../../../assets/js/public";
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarList: [],
    flag: 0,
    deptId: 35,
    nowDeptId: '',//当前选中id
    details: {},//详情
  },
  //切换样式和获取对应的简介信息
  toggleMsg(e) {
    e = getSubDataValue(e);
    let flag = e.index;
    console.log(flag);
    this.setData({
      flag: flag,
      nowDeptId: this.data.navbarList[flag].deptId
    })
    this.getDetails();
  },
  //获取社区列表
  communityList() {
    const that = this;
    let data = {
      deptId: that.data.deptId
    }
    get({
      link: '/system/sysDept/getByParentId',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          navbarList: res.data,
          nowDeptId: res.data[0].deptId
        })
        this.getDetails();
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //获取社区详情
  getDetails() {
    let data = {
      deptId: this.data.nowDeptId
    }
    get({
      link: '/system/sysDept/getByDeptId',
      data: data
    }).then(res => {
      if (res.code == 200) {
        res.data.content = res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:100%;display:block;margin:0 auto;" ');
        this.setData({
          details: res.data
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
    this.communityList()
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
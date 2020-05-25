// subPages/serviceHall/Alarm/Alarm.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:10, //每页大小
    pageNum:0, //每页数量
    policeId:'', //id
    policeName:'', //警员名字
    policePhone:'', //手机号码
    telephoneList:[], //列表
    flag: 0,//报警电话显示
    isBottom: false, //是否到底 
    total: 0 //总页数
  },

  //获取电话列表
  goTelephone() {
    let data = {
      pageNum: this.data.pageNum + 1,
      pageSize: this.data.pageSize,
      addParma:true
    }
    if (!this.data.isBottom){
      get({
        link: '/alarmPhone/getPoliceList',
        data: data
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          let newArr = [...this.data.telephoneList, ...res.data.list]
          this.setData({
            telephoneList: newArr,
            total: res.data.total,
            pageNum: this.data.pageNum + 1
          })
        }
        if (this.data.telephoneList.length >= this.data.total) {
          this.setData({
            isBottom: true
          })
        }
      })
    }
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
    this.goTelephone()
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
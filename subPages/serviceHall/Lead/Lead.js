// subPages/serviceHall/Lead/Lead.js
import { getSubDataValue } from "../../../assets/js/public";
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false, //模态框是非显示
    personList:[] ,//人物列表
    person:{},//弹框中的人物信息
    pageNum: 0,//当前页
    pageSize:30,//页大小
    flag:0,//领导班子显示
    leadId:'',
    isBottom:false, //是否到底 
    total:0 //总页数
  },
  
  //获取领导班子列表
  toLeadership(){
    let data={
      pageNum: this.data.pageNum+1,
      pageSize: this.data.pageSize
    }
    if (this.data.isBottom){
      wx.showToast({
        title: '没有更多了',
        icon:'none'
      })
    }else{
      get({
        link: '/lead/info/getList',
        data: data
      }).then(res => {
        console.log(res)
        if (res.code == 0) {
          let newArr = [...this.data.personList, ...res.data.list]
          this.setData({
            personList: newArr,
            total: res.data.total,
            pageNum: this.data.pageNum + 1
          })
          if (this.data.personList.length >= this.data.total){
            this.setData({
              isBottom:true
            })
          }
        }
      })
    }
  },

  //切换弹框
  toggleModal(e) {
    let { isShow, personList, person } = this.data;
    isShow = !isShow;
    if (getSubDataValue(e).index >= 0) {
      e = getSubDataValue(e).index;
      personList = personList.filter((item, index) => {
        return e === index
      })
      person = personList[0];
    }
    this.setData({
      isShow,
      person
    })
    console.log(this.data.person)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toLeadership()
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
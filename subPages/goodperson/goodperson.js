// subPages/goodperson/goodperson.js
import {  get} from "../../assets/js/request"
import { getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

const date = new Date();
const years = [];
const months = [];
for (let i = date.getFullYear(); i >= 2000; i--) {
  years.push(i)
}

for (let i = date.getMonth()+1; i >= 1; i--) {
  months.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    array: [],
    value:[],
    index: 0,
    uoiType: 1,
    years,
    year:"",
    months,
    month:"",
    selectTime: `${date.getFullYear()}年${date.getMonth()+1}月`,
    isShow: false,//时间选择模态框开关 false 隐藏 true显示
    pageNum: 0,//每页数量
    pageSize: 10, //每页大小
  },

  //显示时间选择模态框
  showTimeSelect() {
    let { isShow } = this.data;
    isShow = true;
    this.setData({
      isShow
    })
  },
  //隐藏时间选择模态框并进行赋值
  hiddenTimeSelect() {
    let { isShow, selectTime, year, month, day, hour, minute } = this.data;
    isShow = false;
    selectTime = `${year}年${month}月`;
    this.setData({
      isShow,
      selectTime
    })
    this.getList()
  },

  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },

  // 获取排行榜列表
  getList() {
    const that = this;
    let data = {
      pageNum: that.data.pageNum + 1,
      pageSize: that.data.pageSize,
      uoiType:that.data.uoiType,
      year: that.data.year,
      month: that.data.month,
    }
    console.log(that.data.index)
    get({
      link: '/ordernum/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list,
          // pageNum: that.data.pageNum + 1,
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { year , month , value} = this.data;
    value = [year , month , value]
    this.getList()
    this.setData({
      value
    })
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
// subPages/ablecompetition/ablecompetition.js
import {  get,post} from "../../assets/js/request"
//获取应用实例
const app = getApp()

const date = new Date();
const years = [];
const months = [];
for (let i = date.getFullYear(); i >= 2000; i--) {
  years.push(i)
}

for (let i = date.getMonth()+1; i >= 1; i--) {
    months.push(i < 10 ? '0' + i : '' + i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    listData:[],
    id: 0,
    inputNum: '',
    years,
    year:"",
    months,
    month:"",
    selectTime: `${date.getFullYear()}年${date.getMonth()+1}月`,
    isShow: false,//时间选择模态框开关 false 隐藏 true显示
  },
  goRule(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
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
    let { isShow, selectTime, year, month} = this.data;
    isShow = false;
    selectTime = `${year}年${month}月`;
    this.setData({
      isShow,
      selectTime
    })
    this.getList()
    this.showList()
  },

  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },

  // 获取列表
  getList() {
    const that = this;
    let year=that.data.year
    let month=that.data.month
    let date=year+"-"+month
    console.log(date)
    let data = {
      date:date
    }
    get({
      link: '/gridPersonExam/list',
      data: data
    }).then(msg => {
      console.log(msg)
      for (let i = 0; i < msg.data.list.length; i++) {
        if (msg.code == 200) {
          that.setData({
            list: msg.data.list,
            grade: Math.round(msg.data.list[i].grade)
          })
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },

  showList() {
    let _this = this;
    let year=_this.data.year
    let month=_this.data.month
    let date=year+"-"+month
    console.log(date)
    let data = {
      date:date
    }
    get({
      link: '/gridPersonExamComment/list',
      data: data
    }).then(msg => {
        if (msg.code == 200) {
          _this.setData({
            listData: msg.data.list
          })
        }
    }).catch(error => {
      console.log(error);
    })
  },
  inners(val) {
    this.setData({
      inputNum: val.detail.value
    })
  },
  enter() {
    if (this.data.inputNum != '') {
      this.request(this.data.inputNum)
    } else {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
    }
  },
  request(val) {
    let _this = this
    post({
      link: '/gridPersonExamComment/save',
      data: {
        comment: val
      }
    }).then(msg => {
      console.log(msg);
      if (msg.code ==200) {
        wx.showToast({
          title: msg.data,
          icon: 'success'
        })
        this.showList()
        this.setData({
          inputNum: ''
        })
      } else {
        wx.showToast({
          title: msg.data,
          icon: 'none'
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let { year , month , value} = this.data;
    value = [year , month , value]
    this.setData({
      value
    })
    this.getList()
    this.showList()
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
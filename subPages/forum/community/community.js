  // subPages/forum/community/community.js
import { get } from "../../../assets/js/request";
import { getSubDataValue } from "../../../assets/js/public";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,//每页数量
    pageSize: 10, //每页大小
    total: 0 ,//总页数
    isBottom: false, //是否到底 
    personList:[],//社区列表
    teamId:0,
    flag: 0,//小组显示
    index:0
  },
  comDetails(e) {
    console.log(e)
    let teamId = e.currentTarget.dataset.teamid;
    wx.navigateTo({
      url: `/subPages/forum/comDetails/comDetails?id=${teamId}`,
    })
    wx.setNavigationBarTitle({
      title: '文明实践社区详情'
    })
  },
  //切换小组
  toGroup(e) {
    e = getSubDataValue(e);
    const { flag } = this.data;
    let index = e.index;
    if (flag === index) index = -1;
    this.setData({
      flag: index
    })
  },
  //小组列表
  groupList(){
      let data = {
        // pageNum: this.data.pageNum + 1,
        // pageSize: this.data.pageSize
      }
    if (this.data.isBottom){
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      }else{
      get({
        link: '/community/team/list',
        data: data
      }).then(res => {
        console.log(res)
          if (res.code == 200) {
            let newArr = [...this.data.personList, ...res.data.list]          
            this.setData({
              personList: newArr,
              total: res.data.total,
              pageNum: this.data.pageNum + 1,
              teamId: res.data.list.teamId
              
            })
          }
        if (this.data.personList.length > res.data.total){
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
    this.groupList()
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
import {  get } from "../../assets/js/request";
// pages/scoreList/scoreList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    index:0,
    deptId:36,
    mescore:0,
    mename:'',
    mepic:'',
    list:[],
  },
  //获取筛选列表
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      deptId:this.data.array[e.detail.value].deptId,
    })
    console.log(this.data.index)
    console.log(this.data.deptId)
    console.log(this.data.ceshi)
    this.getList(this.data.deptId)
  },
  // 获取党建相册筛选列表
  getphotolist(e){
    get({
      link:'/system/sysDept/getByParentId',
      data:{deptId:35}
    }).then(msg=>{
      if (msg.code == 200) {
        this.setData({
          array: msg.data,      
        })}
    })
  },
  getList(id){
    const that=this;
    console.log(id)
    get({
      link: '/fun/partyMember/listIntegral',
      data: {deptId:id}
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list,      
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
    this.getphotolist()
    let userInfo = wx.getStorageSync("userInfo")
    userInfo=userInfo.partyMember
    this.setData({
      mescore:userInfo.mebIntegral,
      mename:userInfo.mebName,
      mepic:userInfo.mebImg
    })
    this.getList(36)
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
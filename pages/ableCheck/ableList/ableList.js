import { get, post } from "../../../assets/js/request"

// pages/ableCheck/ableList/ableList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,//第几页
    ableList:[],//获取的能人列表
    total:'',//总条数
    needId:'',//需求事件id
  },
  getableList(num){
    get({
      link:'/ablePerson/list',
      data:{
        pageNum:num,
        pageSize:10
      }
    }).then(res=>{
      if(res.code==200){
        this.setData({
          ableList:this.data.ableList.concat(res.data.list),
          total:res.data.total
        })
      }
    })
  },
  task(e){
    console.log(e)
    let ableId=e.currentTarget.dataset.needid
    post({
      link:"/housekeeperProjectNeed/allot",
      data:{
        ableId:ableId,
        needId:this.data.needId
      }
    }).then(res=>{
      if(res.code==200){
        wx.showModal({
          title: '分配成功！',
          content: '当前需求已分派，等待能人确认接单。并进行需求处理。',
          showCancel: false,//是否显示取消按钮
          confirmText:"确定",//默认是“确定”
          confirmColor: '#D33333',//确定文字的颜色
       })
      }else{
        wx.showModal({
          title: '分配失败！',
          content: '请确认当前需求状态。',
          showCancel: false,//是否显示取消按钮
          confirmText:"确定",//默认是“确定”
          confirmColor: '#D33333',//确定文字的颜色
       })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      needId:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getableList(this.data.pageNum)
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
    if(this.data.total>this.data.pageNum*10){
      this.setData({
        pageNum:this.data.pageNum+1
      })
      this.getableList(this.data.pageNum)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// subPages/goodsexchange/details/details.js
import { get,post } from "../../../assets/js/request"

// subPages/integralgoods/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId: '',//活动id
    id: '',//报名id
    newsList: {},//活动详情
    idlist: {}//申请人详情
  },
  // getList() {
  //   get({
  //     link: '/information/getActivity',
  //     data: { newsId: this.data.newsId }
  //   }).then(res => {
  //     if (res.code == 200) {
  //       this.setData({
  //         newsList: res.data
  //       })
  //     }
  //   })
  // },
  getgoto() {
    get({
      link: "/heartvoice/info",
      data: { id: this.data.id }
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          idlist: res.data
        })
      }
    })
  },
  goExamDown() {
    post({
      link: "/heartvoice/save",
      data: {
        id: this.data.id,
        status: 0
      }
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '已完成取消认领',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '取消失败',
          duration: 2000
        })
      }
      // this.getList()
      this.getgoto()
    }
    )

  },
  goExamPass() {
    post({
      link: "/heartvoice/save",
      data: {
        id: this.data.id,
        status: 2
      }
    }).then(res => {
      if (res.code ==200) {
        wx.showToast({
          title: '任务已完成',
          icon: 'success',
          duration: 2000
        })
      }else {
        wx.showToast({
          title: '完成失败',
          duration: 2000
        })}
    }).catch(err => { console.log(err) })
    this.getgoto()
  },
  claim(){
    post({
      link:'/heartvoice/save',
      data:{
        id: this.data.id,
        status: 1
      }
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '认领成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '认领失败',
          duration: 2000
        })
      }
    }).catch(err => { console.log(err) })
    this.getgoto()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = JSON.parse(options.id)
    console.log(id)
    this.setData({
      newsId: id.newsId,
      id: id.id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getList()
    this.getgoto()
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
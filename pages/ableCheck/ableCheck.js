// pages/ableCheck/ableCheck.js
import { get, post } from "../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select2: 3,//审核状态
    pageNum: 1,//起始页码
    resList: [],//审核列表
    total: '',//列表总条数
  },
  godetails(e) {
    let id = JSON.stringify({
      needId: e.currentTarget.dataset.newsid,
    })
    wx.navigateTo({
      url: '/pages/ableCheck/details/details?id=' + id,
    })
  },
  del(e) {//删除该条分配
    let id = e.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该需求',
      success(res) {
        if (res.confirm) {
          post({
            link: '/housekeeperProjectNeed/delete',
            data: {
              needIds: id
            }
          }).then(res => {
            if (res.code == 200) {
              that.setData({
                resList: []
              })
              that.getListAll(that.data.pageNum, that.data.select2)
            }
          })
        } else if (res.cancel) {
          console.log(id)
        }
      }
    })
  },
  selectBtn2(e) {//选择展示全部还是获取或消费
    this.setData({
      select2: e.currentTarget.dataset.num,
      pageNum: 1,
      resList: []
    })
    if (this.data.select2==3) {
      this.getListAll(this.data.pageNum)
    } else {
      this.getListAll(this.data.pageNum, this.data.select2)
    }
  },
  getListAll(num, type = '', ) {
    get({
      link: "/housekeeperProjectNeed/list",
      data: { pageNum: num, pageSize: 5, statusByApplet: type }
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          total: res.data.total,
          resList: this.data.resList.concat(res.data.list),
        })
      }
    }).catch(err => {
      console.log(err)
    })
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
    this.getListAll(this.data.pageNum, this.data.select2)
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
    if (this.data.total > 5 * this.data.pageNum) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getListAll(this.data.pageNum, this.data.select2)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
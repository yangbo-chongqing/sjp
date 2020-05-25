// subPages/judTemplate/judTemplate.js
import {  get,post } from "../../assets/js/request"
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temList:[],
  },

  // 获取列表
  getList() {
    const that = this;
    // let url=that.data.url;
    let data = {
      // pageNum: 1,
      // pageSize:4, 
    }
    get({
      link: '/model/contract/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        for (var i = 0; i < msg.data.list.length; i++) {
          that.setData({
            temList: msg.data.list,
          })
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 模板下载
  load(e) {
    const that=this;
    console.log(e);
    // let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    console.log(url)
    // switch (type) {
    //   case "pdf":
    //     url += 'pdf';
    //     break;
    //   case "word":
    //     url += 'docx';
    //     break;
    //   case "excel":
    //     url += 'xlsx';
    //     break;
    //   default:
    //     url += 'pptx';
    //     break;
    // }
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.showToast({
          title: '下载成功',
          icon: '',
          mask: true,
          duration: 1500
        })
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '模板下载',
    })
    console.log(app.globalData)
    this.getList()
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
// subPages/judLawyer/judLawyer.js
import { post } from "../../assets/js/request";
import { get } from "../../assets/js/request"
//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpTitle:"",
    helpPic: "",
    helpContent: "",
    helpDeptId: "",
    helpType: "",
    list: [{
      areaName: "事件处理",
      parent_id: 645,
      latitude: "",
      areaLevel: 5,
      dept_id: 646,
      longitude: ""
    },
    {
      areaName: "会议",
      parent_id: 645,
      latitude: "0",
      areaLevel: 5,
      dept_id: 650,
      longitude: "0"
    }
    ],
    dictItemCode: '',
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
    objectArray: [],
    index: 0,
  },
  //事件类型
  xlChange: function (e) {
    this.setData({
      mailType: this.data.list[e.detail.value]
    })
  },

  //区域
  // bindPickerChange(e) {
  //   this.setData({
  //     qu: this.data.objectArray[e.detail.value]
  //   })
  // },

  // 提交
  formSubmit(e) {
    console.log(e)
    let helpTitle = e.detail.value.title
    let helpContent = e.detail.value.details
    if (!helpTitle) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    }
    if (!helpContent) {
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }
    post({
      link: "/lawyer/help/save",
      data: {
        helpTitle: helpTitle,
        helpContent: helpContent,
        // helpPic: this.data.src1.join(","),
        helpType: this.data.mailType.dictItemCode,
        // helpDeptId: this.data.qu.deptId
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功！',
          icon: "success",
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  // 获取类型
  getType() {
    const that = this;
    let data = {
      dictType:"help_type"
    }
    get({
      link: '/baseDict/get',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  //获取提交区域
  // getloction() {
  //   get({
  //     link: '/system/sysDept/getByParentId',
  //     data: {
  //       deptId: 35
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if (res.code == 200) {
  //       this.setData({
  //         objectArray: res.data
  //       })
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '律师帮忙',
    })
    console.log(app.globalData)
    // this.getloction()
    this.getType()
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
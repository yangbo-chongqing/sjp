// subPages/emotionpost/emotionpost.js
import { get, post } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      areaName: "是",
      state:0
    },
    {
      areaName: "否",
      state:1
    }
    ],
    idx: '',
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
  },
  //选择
  xlChange: function (e) {
    this.setData({
      // idx: e.detail.value,
      open: this.data.list[e.detail.value]
    })
    console.log(e.detail.value)
  },

  // 提交申请
  formSubmit(e) {
    console.log(e)
    let messageTitle = e.detail.value.title
    let messageContent = e.detail.value.details
    if (!messageTitle) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    }
    if (!messageContent) {
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }
    post({
      link: "/message/info/save",
      data: {
        messageTitle: messageTitle,
        messageContent: messageContent,
        messagePic: this.data.src1.join(","),
        isOpen: this.data.open.state
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '发布成功！',
          icon: "success",
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },
  //图片上传
  uppic() {
    let that = this;
    var src = that.data.src
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        //上传图片
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          src: that.data.src.concat(tempFilePaths[0])
        })
        if (that.data.src.length == 3) {
          that.setData({
            add: false
          })
        }

        wx.uploadFile({
          url: app.globalData.baseUrl + "/system/upload/file",
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "cookie": wx.getStorageSync("userCookie")
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode == 200) {
              console.log(JSON.parse(res.data))
              var src1 = that.data.src1.concat(JSON.parse(res.data).data)
              that.setData({
                src1,
              })
              console.log(that.data.src1)

            }
          }
        })

      }
    })
  },
  //图片删除
  del(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var t = this
    var src = t.data.src
    src.splice(index, 1)
    var src1 = t.data.src1
    src1.splice(index, 1)
    if (src.length != 3) {
      t.setData({
        src: src,
        src1: src1,
        add: true
      })
    } else {
      t.setData({
        add: false
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
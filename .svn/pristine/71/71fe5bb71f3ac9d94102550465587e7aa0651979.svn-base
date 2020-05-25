// subPages/serviceHall/Order/Order.js
const app = getApp();
import { get } from "../../../assets/js/request";
import { post } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
    eventTitle:'', //事件标题
    eventStatus:'', // 事件类型
    eventContent:'', //事件说明
    event_img:'' // 事件图片
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //事件标题
  subForm(e) {
  
    this.setData({
      eventTitle: e.detail.value
    })
  },
  //获取事件类型
  getMailType() {
    let data = {
      dictType: 'event_type'
    }
    get({
      link: '/baseDict/get',
      data: data
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          mailTypeList: res.data
        })
      } 
    })
  },
  //事件类型
  bindPickerChange(e) {
    
    this.setData({
      mailType: this.data.mailTypeList[e.detail.value]
    })
  },
  //事件说明
  eventExplain(e) {
  
    this.setData({
      eventContent: e.detail.value
    })
  },
  //图片上传
  subPic(e) {
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
              console.log(res.data)
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
  // 提交申请
  formSubmit(e) {
    let data = {
      eventTitle: this.data.eventTitle,
      eventContent: this.data.eventContent,
      eventType: this.data.mailType.dictItemCode,
      event_img: this.data.src1.join()
    }
    if (!this.data.eventContent) {
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }
    // if (this.data.src1.length == 0) {
    //   wx.showToast({
    //     title: '请上传图片',
    //     icon: "none"
    //   })
    //   return
    // }
    post({
      link: '/yuyue/banshi/saveEventId',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '上传成功...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMailType()
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
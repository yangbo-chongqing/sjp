// subPages/serviceHall/Mailbox/Mailbox.js
const app = getApp();
import { get , post} from "../../../assets/js/request";
//获取当前时间
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
for (let i = 2000; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
//小时
for (let i = 1; i <= 24; i++) {
  hours.push(i)
}
//分钟
for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}
Page({
  data: {
    years,
    year: date.getFullYear(),
    months,
    hours,
    month: 0,
    days,
    day: date.getDate(),
    value: [],
    hour: date.getHours(),
    minutes,
    minute:0,
    selectTime: null,
    isShow: false,//时间选择模态框开关 false 隐藏 true显示
    mailTypeList: [],//所有类型
    mailTitle: '',//信件标题
    mailType: '', //信件类型
    mailDetail: '',//事件说明
    mailPic: '',//信件里面附带的图片
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
  },
  //获取信件类型
  getMailType() {
    let data = {
      dictType: 'mail_type'
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
  //显示时间选择模态框
  showTimeSelect() {
    let { isShow } = this.data;
    isShow = true;
    this.setData({
      isShow,
    })
  },
  //隐藏时间选择模态框并进行赋值
  hiddenTimeSelect() {
    let { isShow, selectTime, year, month, day, hour, minute } = this.data;
    console.log(minute)
    isShow = false;
    selectTime = `${year}年${month}月${day}日${hour}时${minute}分`;
    this.setData({
      isShow,
      selectTime
    })
  },
  bindChange: function (e) {
    const val = e.detail.value;
  
    this.setData({
      year: val[0],
      month:val[1],
      day: val[2],
      hour: val[3],
      minute:val[4]
    })
  },
  //信件标题
  subForm(e) {
    this.setData({
      mailTitle: e.detail.value
    })
  },
  //信件类型
  bindPickerChange(e) {
    this.setData({
      mailType: this.data.mailTypeList[e.detail.value]
    })
  },
  //事件说明
  eventExplain(e) {
    this.setData({
      mailDetail: e.detail.value
    })
  },

  //上传图片  
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

  //提交申请
  submission(e) {
    let data = {
      mail_title: this.data.mailTitle,
      mail_type: this.data.mailType.dictItemCode,
      mail_detail: this.data.mailDetail,
      mail_pic: this.data.src1.join()
    }
    if (!this.data.mailTitle) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    }
    if (!this.data.mailDetail) {
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
      link: '/mailbox/saveOrUpdate',
      data: data
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
    let {value} = this.data;
    const time = new Date();
    value = [time.getFullYear() ,time.getMonth() , time.getDate() -1 , time.getHours() -1 , time.getMinutes()]
    this.getMailType()
    this.setData({
      year:time.getFullYear(),
      month: (time.getMonth() + 1 ),
      day : time.getDate() ,
      hour : time.getHours() ,
      minute:  time.getMinutes(),
      value
    })
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
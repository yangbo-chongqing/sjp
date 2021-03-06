// subPages/studydetails/studydetails.js
import {
  get, post
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    // time: 20,//阅读倒计时
    // timer: '',//定时器
    id: '',
    imgs: null
  },
  //学习初心不改单条
  getdetail(id) {
    var t = this
    let data = {
      newsId: id

    }
    get({
      link: '/information/get',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        //富文本图片放大
        var nodes = msg.data.content;
        if (nodes.indexOf("src") >= 0) {
          //正则匹配所有图片路径
          var imgs = [];
          nodes = nodes.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
            imgs.push(capture);
            return '';
          });
          //清除图片后正则匹配清除所有p标签
          nodes = nodes.replace(/<p(([\s\S])*?)<\/p>/g, function (match, capture) {
            return '';
          });
        }
        let list = msg.data
        list.content = list.content.replace(/\<img/gi, '<img style="width:100%;height:100%;display:block;" ');
        this.setData({
          detail: list,
          imgs: imgs
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  // getscore(id) {
  //   post({
  //     link: "/informationMemberIntegral/save",
  //     data: {
  //       newsId: id
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if (res.code == 1) {
  //       wx.showToast({
  //         title: res.msg,
  //         icon: "none"
  //       })
  //     } else if (res.code == 403) {
  //       wx.showToast({
  //         title: res.msg,
  //         icon: "none"
  //       })
  //     }
  //     else {
  //       wx.showToast({
  //         title: '积分领取成功！',
  //         icon: "success"
  //       })
  //     }
  //   })
  // },
  // timedown(num) {
  //   let t = this
  //   let times = t.data.time
  //   let timer = setInterval(() => {
  //     if (t.data.time < 0) {
  //       console.log("zzzz")
  //       t.clearTimeInterval()
  //       //30s结束后获取积分
  //       this.getscore(this.data.id)
  //     } else {

  //     }
  //     times = times - 1
  //     t.setData({
  //       time: times
  //     })
  //   }, 1000)
  //   t.setData({
  //     timer: timer
  //   })
  // },
  // clearTimeInterval() {
  //   var timer = this.data.timer;
  //   clearInterval(timer)
  // },
  chooseImg: function (e) {   //预览
    console.log(e)
    var src = e.currentTarget.dataset.src;
    var urls = [];
    urls[0] = this.data.imgs[0];
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: this.data.imgs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getdetail(options.id)
    // this.timedown(this.data.time)

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
    // this.clearTimeInterval()
    // this.setData({
    //   time: 30
    // })
    // console.log(this.data.time)
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
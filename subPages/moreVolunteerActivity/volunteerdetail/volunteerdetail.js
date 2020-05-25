// subPages/moreVolunteerActivity/volunteerdetail/volunteerdetail.js
import {
  get
} from "../../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel: false, //活动报名模态框
    showSign: false, //活动签到拍照模态框
    detail: {},
    imgs:null

  },
  //点击报名
  joinac(e) {
    console.log(e)

    var t = this
    let data = {
      newsId: e.currentTarget.dataset.id
    }
    get({
      link: '/activity_sign/save',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 0) {
        this.setData({
          showModel: true
        })
      } else {
        wx.showToast({
          title: msg.msg,
          icon: "none"
        })
      }

    }).catch(error => {
      console.log(error)
    })

  },
  closeModel(e) {
    console.log(e)
    this.setData({
      showModel: false
    })
  },
  //点击活动签到
  sign() {

    this.setData({
      showSign: true
    })
  },
  closeSign(e) {

    this.setData({
      showSign: false
    })
  },
  //签到模态框里面的签到
  checkin(e) {
    console.log(e)
    let t = this
    // if (!e.detail) {
    //   wx.showToast({
    //     title: '请拍照！！！',
    //     icon: "none"
    //   })
    //   return
    // }
    let data = {
      newsId: this.data.detail.newsId,
      // finishStatus: 1,
      signPic: e.detail
    }
    get({
      link: '/activity_sign/signIn',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 1) {
        wx.showToast({
          title: '报名信息审核中',
          icon: "none"
        })
        // t.setData({
        //   detail: msg.data
        // })
      } else {
        wx.showToast({
          title: '签到成功！',
          icon: "success",
          duration: 1500
        })
        setTimeout(function() {
          t.closeSign()
        }, 1500)
      }

    }).catch(error => {
      console.log(error)
    })

  },
  getacone(id) {
    var t = this
    let data = {
      newsId: id
    }
    get({
      link: '/information/getActivity',
      data: data
    }).then(msg => {
      console.log(msg)
      let list=msg.data;
      console.log(list)
      if (msg.code == 200) {
        //判断结束时间减去当前时间 ，如果当前时间大于0则为True
        let value = new Date(list.endTime.replace(/-/g, '/')) - new Date();
        let isActive = value > 0 ? true : false;
        list.isActive = isActive;

        //判断结束时间减去当前时间 ，如果当前时间小于0则为True
        let isEnd = value < 0 ? true : false;
        list.isEnd = isEnd;
        
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
          nodes = nodes.replace(/<p(([\s\S])*?)<\/p>/g, function (match, capture){
            return '';
          });
        }
        let text = msg.data.content.replace(/\<img/gi, '<img style="width:100%;" ');
        text= text.replace(/height=/,'');
        t.setData({
          detail: list,
          text:text,
          // imgs: imgs
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
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
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getacone(this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
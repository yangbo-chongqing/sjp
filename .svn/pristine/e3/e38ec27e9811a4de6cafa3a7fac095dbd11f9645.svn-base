// subPages/voldetails/voldetails.js
import {
  get
} from "../../assets/js/request"

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: "",
    name: "",
    time: "",
    stage: "",
    text: {
      type: String,
      value: ''
    },
    photo: [],
    imgs:null
  },

  // 获取法律常识详情
  getVol() {
    const that = this;
    let data = {
      lawId: that.data.id,
    }
    console.log(that.data.id)
    get({
      link: '/law/info/getOne',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        //富文本图片放大
        var nodes = msg.data.lawContent;
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
        const text = msg.data.lawContent.replace(/\<img/gi, '<img style="width:100%;height:100%;display:block;" ');
        that.setData({
          title: msg.data.lawTitle,
          name: msg.data.createName,
          time: msg.data.createDate,
          stage: msg.data.readTime,
          text: text,
          photo: msg.data.lawPic,
          imgs: imgs
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
  onLoad: function (options) {
    console.log(app.globalData)
    //接收id
    this.setData({
      id: options.id
    })
    this.getVol()
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
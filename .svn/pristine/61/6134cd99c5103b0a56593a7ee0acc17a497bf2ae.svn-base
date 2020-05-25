// subPages/forum/elegantDetails/elegantDetails.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title: "",
    name: "",
    time: "",
    stage: "",
    text: {
      type: String,
      value: ''
    },
    photo: [],
    titlef:'', //政策法规详情title
    imgs:null
  },
  elegantDetails (){
    const that = this;
    let data = {
      newsId: that.data.id,
    }
    console.log(that.data.id)
    get({
      link: '/information/get',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        //富文本图片放大
        var nodes = res.data.content;
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
        let content = res.data.content.replace(/\/\>/gi, 'width="100%!important" display= "block" height="auto!important"/>');
        that.setData({
          img: res.data.contentPic,
          title: res.data.title,
          name: res.data.createUserName,
          time: res.data.createDate,
          stage: res.data.readCount,
          text: content,
          createDate: res.data.createDate,
          imgs:imgs
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


  /**x
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.title === '工作室风采'){
      wx.setNavigationBarTitle({
        title: '工作室风采',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '政策法规详情',
      })
    }
    this.setData({
      id: options.id,
    })
    
    console.log(options.id)
    this.elegantDetails()
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
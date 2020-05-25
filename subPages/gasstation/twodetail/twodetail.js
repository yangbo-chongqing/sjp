// subPages/gasstation/twodetail/twodetail.js
import { get } from "../../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    imgs:null
  },
  getdetail(id) {
    get({
      link: '/volunteer/getThingsList',
      data: {
        thingsId: id
      }
    }).then(res => {
      if (res.code == 200) {
        let detail=res.data.list[0]
        //富文本图片放大
        var nodes = detail.things_content;
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
        const text = detail.things_content.replace(/\<img/gi, '<img style="width:100%;height:100%;display:block;" ');
        this.setData({
          detail: detail,
          text:text,
          imgs: imgs
        })
      }
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
    this.getdetail(options.id)
    wx.setNavigationBarTitle({
      title: "专题展示"
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
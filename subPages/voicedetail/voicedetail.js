// subPages/voicedetail/voicedetail.js
import { get } from "../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detail:{},
    pics:null
},
  getvoicedetail(id) {
    let data = {
      id:id
    }
    get({
      link: '/heartvoice/info',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let details = res.data
        details.details = details.details.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"');
        let pics = [];
        pics = details.pic.split(",")
        let str = '';
        pics.forEach(item => {
          item = item.replace(/http/ig,"https");
          let s = "<img style='max-width:100%;height:auto;display:block;margin-top:30rpx;margin-bottom:30rpx;'  src= ";
          s += (item + " />" );
          str += s;
        })
        details.details += str;
        this.setData({
          detail: details,
          pics:pics
        })
      }
    })
  },
  chooseImg: function (e) {   //预览
    console.log(e)
    var src = e.currentTarget.dataset.src;
    var urls = [];
    urls[0] = this.data.pics[0];
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: this.data.pics
    })
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
 
  this.getvoicedetail(options.id)
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
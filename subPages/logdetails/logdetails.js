// subPages/logdetails/logdetails.js
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
    title:"",
    detail:{},
    pics:null
  },

  // 获取图文类详情
  getLog() {
    const that = this;
    let data = {
      logId: that.data.id,
    }
    console.log(that.data.id)
    get({
      link: '/gridLog/info',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        //富文本图片放大
        let details = msg.data
        details.logInfo = details.logInfo.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"');
        let pics = [];
        if(details.logPic){
          pics = details.logPic.split(",");
          let str = '';
          pics.forEach(item => {
            item = item.replace(/http/ig,"https");
            let s = "<img style='max-width:100%;height:auto;display:block;margin-top:30rpx;margin-bottom:30rpx;'  src= ";
            s += (item + " />" );
            str += s;
          })
          details.logInfo += str;
        }
      
      
        this.setData({
          detail: details,
          pics:pics
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
    urls[0] = this.data.pics[0];
    wx.previewImage({
      current: src, // 当前显示图片的http链接  
      urls: this.data.pics
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    //接收id
    this.setData({
      id: options.id,
      title: options.title
    })
    //修改页面标题
    // const { title } = options;
    wx.setNavigationBarTitle({
      title:"网格日志"
    })
    this.getLog()
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
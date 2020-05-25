// subPages/yaowen/details/details.js
import {
  get
} from "../../../assets/js/request"

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
    photo: []
  },
  previewImage(e){
    console.log(e)
    wx.previewImage({
      current:e.currentTarget.dataset.img,
      urls: this.data.photo
    })
  },
  // 获取党建相册详情
  getPhoto() {
    const that = this;
    let list=[];
    let data = {
      photoAlbumId: that.data.id,
    }
    get({
      link: '/photoalbum/info',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        msg = msg.data;
        // const text = msg.photoAlbumIntroduce.replace(/\<img/gi, '<img style="width:100%;" ');
        for(let i in msg.photoList){
          let obj = msg.photoList[i].photoUrl
          list.push(obj);
        }
        console.log(list)
        that.setData({
          img: msg.photoAlbumCover,
          title: msg.photoAlbumName,
          name: msg.createUser,
          time: msg.createTime,
          stage: msg.readCount,
          text: msg.photoAlbumIntroduce,
          photo: list
        })
      }
    }).catch(error => {
      console.log(error)
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
      title:"党建相册"
    })
    this.getPhoto()
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
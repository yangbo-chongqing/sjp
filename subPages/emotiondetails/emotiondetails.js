// subPages/emotiondetails/emotiondetails.js
import {get,post} from "../../assets/js/request"
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    titles:"",
    time:"",
    stage:"",
    name:"",
    text: "",
    num1: "",
    num2: "",
    comment:[],
    listData:[],
    id: '',
    idTwo:'',
    open:1,
    inputNum: '',
  },

  showList() {
    let _this = this;
    get({
      link: '/discuss/info/listByMsgId',
      data: {
        discussMessageId: _this.data.id
      }
    }).then(msg => {
      if (msg.code == 200) {
        _this.setData({
          listData: msg.data.list
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  inners(val) {
    this.setData({
      inputNum: val.detail.value
    })
  },
  enter() {
    if (this.data.inputNum != '') {
      this.request(this.data.inputNum)
    } else {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
    }
  },
  request(val) {
    let _this = this
    post({
      link: '/discuss/info/save',
      data: {
        discussMessageId: _this.data.id,
        discussContent: val
      }
    }).then(msg => {
      console.log(msg);
      if (~~msg.code === 200 && msg.data) {
        wx.showToast({
          title: msg.data,
          icon: 'success'
        })
        this.showList()
        this.setData({
          inputNum: ''
        })
      } else if(~~msg.code === 200 && msg.data == undefined) {
        wx.showToast({
          title: msg.msg,
          icon: 'none'
        })
      }else {
        wx.showToast({
          title: msg.data,
          icon: 'none'
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },

  // 宣泄点和浏览历史详情
  getList() {
    const that = this;
    let data = {
      messageId: that.data.id,
    }
    get({
      link: '/message/info/getOne',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          // img: msg.data.messagePic,
          titles: msg.data.messageTitle,
          time: msg.data.createDate,
          stage: msg.data.readTime,
          text: msg.data.messageContent,
          name: msg.data.userName,
          num1: msg.data.readTime,
          num2: msg.data.discusses,
          comment: msg.data.discussList,
          open: msg.data.isOpen
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
      title: options.title,
    })
    //修改页面标题
    // const { title } = options;
    // wx.setNavigationBarTitle({
    //   title
    // })
    this.getList()
    this.showList()
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
// subPages/forum/studio/studio.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:1,//代表工作室简介
    allList:[], //媒体报道列表
    news_type: 16,//媒体id
    newtype:15, // 风采列表
    demeanorList:[], //风采列表
    briefList:[], //简介内容
    news_types: 14, //工作室简介id
    contentArr:[],
    content: {
      type: String,
      value: ''
    },
    imgs:null
  },
  //切换菜单
  changeNav(e){
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  },
  //跳转风采详情
  toDetails(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subPages/forum/elegantDetails/elegantDetails?id=${id}&title=工作室风采`,
    })
  },
  //跳转媒体报道详情
  toNewdet(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    console.log(e)
    wx.navigateTo({
      url: `/subPages/forum/newsDetails/newsDetails?id=${id}`,
    })
  },
  //获取工作室简介
  toIntroduction(){
    let data = {
      newsType: this.data.news_types
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        for(let i=0;i<res.data.list.length;i++){
          res.data.list[i].content=res.data.list[i].content.replace(/\<img/gi, '<img style="width:100%;height:100%;display:block;" ');
        }
        this.setData({
          briefList: res.data.list,
        })
      }
    })
  },
  //工作室风采
  demeanorLIstanbul(){
    // let contentArr = this.data.contentPic.split(",")
    let data = {
      newsType: this.data.newtype
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let list = res.data.list;
        list = list.map((obj,index)=>{
          let picNum = obj.contentPic.split(',').length;
          obj['picNum'] = picNum;
          return obj;
        })
        this.setData({
          demeanorList: list,
        })
      }
    })
  },
  //获取媒体报道
  goMedia() {
    let data = {
      newsType: this.data.news_type
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          allList: res.data.list,
        })
      }
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toIntroduction(),
    this.demeanorLIstanbul(),
    this.goMedia()
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
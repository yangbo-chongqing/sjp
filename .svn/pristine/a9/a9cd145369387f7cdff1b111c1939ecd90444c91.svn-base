// subPages/gasstation/gasstation.js
import { get } from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    pageSize: 8,
    pageNum: 1,
    hasmore: true,
    list:[],
    fourlist:[]


  },
  changeSwiper(e) {
    console.log(e, 111)
    let current = e.currentTarget.dataset.current
    this.setData({
      current: e.currentTarget.dataset.current,
    });
    if (current==0){
      this.resetPage()
      this.gethelp()
    }else if(current==1){
      this.resetPage()
      this.getfour(1)
    }else{
      this.resetPage()
      this.getfour(2)
    }


  },
  voluhelp(e){
    console.log(e)
    let id=e.currentTarget.dataset.id
    
    wx.navigateTo({
      url: `/subPages/voluteerhelp/voluteerhelp?id=${id}`,
    })
  },
  lasttwo(e){
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/subPages/gasstation/twodetail/twodetail?id=${id}&type=${title}`,
    })
  },
  //重置分页数据
  resetPage() {
    this.setData({
      list: [],
      fourlist: [],
      pageSize: 8,
      pageNum: 1,
      hasmore: true
    })
    console.log(this.data.pageSize,this.data.pageNum)
  },
  //志愿帮数据
  gethelp(){
    // this.resetPage()
    let t = this
    let data={
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    get({
      link: "/volunteer/getPlaceList",
      data: data,
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        let list = res.data.list
        if (res.data.isLastPage) {
          t.setData({
            hasmore: false
          })
        } else {
          t.setData({
            pageNum: res.data.nextPage
          })
        }
        t.setData({
          list: t.data.list.concat(list)
        })
        console.log(list)
      }
    })
  },
  //四项专题数据
  getfour(type) {
    let t = this
    // this.resetPage()
    let data = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      thingsType:type
    }
    get({
      link: "/volunteer/getThingsList",
      data: data,
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let fourlist = res.data.list
        if (res.data.isLastPage) {
          t.setData({
            hasmore: false
          })
        } else {
          t.setData({
            pageNum: res.data.nextPage
          })
        }
        t.setData({
          fourlist: t.data.fourlist.concat(fourlist)
        })
        console.log(fourlist)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.resetPage()
    this.gethelp()
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
   
    // this.getfour()


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
    if (this.data.hasmore) {
      this.gethelp()

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
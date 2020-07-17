// subPages/residentvoice/residentvoice.js
import { get } from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 20,
    current: 0,
    pageNum: 1,
    total:'',
    title:'',
    status:'',
    index:0,
    array:[//筛选列表
      {name:'展示所有',status:''},
      {name:'待认领',status:0},
      {name:'已认领',status:1},
      {name:'已完成',status:2},
    ],
    voicelist: [],
    Newslist:[]//立法调研或立法宣传
  },
  godetail(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id,
    })
  },
   //获取筛选列表
   bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value,
      status:this.data.array[e.detail.value].status,
      voicelist:[],
      pageNum:1
    })
    this.getvoicelist()
  },
  golist(e){
    wx.navigateTo({
      url: "/pages/newNews/News?id="+e.currentTarget.dataset.id+"&title="+this.data.title,
    })
  },
  getNews(type){
    get({
      link:'/information/list',
      data:{newsType:type}
    }).then(res=>{
      if(res.code==200){
        this.setData({
          Newslist:res.data.list
        })
      }
    })
  },
  changeSwiper(e) {
    if (this.data.current == e.currentTarget.dataset.current) {
      return
    } else {
      this.setData({
        current: e.currentTarget.dataset.current,
      });
    }
    if(this.data.current==1){
      this.setData({
        title:'立法调研'
      })
      this.getNews(26)
    }else if(this.data.current==2){
      this.setData({
        title:'立法宣传'
      })
      this.getNews(27)
    }
  },
  getvoicelist() {
    let data = {
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      status:this.data.status
    }
    get({
      link: '/heartvoice/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          voicelist:this.data.voicelist.concat(res.data.list) ,
          total:res.data.total
        })
      }
      console.log(res.data.list)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getvoicelist()
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
    if(this.data.pageNum*20<this.data.total&&this.data.current==0){
      this.setData({
        pageNum:this.data.pageNum+1
      })
      this.getvoicelist()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
  // subPages/scoreRank/scoreRank.js
import {
  get
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',//用户id
    userrankinfo:{},//个人完整的积分信息
    list:[],//完整的排名列表
    lists:[],//去掉前三的排名列表
  },
  getrank(){
    get({
      link:"/sys/user/integralRank"
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        let list = res.data
        let userid= this.data.userid
        for(var i=0;i<list.length;i++){
          if(list[i].userId==userid){
            this.setData({
              userrankinfo:list[i]
            })
          }

        }
        let arr = list.splice(0, 3)
        console.log(arr)
        this.setData({
          list: arr,
          lists:list
        })
        console.log(this.data.lists)

      }
    })
  },
  getuserid(){
    let userid=wx.getStorageSync("userInfo").userId
    console.log(userid)
    this.setData({
      userid: userid
    })
    this.getrank()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserid()
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
// subPages/integralgoods/integralgoods.js

import { get,post } from "../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLook:false,
    showStart:false,//打分模态框
    num: 1,
    mylist:[],
    code:'',
    id:''
  },
  //查看兑换码
  lookcode(e){
    console.log(e)
    this.setData({
      showLook:true,
      code:e.currentTarget.dataset.code
    })
  },
  closelook(e){
    console.log(e)
    this.setData({
      showLook: false,
    })
    if(e.currentTarget.dataset.type==="submit"){
      this.addscore(this.data.id)
    }else{

    }
  },
  //点击每颗星星

  every(e){
    console.log(e)
    this.setData({
      num: e.currentTarget.dataset.num+1
    })
    console.log(this.data.num)
  },
  //获取我的商品
  getmy(){
    get({
      link:"/integralOrder/list",
      data:{
        getByMe: 1
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          mylist:res.data.list
        })
      }
    })
  },
  //取消订单
  cancle(e){
    let id=e.currentTarget.dataset.id
    const _this=this
    wx.showModal({
      title: '提示',
      content: "确定取消订单吗？",
      success(res) {
        if (res.confirm) {
          post({
            link: "/integralOrder/cancel",
            data: {
              orderId: id
            }
          }).then(res => {
            console.log(res)
            if (res.code == 0) {
                wx.showToast({
                  title: '订单取消成功',
                  icon:"success",
                })
                _this.getmy()
            }else{
              wx.showToast({
                title:res.msg,
                icon: "none",
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
//兑换商品成功后后评价
  evaluates(e){

    this.setData({
      showStart:true,
      id:e.currentTarget.dataset.id
    })
    
    
  },
  //评价
  addscore(id){
    post({
      link: '/integralOrder/score',
      data: {
        orderId: id,
        score: this.data.num
      }
    }).then(res => {
      console.log(res)
      if(res.code==200){
        this.getmy()
        wx.showToast({
          title: "评价成功！",
          icon:"success",
          duration:1500
        })
        setTimeout(()=>{
          this.setData({
            showStart: false,
          })
        },1500)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmy()
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
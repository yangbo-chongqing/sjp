// subPages/eachshop/eachshop.js
import {
  get,post
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // num:1,
    isShow:false,
    goodscount:1,
    pageSize:5,
    pageNum:1,
    shopinfo:{},//商铺信息
    goodslist:[],//当前店铺下的商品列表
    goodsone:{},//单个商品信息
    topname:''
  },
  preventTouchMove() { },//防止有弹出层时页面滑动
  //获取店铺信息下的商品列表
  getshopinfo(id) {
    var t = this
    let data={
      marketId:id,
      
    }
    get({
      link: '/integralSupermarket/info',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          shopinfo: msg.data,
        })
        wx.setNavigationBarTitle({
          title: msg.data.marketName,
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
    //获取店铺下的商品列表
  getgoods(id) {
    var t = this
    let data = {
      marketId: id,
      isOff: 0
    }
    get({
      link: '/integralSupermarketGoods/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          goodslist: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },


  //点击兑换积分
  exchange(e){
   
      var t = this
      let data = {
        goodsId: e.currentTarget.dataset.id
      }
      get({
        link: '/integralSupermarketGoods/info',
        data: data
      }).then(msg => {
        console.log(msg)
        if (msg.code == 200) {
          this.setData({
            goodsone: msg.data
          })
        }

      }).catch(error => {
        console.log(error)
      })
  
    console.log(e,111)
    this.setData({
      isShow:true
    })
  },
  //点击模态框取消弹框
  close(){
    this.setData({
      isShow: false
    })
  },
  //商品数量减
  minus(){
    let num = this.data.goodscount
    num--
    if(num==0){
      wx.showToast({
        title: '不能再减了',
        icon:"none"
      })
      return
    }else{
      this.setData({
        goodscount: num
      })
    }
    
  },
  //商品数量加
  add(){
    
    let num = this.data.goodscount
    num++
    this.setData({
      goodscount: num
    })
  },
  //模态框中的兑换
  convert(e){
    let id=e.currentTarget.dataset.id
    let data={
      goodsId:id,
      goodsNum: this.data.goodscount
    }
    console.log(data)
 
    post({
      link:"/integralOrder/save",
      data:data
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: '兑换成功！',
          icon: "success",
          duration: 1500
        })
        setTimeout(() => {
          this.close()
        }, 1500)
       
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getshopinfo(options.id)
    this.getgoods(options.id)
   
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
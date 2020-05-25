// subPages/supermarket/supermarket.js
import {
  get
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLocation:false,
    pageSize:8,
    pageNum:1,
    list:[],//店铺列表
    locationlist: [],//区域数据和类型数据
    id:'',//头部三大类型id
    deptid:'',//每一项区域选项id
    typeid: '',//每一项类型选项id

    shopname:'',//搜索的店铺名称
    // num: 4,//评分数
    argument:{//筛选需要用到的参数
      deptId: '',
      marketType: '',
      marketName: ''
    },
    animationData: {}
  },
  //点击筛选
  getAndshow(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    this.setData({
      showLocation: true,
      id: e.currentTarget.dataset.id
    })
    if(id==1){//区域选择
      let link = '/system/sysDept/getByParentId'
      let data ={ deptId: 35 }
      this.getlocation(link,data)
    }else if(id==2){//类型选择
      let link = '/baseDict/get'
      let data = { dictType:'market_type' }
      this.getlocation(link, data)
    }else{

    }
  },
  clearinput(){
    console.log(111)
    this.setData({
      shopname:''
    })
  },
  //点击取消
  cancle() {
    wx.showTabBar()
    this.setData({
      showLocation: false,
      id: '',
      itemsid:'',
      deptid:"",
      typeid:''

    })
  },
  //点击确定
  affirm(e){
    console.log(e)
    let type=e.currentTarget.dataset.type
      this.setData({
        'argument.deptId':this.data.deptid,
        'argument.marketType': this.data.typeid,
        'argument.marketName': this.data.shopname
      })
    
    console.log(this.data.argument)
    this.getgoodslist(this.data.argument)
    this.cancle()
  },
  //点击区域选项每一项
  chooseeara(e){
    console.log(e)
    this.setData({
      deptid: e.currentTarget.dataset.deptid
    })
  },
  //点击类型选项每一项
  choosetype(e) {
    console.log(e)
    this.setData({
      typeid: e.currentTarget.dataset.typeid
    })
  },
  //获取输入店铺名称
  getshopname(e){
    console.log(e)
    this.setData({
      shopname:e.detail.value
    })
  },
  //点击进入每个店铺
  goshop(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //获取商品列表
  getgoodslist(argument) {
    var t = this
    let data = {
      // pageSize:this.data.pageSize,
      // pageNum:this.data.pageNum,
    }
    let newdata = { ...data, ...argument}
    get({
      link: '/integralSupermarket/list',
      data: newdata
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let list = msg.data.list
        t.setData({
          list: list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取区域和类型
  getlocation(link,data){
    var t = this
    get({
      link: link,
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          locationlist:msg.data
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
    this.getgoodslist(this.data.argument)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.animation.translate(0, 0).step({ duration: 1000 })
    // animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })
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
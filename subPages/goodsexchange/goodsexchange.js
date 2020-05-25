// subPages/goodsexchange/goodsexchange.js
import { get } from "../../assets/js/request"
import { post } from "../../assets/js/request"
import { getDataValue } from "../../assets/js/public";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,
    pageSize: 10,
    total: 0,
    isBottom: false,
    list: [],
    keyName: '',
    showLook: false,
    code: null,
    exchangeCode:null,
    orderId:""
  },
  //获取数据
  getData(data) {
    if (!!this.data.isBottom) return false;
    data['pageNum'] = this.data.pageNum + 1;
    data['pageSize'] = this.data.pageSize;
    if (!!this.data.keyName) data['exchangeCode'] = this.data.keyName;
    get({
      link: "/integralOrder/listByMarket",
      data: data
    }).then(res => {
      if (res.code == 200) {
        let newArr = [...this.data.list, ...res.data.list]
        this.setData({
          list: newArr,
          total: res.data.total
        })
        if (this.data.list.length >= this.data.total) {
          this.setData({
            isBottom: true
          })
        }
      }
    })
  },
  //获取搜索框输入内容
  bindInput(e) {
    this.setData({
      keyName: e.detail.value
    })
    this.search()
  },
  //搜索
  search() {
    this.setData({
      pageNum: 0,
      total: 0,
      isBottom: false,
      list: [],
    })
    this.getData({ getByMarketMe: 1 })
  },
  //获取搜索框的积分
  bindCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //查看兑换码
  exchange(e) {
    post({
      link: "/integralOrder/codeOrderCheck",
      data: {
        exchangeCode: this.data.code,
        orderId:this.data.orderId
      }
    }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '兑换成功！',
        })
        post({
          link: "/integralOrder/finish",
          data: {
            orderId:this.data.orderId
          }
        }).then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: '兑换成功！',
            })
            //刷新数据
            this.setData({
              keyName: '',
              pageNum: 0,
              total: 0,
              isBottom: false,
              list: [],
            })
            this.getData({ getByMarketMe: 1 })
          }
        })
        //刷新数据
        this.setData({
          showLook: false,
        })
      }else{
        wx.showToast({
          title: '兑换码错误！',
          icon: 'none',
        })
      }
    })
  },

  //打开
  lookcode(e) {
    this.setData({
      showLook: true,
      orderId:getDataValue(e).item.orderId
      // exchangeCode:getDataValue(e).item.exchangeCode
    })
    // this.exchange()
  },

  //关闭查看
  closelook() {
    this.setData({
      showLook: false
    })
  },


  handlePhone(e){
    console.log(e)
    var phone = e.currentTarget.dataset.ph;
    //调打手机
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData({ getByMarketMe: 1 })
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
    this.getData({ getByMarketMe: 1 })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
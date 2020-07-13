// subPages/threelist/threelist.js
import {
  get,
  post
} from "../../assets/js/request";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    resourcelist: [], //资源清单列表
    prolist: [], //资源清单列表
    placelist: [], //提交区域列表
    index: '', //区域下标
    needDeptId: '', //选中区域deptid
    needOut:[],//需求清单，
    submitShow:1,//是否显示提交界面
    num:1,// 需求的当前页面
    total:1,
  },
  //获取需求清单
  getneedOut(key) {

    let data = {
      // pageNum:key,
      // pageSize:5
    }
    get({
      link: '/need/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          // needInt:msg.data.list
          needOut:this.data.needOut.concat(msg.data.list),//拼接显示
          total:msg.data.total
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  changeSwiper(e) {
    console.log(e, 111)
    this.setData({
      current: e.currentTarget.dataset.current,
    });
  },
  gopro(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //获取资源清单
  getsorce() {

    let data = {
      
    }
    get({
      link: '/resource/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          resourcelist: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取项目清单
  getpro() {

    let data = {
      pageNum: 1,
      project:true
    }
    get({
      link: '/need/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          prolist: msg.data.list
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  //获取提交区域
  getplace() {

    let data = {
      deptId: 35

    }
    get({
      link: '/system/sysDept/getByParentId',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        this.setData({
          placelist: msg.data
        })
      }

    }).catch(error => {
      console.log(error)
    })
  },
  xlChange(e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
      needDeptId: this.data.placelist[e.detail.value].dept_id
    })
  },
  out(){
    this.setData({
      submitShow:0
    })
  },
  //需求提交
  formSubmit(e) {
    console.log(e)
    let t=this
    let title = e.detail.value.needTitle
    // let address = e.detail.value.needAddress
    let introduction = e.detail.value.needIntro
    this.setData({
      title,
      // address,
      introduction
    })
    if (!title) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    }
    // if (!this.data.index) {
    //   wx.showToast({
    //     title: '请选择区域',
    //     icon: "none"
    //   })
    //   return
    // }
    // if (!address) {
    //   wx.showToast({
    //     title: '请输入详细地址',
    //     icon: "none"
    //   })
    //   return
    // }
    if (!introduction) {
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }

    let data = e.detail.value
    // data.needDeptId = this.data.needDeptId
    
    post({
      link:"/need/info/save",
      data:data
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: '提交成功',
          icon:"success",
          duration:2000
        })
        setTimeout(function(){
          t.setData({
            index: '',
            title: '',
            address: '',
            introduction: '',
            submitShow:1
          })
        },2000)
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getsorce()
    this.getpro()
    this.getplace()
    this.getneedOut(this.data.num)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.data.submitShow=1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.current==1&&this.data.total>this.data.num*5){
      this.data.num+=1
      this.getneedOut(this.data.num)
      wx.startPullDownRefresh()
   }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
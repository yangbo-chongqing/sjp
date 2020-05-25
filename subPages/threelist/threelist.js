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
            introduction: ''
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
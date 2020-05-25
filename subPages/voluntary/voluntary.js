// subPages/voluntary/voluntary.js
import { get,post } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: 1,
    volList:[],
    list: [],
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
    objectArray: [],
    index: 0,
    zhanList: [],
  },
  //切换菜单
  goNav(e) {
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  },

  // 获取类型
  getType() {
    const that = this;
    let data = {
      dictType: "member_type"
    }
    get({
      link: '/baseDict/get',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  //类型选择
  xlChange: function (e) {
    console.log(e)
    this.setData({
      member_type: this.data.list[e.detail.value]
    })
  },
  // 区域
  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     qu: this.data.objectArray[e.detail.value]
  //   })
  // },
  //获取提交区域
  // getloction() {
  //   get({
  //     link: '/system/sysDept/getByParentId',
  //     data: {
  //       deptId: 35
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if (res.code == 200) {
  //       this.setData({
  //         objectArray: res.data
  //       })
  //     }
  //   })
  // },

  // 提交发布需求
  formSubmit(e) {
    console.log(e)
    let memberTitle = e.detail.value.title
    let memberDetails = e.detail.value.details
    if (!memberTitle) {
      wx.showToast({
        title: '请输入标题',
        icon: "none"
      })
      return
    }
    if (!memberDetails) {
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }
    post({
      link: "/linli/tiaojie/saveDemand",
      data: {
        memberTitle: memberTitle,
        memberDetails: memberDetails,
        memberType: this.data.member_type.dictItemCode,
        // deptId: this.data.qu.deptId
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功！',
          icon: "success",
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  //跳转领理讲和详情
  toDetails(e) {
    let id = getDataValue(e).item.caseId;
    let title = getDataValue(e).item.caseTitle;
    let url = "/subPages/voluntary/voluntaryDetails/voluntaryDetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取社区调解委员会架构列表
  getvolList(){
    const that = this;
    let data = {
    }
    get({
      link: '/linli/tiaojie/getMediateList',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          volList: msg.data.list,
        });
      }

    }).catch(error => {
      console.log(error)
    })
  },

  // 获取调解案例展示列表
  getzhanList() {
    const that = this;
    let data = {
    }
    get({
      link: '/linli/tiaojie/getCaseList',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          zhanList: msg.data.list,
        });
      }

    }).catch(error => {
      console.log(error)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '邻里调解讲和',
    })
    console.log(app.globalData)
    this.getvolList()
    this.getzhanList()
    // this.getloction()
    this.getType()
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
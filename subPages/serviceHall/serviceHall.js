// subPages/serviceHall/serviceHall.js
import { getSubDataValue } from "../../assets/js/public";
import { get } from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNotice: false,
    ToolsList: [
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/领导班子.png",
        // title:"领导班子",
        link: "/subPages/serviceHall/Lead/Lead",
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/banshizhinan.png",
        // title:"办事机构",
        link: "/subPages/serviceHall/Organization/Organization"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/shequjianjie.png",
        // title:"社区简介",
        link: "/subPages/serviceHall/Community/Community"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/chengzhengditu.png",
        // title:"城镇地图",
        link: "/subPages/serviceHall/townMap/townMap"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/zuzhijiagou.png",
        // title:"组织架构",
        link: "/subPages/serviceHall/Framework/Framework"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/shujixinxian.png",
        // title:"书记信箱",
        link: "/subPages/serviceHall/Mailbox/Mailbox"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/zhencefagui1.png",
        // title:"政策法规",
        link: "/subPages/serviceHall/Policy/Policy"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/yuyuebanshi.png",
        // title:"预约办事",
        link: "/subPages/serviceHall/Order/Order"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/baojingdianhua1.png",
        // title:"报警电话",
        link: "/subPages/serviceHall/Alarm/Alarm"
      }
    ],
    deptId: 35,
    areaName: '',//区域名
    scoreintro: {},
    deptAttributes: ''//街道介绍
  },
  //去子页面
  goSubpage(e) {
    const url = getSubDataValue(e).link;
    wx.navigateTo({
      url
    })
  },
  godeal() {
    this.setData({//展示说明
      showNotice: true
    })
  },
  getnews() {
    get({
      link: "/information/list",
      data: {
        newsType: 29
      }
    }).then(res => {
      this.setData({
        scoreintro: res.data.list[0]
      })
    })
  },
  closenotice() {
    this.setData({//不展示说明
      showNotice: false
    })
  },
  //区域介绍
  toRegion(e) {
    let data = {
      deptId: this.data.deptId
    }
    get({
      link: '/system/sysDept/getByDeptId?deptId=35',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        const text = res.data.content.replace(/\<img/gi, '<img style="width:100%;height:100%;display:block;margin-top:30rpx;margin-bottom:30rpx;" ');
        this.setData({
          areaName: res.data.areaName,
          deptAttributes: text
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toRegion()
    this.getnews()
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
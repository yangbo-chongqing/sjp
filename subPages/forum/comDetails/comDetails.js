// subPages/forum/comDetails/comDetails.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:'1',
    username:'',
    data:[],
    teamId:0,
    teamPic:[],//小组图片
    news_type:17,//活动风采id
    allList:[],//活动列表
    teamSlogan:'', //小组标语
    teamTitle:'' ,//小组标题
    deptName:'',//地区
    teamContent:'', //内容
    groupList:[] //队伍列表
  },
  //切换菜单
  changeNav(e){
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  },
  //获取队伍构成
  toRanks() {
    let data = {
      teamId: this.data.teamId
    }
    get({
      link: '/community/team/getOne',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          groupList: res.data.users
        })
      }

    })
  },
  //获取详情
  toGroup(){
    let data={
      teamId: this.data.teamId
    }
    console.log(this.data.teamId)
    get({
      link: '/community/team/getOne',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        let picArr = res.data.teamPic.split(',')
        this.setData({
          teamPic: res.data.teamPic,
          teamSlogan: res.data.teamSlogan,
          teamTitle: res.data.teamTitle,
          deptName: res.data.deptName,
          teamContent: res.data.teamContent,
          teamPic: picArr
        })
      }
     
    })
  },
  //活动风采
  activityList() {
    let data = {
      newsType: this.data.news_type,
      remark: this.data.teamId
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          allList: res.data.list,
        })
      }
    })
  },  
  //跳转活动风采详情
  toThemes(e) {

    let id = e.currentTarget.dataset.id;
    let titletwo = '文明实践社区'
    wx.navigateTo({
      url: `/subPages/forum/partyDay/partyDay?id=${id}&title=${titletwo}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamId: options.id
    })
    wx.setNavigationBarTitle({
      title: "文明实践社区",
    })
    this.toGroup()
    this.activityList()
    this.toRanks()
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
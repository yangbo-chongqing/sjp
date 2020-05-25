// subPages/serviceHall/Framework/Framework.js
import { getSubDataValue } from "../../../assets/js/public";
import { get } from "../../../assets/js/request";
import { post } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frameworkList: [],//机关党组织列表
    partyList: [],//党支部列表
    flag: 0,//党支部显示
    isshow: false, // 模态框
    person: {}, //模态框显示的人
    deptId: 35,//省份id
  },
  //切换党支部
  toggleParty(e) {
    e = getSubDataValue(e);
    const { flag } = this.data;
    let index = e.index;
    if (flag === index) index = -1;
    this.setData({
      flag: index
    })
  },
  //切换模态框
  toggleModal(e) {
    const index = e.detail.index;
    // const type = e.detail.type; //根据type判断筛选的数组是哪个
    const newPerson = e.detail.person;
    console.log(newPerson)
    let { person, FrameworkList, partyList } = this.data;
    // if (parseInt(type) === 1) {
    //   console.log('机关')
    //   //筛选机关党组织
    //   person = FrameworkList[index];
    // } else {
    //   console.log('支部')
    //   //筛选党支部
    //   person = partyList[index];
    // }
    // console.log(person)
    this.setData({
      isshow: !this.data.isshow,
      person: newPerson
    })
  },
  //组织架构详情列表
  framework(e) {
    let frameworkList=this.data.frameworkList
    get({
      link: '/fun/deptOrg/orgList'
    }).then(res => {
      if (res.code == 200) {
        if (res.data.branch != null) {
          frameworkList = res.data.branch.listMember;
        }
        this.setData({
          partyList: res.data.communityList,
          frameworkList: frameworkList,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.framework()
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
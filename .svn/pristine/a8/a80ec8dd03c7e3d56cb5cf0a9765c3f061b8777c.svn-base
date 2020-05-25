// subPages/serviceHall/Organization/Organization.js
import { getDataValue } from "../../../assets/js/public";
import { get } from "../../../assets/js/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toolsList:[
      {
        title:"党政办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
        link:"/subPages/serviceHall/OrgDetails/OrgDetails"
      },
      {
        title:"党建办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg"
      },
      {
        title:"经发办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
        link:"/subPages/serviceHall/OrgDetails/OrgDetails"
      },
      {
        title:"民政社事办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"平安建设办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"财政办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"应急办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"社事服务中心",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"社文服务中心",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"退役军人服务站",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"规建环保办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"综治办",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"劳动保障服务所",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      },
      {
        title:"综合行政执法大队",
        src:"http://img1.imgtn.bdimg.com/it/u=2115108219,3168007616&fm=26&gp=0.jpg",
      }
    ],
    pageNum: 1,
    pageSize: 30,
    id:0
  },
  //去办事机构详情页面
  goDetail(e){
    console.log(e)
    let id = getDataValue(e).item.officeId;
    let title = getDataValue(e).item.officeName;
    let url = "/subPages/serviceHall/OrgDetails/OrgDetails?title=" + title +"&id="+id;
    wx.navigateTo({
      url
    });
  },
  //获取列表
  mechanismList(e){
    let data={
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    get({
      link: '/office/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          toolsList: res.data.list
        })
      }
      console.log(res.data.list)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mechanismList();
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
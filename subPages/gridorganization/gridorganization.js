// subPages/gridorganization/gridorganization.js
import { get } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    item:[],
  },
  //点击最外层列表展开收起  点击一级菜单
  listTap(e) {
    let Index = e.currentTarget.dataset.parentindex; //获取点击的下标值
    // console.log(Index,typeof Index);
    let list = this.data.list;
    // this.topNum = Index;

    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      list,
    });
    this.getGirdlist(Index, e.currentTarget.dataset.id)
  },
  //点击里面的子列表展开收起  点击二级菜单
  // listItemTap(e) {  
  //   let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
  //   Index = e.currentTarget.dataset.index, //点击的内层下标
  //   list = this.data.list;
  //   // console.log(list[parentindex].item, Index);
  //   list[parentindex].item[Index].show = !list[parentindex].item[Index].show || false; //变换其打开、关闭的状态
  //   if (list[parentindex].item[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
  //     for (let i = 0, len = list[parentindex].item.length; i < len; i++) {
  //       if (i != Index) {
  //         list[parentindex].item[i].show = false;
  //       }
  //     }
  //   }
  //   this.setData({
  //     list,
  //   });
  //   this.getGirdperosn(parentindex, e.currentTarget.dataset.id)
  // },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        if (!data[i].item)break;
        for (let j = 0; j < data[i].item.length; j++) { //其他所有内层也为关闭状态
          data[i].item[j].show = false;
        }
      }
    }
  },

  

  // 获取第一层区域列表
  getList(id) {
    const that = this;
    let list=that.data.list=[];
    let data = {
      deptId:35
    }
    get({
      link: '/system/sysDept/getByParentId',
      data: data
    }).then(msg => {
      if (msg.code == 200) {
        let data = msg.data;
        for(let i in data){
          let obj = { listName: data[i].areaName, id: data[i].deptId}
          list.push(obj);
        }
        that.setData({
          list:list
        })
      }
      console.log(list)
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取第二层网格列表
  getGirdlist(num,id) {
    const that = this;
    let item = that.data.list;
    let data = {
      deptId:id
    }
    get({
      link: '/grid/list',
      data: data
    }).then(msg => {
      if (msg.code == 200) {
        let data = msg.data.list;
        item[num]['item'] = data;
        console.log(item[num]['item'])
        that.setData({
          list:item
        })
      }
      console.log(list)
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取第三层网格员列表
  getGirdperosn(num1,id) {
    const that = this;
    let item1 = that.data.list;
    let data = {
      gridId:id
    }
    get({
      link: '/gridperson/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        let data=msg.data.list;
        item1[num1]['item1']=data;
        that.setData({
          list: item1
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  //跳转网格详情
  goDetails(e) {
    let { gridId, gridPersonId } = getDataValue(e).item
    let url = "/subPages/gridorganizationdetails/gridorganizationdetails?id=" + gridId + "&ids=" + gridPersonId;
    wx.navigateTo({
      url
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(app.globalData)
    wx.setNavigationBarTitle({
      title: "网格组织",
    })
    this.getList()     
    // this.getGirdlist()
    // this.getGirdperosn()
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
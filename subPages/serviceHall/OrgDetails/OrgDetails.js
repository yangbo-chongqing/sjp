// subPages/serviceHall/OrgDetails/OrgDetails.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList:[
      {
        name:"邓朝霞",
        position:"党工委书记1",
        tel:"023-1234578",
        duty:"主持工作"
      }
    ],
    id:'',
    title:'',//
    officeName:'',
    officeInfo:'',
    officeTel:''
  },
//获取办事机构详情
  workDetails(e){
    let data={
      officeId: this.data.id
    }
    console.log(this.data.id)
    get({
      link: '/office/info',
      data: data
    }).then(res=>{
        if (res.code == 200) {
          console.log(res)
          let picArr = null;
          let telArr = null;
          if(res.data.officePic != null) {
            picArr = res.data.officePic.split(',');
          }
          if(res.data.officeTel != null){
            telArr = res.data.officeTel.split(',');
          }
          console.log(picArr)
          telArr=telArr.filter(item=>{
            if(item.length!==0){
              return item
            }
          })
          
          console.log(telArr)
          this.setData({
            officeName: res.data.officeName,
            bac: res.data.coverPic,
            personList: res.data.personList,
            officeInfo: res.data.officeInfo,
            officeTel: telArr,
            officePic: picArr
          })
        }
        
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
    //接收id
    this.setData({
      id:options.id,
      title:options.title
    })
    //修改页面标题
    const { title } = options;
    wx.setNavigationBarTitle({
      title
    })
    this.workDetails()
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
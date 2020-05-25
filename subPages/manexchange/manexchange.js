// subPages/manexchange/manexchange.js
import {
  get,post
} from "../../assets/js/request"
var context = null; // 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    bool: true,
    showWrite: false,
    show:false,    //订单详情弹出框
    showLook: false,   //拒绝理由弹框
    signature:'',//签名图片,
    manlist:[],
    list:{},
    id:'',
    openPicker: false,    
    needAnimation: false,    
    contentHeight: 1000,
    needAbleList:"",    
    refuseReason:"",    //理由
  },
  show: function (e) {     
    this.setData({       
      openPicker: !this.data.openPicker,       
      needAnimation: true,
      id:e.currentTarget.dataset.id   
    });    
  },
  write(e) {
    this.setData({
      showWrite: true,
      id:e.currentTarget.dataset.id
    })
  },
  // 订单详情弹出框
  look(e) {
    let needId=e.currentTarget.dataset.id
    this.setData({
      show: true,
      id:needId
    })
    this.lookList(this.data.id)
  },
  lookList(id){
    get({
      link:"/housekeeperProjectNeed/info",
      data:{
        needId:id
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          list:res.data,
          needAbleList:res.data.needAbleList[0]
        })
        console.log(this.data.needAbleList)
      }
    })
  },
  // 订单确定
  getShow(){
    this.setData({
      show:false
    })
  },

  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  //开始
  canvasStart: function(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  //过程
  canvasMove: function(event) {

    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);
    context.setStrokeStyle('#000');
    context.setFillStyle('#FFFFFF');
    context.setLineWidth(2);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();
    context.draw(false);
  },
  canvasEnd: function(event) {
    isButtonDown = false;
  },
  cleardraw: function() {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw();
  },
  reset() {
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath();
    context.setStrokeStyle('#000');
    context.setLineWidth(2);
    context.setLineCap('round');
    context.setLineJoin('round');
  },
  //导出图片
  getimg: function() {
    let t=this
    if (arrx.length == 0) {
      setTimeout(function () {
        wx.showModal({
          title: '提示',
          content: '签名内容不能为空！',
          showCancel: false
        });
      }, 300)
      return false;
    };
    //生成图片
    wx.canvasToTempFilePath({
      fileType: "jpg",

      canvasId: 'canvas',
      success: function(res) {
        console.log(res.tempFilePath);
        //存入服务器
        wx.uploadFile({
          url: app.globalData.baseUrl + "/system/upload/file", //接口地址
          filePath: res.tempFilePath,
          name: 'file',
          header: {
            "cookie": wx.getStorageSync("userCookie"),
            "clientOrigin": 2

          },
          success: function(res) {
            console.log(res);
            if (res.statusCode==200){
              let data=res.data
              data=JSON.parse(data)
              console.log(data)
              if(data.code==200){
                t.setData({
                  signature: data.data
                })
                t.updata()
              }
              
            }

          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {}
        });
      }
    })

  },
  

 
  //获取能人核销列表
  getlist(){
    get({
      link:"/housekeeperProjectNeed/listByAble",
      
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          manlist:res.data.list
        })
      }
    })
  },
  //能人接受
  accept(e){
    let id=e.currentTarget.dataset.id
    let data={
      needAbleId:id,
      status:1
    }
    this.comfire(data)
    this.getlist()
  },

  //打开
  refuse(e) {
    let needId=e.currentTarget.dataset.id
    this.setData({
      showLook: true,
      id:needId
    })
    this.lookList(this.data.id)
  },

  //关闭查看
  closelook() {
    this.setData({
      showLook: false
    })
  },
  bindValue(e) {
    this.setData({
      refuseReason: e.detail.value
    })
  },
  //能人拒绝
  exchange(e) {
    let id = e.currentTarget.dataset.id;
    let data = {
      needAbleId: id,
      status: 2,
      refuseReason:this.data.refuseReason
    }
    this.comfire(data)
  },
  comfire(data){
    post({
      link:"/housekeeperProjectNeed/handleAllot",
      data:data
    }).then(res=>{
      if(res.code==200){
        setTimeout(function () {
          wx.showToast({
            title: '操作成功',
            icon: "success"
          })
        }, 300)
        this.setData({
          showLook:false
        })
        this.getlist()
      }else{
        setTimeout(function () {
          wx.showToast({
            title: '您已拒绝/接受过！',
            icon: "none"
          })
        }, 300)
      }
    })
  },
  //签字确认
  updata(){
    post({
      link:"/housekeeperProjectNeed/end",
      data:{
        needAbleId:this.data.id,
        surePic: this.data.signature
      }
    }).then(res=>{
      console.log(res)
      if(res.code==0){
        setTimeout(function () {
          wx.showToast({
            title: '提交成功',
            icon:"success"
          })
        }, 300)
        this.getlist()
        setTimeout(()=>{
          this.setData({
            showWrite: false
          })
          this.cleardraw()//清除画布
        },1500)
        
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
  onLoad: function(options) {
    this.reset()
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
    this.getlist()


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
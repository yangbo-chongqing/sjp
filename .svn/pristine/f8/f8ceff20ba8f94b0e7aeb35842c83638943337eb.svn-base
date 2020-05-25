// subPages/addneed/addneed.js
import {
  get,post
} from "../../assets/js/request"
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */


  data: {
    list:[],//业务类型数据
    projectname:[],//项目名称数据
    idx: '',
    idx2: '',
    typeid:'',//项目类型id
    nameid:"",//项目id
    src: [], //本地预览的照片路径
    src1: [], //服务器返的照片路径
    add: true, //控制三张图片后不显示上传按钮
    bool:true,//控制在没有选择业务类型时项目名称无法选择
  },
  //业务类型
  xlChange: function(e) {
    console.log(e)
    this.setData({
      idx: e.detail.value,
      typeid: this.data.list[e.detail.value].dictItemCode,
      bool: false
    })
    this.getprolist(this.data.list[e.detail.value].dictItemCode)
  },
  //项目名称
  namechange(e){
  this.setData({
    idx2: e.detail.value,
    nameid: this.data.projectname[e.detail.value].projectId
  })
  console.log(this.data.nameid)
  
},
  //获取业务类型
  gettype(){
    get({
      link:"/baseDict/get",
      data:{
        dictType: 'project_type'
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          list:res.data
        })
      }
    })
  },
  //项目管家库列表
  getprolist(id) {
    get({
      link: "/housekeeperProject/list",
      data: {
        projectType:id
      }
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          projectname:res.data.list
        })
      }
        
    })
  },
  click(){
    var t = this
    if (t.data.bool) {
      wx.showToast({
        title: '请先选择项目类型',
        icon: "none",
        duration: 1500
      })
      return
    }
  },
  formSubmit(e){
    console.log(e)
    let needName = e.detail.value.needName
    let needInfo = e.detail.value.needInfo
    if (!this.data.typeid){
      wx.showToast({
        title: '请选择项目类型',
        icon: "none"
      })
      return
    }
    if (!this.data.nameid) {
      wx.showToast({
        title: '请选择项目名称',
        icon: "none"
      })
      return
    }
    if (!needInfo){
      wx.showToast({
        title: '请输入详细说明',
        icon: "none"
      })
      return
    }
    // if (this.data.src.length==0) {
    //   wx.showToast({
    //     title: '请上传照片',
    //     icon: "none"
    //   })
    //   return
    // }
    post({
      link:'/housekeeperProjectNeed/save',
      data:{
        projectId: this.data.nameid,
        needInfo: needInfo,
        // needName: needName,
        needPic: this.data.src1.join(",")
      }
    }).then(res=>{
      console.log(res)
      if(res.code==0){
        wx.showToast({
          title: '提交成功',
          icon: "success",
          duration:1500
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      }else if(res.code==1){
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  //图片上传
  uppic() {
    let that = this;
    var src = that.data.src
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        //上传图片
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          src: that.data.src.concat(tempFilePaths[0])
        })
        if (that.data.src.length == 3) {
          that.setData({
            add: false
          })
        }

        wx.uploadFile({
          url: app.globalData.baseUrl + "/system/upload/file",
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "cookie": wx.getStorageSync("userCookie"),
            "clientOrigin": 2
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode == 200) {
              console.log(JSON.parse(res.data))
              var src1 = that.data.src1.concat(JSON.parse(res.data).data)
              that.setData({
                src1,
              })
              console.log(that.data.src1)

            }
          }
        })

      }
    })
  },
  //图片删除
  del(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var t = this
    var src = t.data.src
    src.splice(index, 1)
    var src1 = t.data.src1
    src1.splice(index, 1)
    if (src.length != 3) {
      t.setData({
        src: src,
        src1: src1,
        add: true
      })
    } else {
      t.setData({
        add: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.gettype()
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
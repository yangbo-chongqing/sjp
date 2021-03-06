// subPages/personData/personData.js
import {
  get,post
} from "../../assets/js/request";
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  // wx.getStorageSync("userInfo").picId
  data: {
    src: wx.getStorageSync("userInfo").picId || '',
    src1:"",//服务器返回的图片路径
    multiArray: [],  // 二维数组数据
    multiIndex: [0, 0], // 默认的下标
    step: 0, // 默认显示请选择
    showCode:false,
    userinfo:'',
    changeback:false,
    gridid:'',
    date: '',//默认日期
  },
  //地区选择
  getplace() {
    get({
      link: "/system/sysDept/getByParentId",
      data: {
        deptId: 35
      }
    }).then(res=>{
      if(res.code==200){
        var provinceList = res.data // 放在一个数组里面
        var provinceArr = res.data.map((item) => {
          return item.areaName
        }) // 获取数据里面的value值，就是只用数据的名称 
        this.setData({
          multiArray: [provinceArr, []], // 更新二维数组 更新后长这样 [['居委会', '局委会'],[]
          provinceList, // 局委会原始数据
          provinceArr // 局委会所有的名称
        })
        var defaultCode = this.data.provinceList[0].deptId  // 使用第一项当作参数获取网格数据
        if (defaultCode) {
          this.setData({
            currnetProvinceKey: defaultCode  // 保存在当前的区域id
          })
          this.getgrid(defaultCode)  // 获取网格数据
        }
      }
    })
  },
  bindDateChange: function(e) {//选中日期
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      changeback:true
    })
  },
  getgrid(code){
    console.log(code,9999)
    if(!code){
      console.log(8888)
      this.setData({
        multiArray: [this.data.provinceArr, [1]]
      })
      return
    }
    get({
      link:"/grid/list",
      data:{
        deptId:code
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        var cityArr = res.data.list.map((item) => { return item.gridName })
        var cityList = res.data.list
        this.setData({
          multiArray: [this.data.provinceArr, cityArr], 
          cityList,  // 保存网格原始数据
          cityArr  // 所有的网格名称
        })
        console.log(this.data.multiArray)

      
      }
    })
  },
  columnchange(e) {  // 滚动选择器 触发的事件
  console.log(e)
  this.setData({
    changeback: true
  })
    var column = e.detail.column  // 当前改变的列
    if(column==0 && e.detail.value==0){
      this.getgrid(this.data.provinceList[0].deptId)
    }
    var data = {
      multiIndex: JSON.parse(JSON.stringify(this.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(this.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value;  // 第几列改变了就是对应multiIndex的第几个，更新它
    switch (column) { // 处理不同的逻辑
      case 0:   // 第一列更改 就是居委会的更改
        var currentProvinceKey = this.data.provinceList[e.detail.value].deptId
        if (currentProvinceKey != this.data.currnetProvinceKey) {  // 判断当前的key是不是真正的更新了
          this.getgrid(currentProvinceKey)  // 获取当前key下面的网格数据
        }
        data.multiIndex[1] = 0  // 将居委会默认选择第一个
        break;
    }
    this.setData(data)  //
  },
  pickchange(e) {
    console.log(e)
    this.setData({
      step: 1,  // 
      two: 1,
      multiIndex: e.detail.value,
      gridid: this.data.cityList[e.detail.value[1]].gridId
    })
    console.log(this.data.currnetProvinceKey, this.data.gridid)
  },
  showCode(){
    this.setData({
      showCode:true
    })
  },
  //关闭二维码
  closecode() {
    this.setData({
      showCode: false
    })
  },
  //照片上传
  add() {
    let that = this;
    var url = app.globalData.baseUrl + "/system/upload/file"
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


        that.setData({
          src: tempFilePaths[0]
        })
        console.log(that.data.src)

        wx.uploadFile({
          url: url,
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "cookie": wx.getStorageSync("userCookie"),
            'Content-Type': 'application/json;charset=utf-8',
            "clientOrigin": 2
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode == 200) {
              console.log(JSON.parse(res.data))
              var src1 = that.data.src1.concat(JSON.parse(res.data).data)
              that.setData({
                src1,
                changeback:true
              })
              console.log(that.data.src1)
            }
          }
        })

      }
    })
  },
  //真实姓名输入
  inputname(e){
    this.setData({
      changeback: true
    })
  },
  //电话号码输入
  // inputmobile(e) {
  //   this.setData({
  //     changeback: true

  //   })
  // },
  goMobile(){
    wx.navigateTo({
      url: '/subPages/changePhone/changePhone'
    })
  },
  formSubmit(e){
    if (this.data.changeback){
      console.log(e)
      let name=e.detail.value.name
      let mobile=e.detail.value.mobile
      let reg = /^1[3456789]\d{9}$/ //手机号码正则
      if (!name) {
        wx.showToast({
          title: '请输入姓名',
          icon: "none"
        })
        return
      }
      // if (!mobile || !reg.test(mobile)){
      //   wx.showToast({
      //     title: '请输入正确的号码',
      //     icon:"none"
      //   })
      //   return
      // }
      let data={
        picId: this.data.src1 || this.data.src,
        name: name,
        // mobile: mobile,
        gridId: this.data.gridid,
        birth:this.data.date
      }
      console.log(data)
      
      get({
        link:"/sys/user/updateByMe",
        data:data
      }).then(res=>{
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '修改成功',
            icon:"success"
          })
          let { userinfo } = this.data;
          userinfo.name = name;
          userinfo.gridId= this.data.gridid,
          userinfo.picId = this.data.src1 ? this.data.src1 : userinfo.picId
          this.setData({
            userinfo,
            changeback:false
          })
          wx.setStorageSync("userInfo", this.data.userinfo)
        }
      })

    }else{
      
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo:wx.getStorageSync("userInfo"),
      date:this.data.userinfo.birth
    })
    if(this.data.userinfo.birth){
      this.setData({
        date:this.data.userinfo.birth
      })
    }else{
      this.setData({
        date:'1970-1-1'
      })
    }
    this.getplace()
    console.log(wx.getStorageSync("userInfo").picId)
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
    this.setData({
      src:''
    })
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
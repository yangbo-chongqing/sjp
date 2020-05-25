// pages/register/register.js
import {
  hexMD5
} from "../../utils/md5"
import {
  get
} from "../../assets/js/request"
const app = getApp()

Page({

      /**
       * 页面的初始数据
       */
      data: {
        mytop: {
          title: "注册",
          color: "#333",
          background: "transparent",
          showBack: true
        },
        Top: app.globalData.Top,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        multiArray: [],  // 二维数组数据
        multiIndex: [0, 0], // 默认的下标
        step: 0, // 默认显示请选择
        ismenber:false,//用户协议
        mobile:'',
        src: [], //本地预览的照片路径
        src1: [], //服务器返的照片路径
        add:true
      },
      change(val) {
        let num = val.detail.value
        let determine = val.currentTarget.dataset.show
        switch (determine) {
          case '1':
            this.setData({
              one: 1
            })
            break;
          case '3':
            this.setData({
              three: 1
            })
            break;
          case '4':
            this.setData({
              four: 1
            })
            break;

        }
      },
      inChange(val) {
        let num = val.detail.value
        let determine = val.currentTarget.dataset.show
        switch (determine) {
          case '1':
            if (num != '') {
              this.setData({
                one: 1
              })
            } else {
              this.setData({
                one: 0
              })
            }
            break;

          case '3':
            if (num != '') {
              this.setData({
                three: 1
              })
            } else {
              this.setData({
                three: 0
              })
            }
            break;
          case '4':
            if (num != '') {
              this.setData({
                four: 1
              })
            } else {
              this.setData({
                four: 0
              })
            }
            break;

        }
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
  //同意用户协议
  toggle() {
    this.setData({
      ismenber: !this.data.ismenber
    })
    
  },
  //上传图片  
  subPic(e) {
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

        wx.uploadFile({
          url: app.globalData.baseUrl + "/system/upload/file",
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/x-www-form-urlencoded', 
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode == 200) {
              console.log(JSON.parse(res.data))
              var src1 = that.data.src1.concat(JSON.parse(res.data).data)
              that.setData({
                src1,
                add: false
              })
              console.log(that.data.src1)

            }
          }
        })

      }
    })
  },

  formSubmit(e){
    console.log(e)
    let { userphone, password, newpassword}= e.detail.value
    console.log(userphone,password, newpassword)
    let reg = /^[1][3-9][0-9]{9}$/; //严格匹配
    if(this.data.src1.length == 0){
      wx.showToast({
        title: '请选择头像',
        icon: 'none'
      })
    }
    if(!userphone){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    // if(!reg.test(userphone)){
    //   wx.showToast({
    //     title: '手机号码输入错误',
    //     icon:'none'
    //   })
    //   return
    // }
    if (this.data.step==0){
      wx.showToast({
        title: '请选择网格',
        icon: 'none'
      })
      return
    }
    if (!password){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    if (!newpassword) {
      wx.showToast({
        title: '请确认密码密码',
        icon: 'none'
      })
      return
    }
    if (password != newpassword){
      wx.showToast({
        title: '两次密码不一致请重新输入',
        icon: 'none'
      })
      return
    }
    if (this.data.ismenber===false) {
      wx.showToast({
        title: '请同意用户协议',
        icon: 'none'
      })
      return
    }
    get({
      link:"/sys/user/save",
      data:{
        username:this.data.mobile,
        mobile:this.data.mobile,
        name:userphone,
        gridId: this.data.gridid,
        password: hexMD5(password),
        picId:this.data.src1.join()
      }
    }).then(res=>{
      console.log(res)
      if(res.code==0){
        wx.showToast({
          title: '注册成功！！！',
          icon:"success",
          duration:1500
        })
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/login/login',
          })
        },1500)
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getplace()
    this.setData({
      mobile:options.phone
    })
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
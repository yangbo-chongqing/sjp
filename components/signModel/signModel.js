const app=getApp()
Component({
  properties: {
    showSign: {
      type: Boolean,
      value: false
    },

  },
  data:{
    src:"",//预览的图片地址
    src1:""//服务器返回的图片地址
  },
  methods: {
    
    //照片上传
    add() {
      let t = this;
      var url = app.globalData.baseUrl + "/system/upload/file"
      var src = t.data.src
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
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


          t.setData({
            src: tempFilePaths[0]
          })
          console.log(t.data.src)

          wx.uploadFile({
            url: url,
            filePath: res.tempFilePaths[0],
            name: 'file',
            header:{
              "cookie": wx.getStorageSync("userCookie")
            },
            success: (res) => {
              console.log(res)
              if (res.statusCode == 200) {

                console.log(JSON.parse(res.data))
                t.setData({
                  src1: JSON.parse(res.data).data
                })
                console.log(t.data.src1)
              }
            }
          })

        }
      })
    },
    //图片删除
    del() {
      var t = this
      t.setData({
        src: '',

      })
    },
    //签到
    sign(){
      console.log(11)
      this.checkin()
    },
   
    checkin(){
      this.triggerEvent("checkin", this.data.src1);

    }

  }
})
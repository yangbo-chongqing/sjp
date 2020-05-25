// subPages/historyDetails/historyDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "具体内容嘻嘻嘻我嘻嘻嘻嘻嘻嘻嘻嘻",
    num1: "21",
    num2: "22"
  },
  showData: function () {
    var text = this.data.text;
    var num1 = this.data.num1;
    var num2 = this.data.num2;
    this.setData({
      text: text,
      num1: num1,
      num2: num2
    });
  },
  formSubmit: function (e) {
    // console.log(app.globalData.userInfo.nickName);
    wx.showToast({
      title: '评论成功',
      icon: 'success',
      duration: 3000
    })
    var that = this;
    var liuyantext = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
    console.log('视频id' + that.data.id);
    console.log('留言number:' + that.data.number);
    wx.request({
      url: '',
      data: {
        content: liuyantext,
        number: that.data.number,
        id: that.data.id
      },

      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          showOrHidden: true,
          re: res.data,
          keyValue: '',
          photo2: res.data.result.comment.photo,
          nickname2: res.data.result.comment.nickname,
          date2: res.data.result.comment.date,
          comment2: res.data.result.comment.comment
        })
        wx.hideToast();
        console.log(res);

      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
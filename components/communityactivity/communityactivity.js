const app = getApp();
Component({
  properties: {
    comList: {
      type: Array,
      value: []
    }
  },
  methods: {
    godetails: function (e) {
      // console.log(e)
      this.triggerEvent("goDetails", e)
    },
    handlePhone(e){
      console.log(e)
      var phone = e.currentTarget.dataset.ph;
      //调打手机
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    },
  }
})
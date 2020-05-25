// components/index/Active/Active.js
Component({
  properties:{
    BaseNewsList:{
      type:Array,
      value:[]
    }
  },
  methods:{
    handleGoNews(e){
      this.triggerEvent("goNews",e);
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
});